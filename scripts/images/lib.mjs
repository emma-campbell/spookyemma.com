// Shared helpers for the image scripts. Keep this dependency-free apart from sharp.
import { createHash } from 'node:crypto';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

export const STATIC_DIR = path.resolve('static');
export const MANIFEST_PATH = path.resolve('src/lib/generated/image-manifest.json');

/** Long-edge cap for committed originals. Nothing on the site renders wider than this. */
export const MAX_EDGE = 2000;
/** Ceiling for a committed original. A 2000px q82 mozjpeg photo lands at 300-800 KB. */
export const MAX_BYTES = 2 * 1024 * 1024;
/** Widths generated for the WebP srcset. */
export const WIDTHS = [480, 800, 1200, 1600];
/** WebP quality. 75 is visually transparent at these sizes; 80 costs ~15% more bytes for nothing. */
export const WEBP_QUALITY = 75;
/** Folded into each manifest hash so changing widths/quality regenerates everything. */
export const CONFIG_KEY = `q${WEBP_QUALITY}-${WIDTHS.join('.')}`;

const RASTER = new Set(['.jpg', '.jpeg', '.png']);
/** Generated variants look like `name-800w.webp`; they are gitignored. */
export const GENERATED = /-\d+w\.webp$/;

export function isRaster(file) {
	return RASTER.has(path.extname(file).toLowerCase());
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

export function variantPath(file, width) {
	const { dir, name } = path.parse(file);
	return path.join(dir, `${name}-${width}w.webp`);
}

/** Pixel dimensions with EXIF orientation applied, so portrait phone photos report as portrait. */
export function orientedSize(meta) {
	const swap = (meta.orientation ?? 1) >= 5;
	return swap ? { width: meta.height, height: meta.width } : { width: meta.width, height: meta.height };
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
