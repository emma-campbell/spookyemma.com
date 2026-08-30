// Shared helpers and limits for the image scripts. Dependency-free apart from sharp.
import { createHash } from 'node:crypto';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import exifReader from 'exif-reader';

export const STATIC_DIR = path.resolve('static');
/** Committed alongside the variants; read by the markdown renderer and the photos page. */
export const MANIFEST_PATH = path.resolve('src/lib/image-manifest.json');

/** Long-edge cap for committed originals. Nothing on the site renders wider than this. */
export const MAX_EDGE = 2000;
/** Ceiling for a committed original. HDR JPEGs (ImageIO encoder) run ~3-4 MB at 2000px. */
export const MAX_BYTES = 4 * 1024 * 1024;

/** SDR sources: WebP variants at these widths. */
export const SDR_WIDTHS = [480, 800, 1200, 1600];
export const WEBP_QUALITY = 75;

/**
 * HDR sources (iPhone photos with a gain map): JPEG variants that keep the gain
 * map, written by scripts/images/hdr-resize.swift. Fewer tiers because each one
 * is ~2x the bytes of the WebP equivalent — 640w serves 1x desktop, 1280w serves
 * 2x desktop and 3x phones, the 2000px source covers the rest.
 */
export const HDR_WIDTHS = [640, 1280];
export const HDR_SOURCE_QUALITY = 0.78;
export const HDR_VARIANT_QUALITY = 0.68;

/** Folded into each manifest hash so changing tiers/quality regenerates everything. */
export const CONFIG_KEY = `v2-webp${WEBP_QUALITY}-${SDR_WIDTHS.join('.')}-hdr${HDR_VARIANT_QUALITY}-${HDR_WIDTHS.join('.')}`;

const RASTER = new Set(['.jpg', '.jpeg', '.png']);
/** Generated variants look like `name-800w.webp` / `name-1280w.jpg`. */
export const GENERATED = /-\d+w\.(webp|jpg)$/;

export function isRaster(file) {
	return RASTER.has(path.extname(file).toLowerCase()) && !GENERATED.test(file);
}

export async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((e) => {
			const full = path.join(dir, e.name);
			return e.isDirectory() ? walk(full) : [full];
		})
	);
	return files.flat();
}

export async function rasterSources(dir = STATIC_DIR) {
	return (await walk(dir)).filter(isRaster).sort();
}

export function hashBuffer(buf) {
	return createHash('sha1').update(buf).digest('hex').slice(0, 10);
}

/** `/abs/static/images/a.jpg` -> `/images/a.jpg` (the URL the site serves it at). */
export function toUrl(file) {
	return '/' + path.relative(STATIC_DIR, file).split(path.sep).join('/');
}

export function variantPath(file, width, ext) {
	const { dir, name } = path.parse(file);
	return path.join(dir, `${name}-${width}w.${ext}`);
}

/** Pixel dimensions with EXIF orientation applied, so portrait phone photos report as portrait. */
export function orientedSize(meta) {
	const swap = (meta.orientation ?? 1) >= 5;
	return swap
		? { width: meta.height, height: meta.width }
		: { width: meta.width, height: meta.height };
}

/** Apple (HDRGainMap), ISO 21496-1 as written by ImageIO (HDRToneMap), or Adobe/Android (hdrgm). */
export function hasGainMap(buf) {
	return /HDRGainMap|HDRToneMap|hdrgm:Version/.test(buf.toString('latin1'));
}

/**
 * True if the EXIF block carries a GPS IFD (tag 0x8825). Walks IFD0 of the TIFF
 * structure sharp hands back, tolerating an "Exif\0\0" prefix.
 */
export function hasGps(exif) {
	if (!exif || exif.length < 16) return false;
	let base = 0;
	if (exif.toString('latin1', 0, 4) === 'Exif') base = 6;
	const order = exif.toString('latin1', base, base + 2);
	if (order !== 'II' && order !== 'MM') return false;
	const le = order === 'II';
	const u16 = (o) => (le ? exif.readUInt16LE(o) : exif.readUInt16BE(o));
	const u32 = (o) => (le ? exif.readUInt32LE(o) : exif.readUInt32BE(o));
	try {
		let ifd = base + u32(base + 4);
		const count = u16(ifd);
		for (let i = 0; i < count; i++) {
			if (u16(ifd + 2 + i * 12) === 0x8825) return true;
		}
	} catch {
		return false;
	}
	return false;
}

export function fmtBytes(n) {
	if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
	return `${Math.round(n / 1024)} KB`;
}

export function rel(file) {
	return path.relative(process.cwd(), file);
}

/** Run `fn` over `items` with at most `limit` in flight. */
export async function mapLimit(items, limit, fn) {
	const results = new Array(items.length);
	let next = 0;
	async function worker() {
		while (next < items.length) {
			const i = next++;
			results[i] = await fn(items[i], i);
		}
	}
	await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
	return results;
}

/**
 * Pull the shooting details worth showing under a photo out of an EXIF block,
 * before the pipeline strips it. Returns undefined for images without a camera
 * model (screenshots, graphics, already-normalized files).
 */
export function extractExif(exif) {
	if (!exif) return undefined;
	let parsed;
	try {
		parsed = exifReader(exif);
	} catch {
		return undefined;
	}
	const image = parsed.Image ?? {};
	const photo = parsed.Photo ?? {};
	if (!image.Model) return undefined;
	const round = (n, places) => (typeof n === 'number' ? Number(n.toFixed(places)) : undefined);
	const out = {
		make: image.Make?.trim(),
		model: image.Model?.trim(),
		lens: photo.LensModel?.trim(),
		fNumber: round(photo.FNumber, 2),
		exposureTime: round(photo.ExposureTime, 6),
		iso: photo.ISOSpeedRatings ?? photo.PhotographicSensitivity,
		focalLength: round(photo.FocalLength, 2),
		focalLength35: photo.FocalLengthIn35mmFilm,
		takenAt:
			photo.DateTimeOriginal instanceof Date ? photo.DateTimeOriginal.toISOString() : undefined
	};
	for (const k of Object.keys(out)) if (out[k] === undefined || out[k] === '') delete out[k];
	return out;
}
