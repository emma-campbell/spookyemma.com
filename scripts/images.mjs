#!/usr/bin/env node
// Image pipeline for static/. For every raster it:
//
//   1. normalizes the committed original — bakes in orientation, caps the long
//      edge at MAX_EDGE, strips EXIF/GPS/XMP — leaving files already within
//      limits byte-for-byte untouched so repeated runs never degrade quality.
//      iPhone photos carry an HDR gain map; those go through CoreImage
//      (hdr-resize.swift) so the gain map survives. Everything else goes
//      through sharp/mozjpeg.
//   2. generates responsive variants next to it: WebP tiers for SDR sources,
//      gain-map JPEG tiers for HDR sources.
//   3. records dimensions, hash, and variants in src/lib/image-manifest.json.
//
// Variants and the manifest are committed (HDR variants need macOS, and the
// site builds on Linux). Work is keyed on a content hash, so unchanged images
// are skipped.
//
// Usage: node scripts/images.mjs [--stage] [files...]
//   no files  -> process everything under static/, prune stale variants
//   --stage   -> git add generated variants + manifest (used by lint-staged)
import { existsSync } from 'node:fs';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';
import { hdrResize } from './images/hdr.mjs';
import {
	CONFIG_KEY,
	GENERATED,
	HDR_SOURCE_QUALITY,
	HDR_VARIANT_QUALITY,
	HDR_WIDTHS,
	MANIFEST_PATH,
	MAX_BYTES,
	MAX_EDGE,
	SDR_WIDTHS,
	STATIC_DIR,
	WEBP_QUALITY,
	fmtBytes,
	hasGainMap,
	hasGps,
	hashBuffer,
	isRaster,
	mapLimit,
	orientedSize,
	rasterSources,
	rel,
	toUrl,
	variantPath,
	walk
} from './images/lib.mjs';

const git = promisify(execFile);

// ---------------------------------------------------------------- normalize

async function normalize(file) {
	const input = await readFile(file);
	const meta = await sharp(input).metadata();
	const hdr = hasGainMap(input);
	const tooLarge = Math.max(meta.width, meta.height) > MAX_EDGE;
	const heavy = input.length > MAX_BYTES;
	// ImageIO leaves a ~200-byte EXIF stub (pixel dims, colour space) on HDR output;
	// anything bigger is camera metadata we want gone.
	const hasMetadata = hdr
		? hasGps(meta.exif) || (meta.exif?.length ?? 0) > 512 || Boolean(meta.xmp)
		: Boolean(meta.exif || meta.icc || meta.xmp || meta.iptc);

	if (!hasMetadata && !tooLarge && !heavy) return { hdr, before: input.length, rewrote: false };

	let output;
	if (hdr) {
		// hdr-resize takes a target width; derive it so the *long* edge lands on MAX_EDGE.
		const { width, height } = orientedSize(meta);
		const targetWidth = Math.round(MAX_EDGE * Math.min(1, width / height));
		const tmp = `${file}.tmp.jpg`;
		await hdrResize(file, tmp, targetWidth, HDR_SOURCE_QUALITY);
		output = await readFile(tmp);
		await unlink(tmp);
	} else {
		const isPng = path.extname(file).toLowerCase() === '.png';
		// .rotate() with no args bakes in EXIF orientation before the EXIF is dropped.
		// Sharp converts embedded ICC (e.g. Display P3) to sRGB on the way out.
		let pipeline = sharp(input)
			.rotate()
			.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
		pipeline = isPng
			? pipeline.png({ compressionLevel: 9 })
			: pipeline.jpeg({ quality: 82, mozjpeg: true });
		output = await pipeline.toBuffer();
		// A re-encode purely for weight that didn't get lighter isn't worth the quality loss.
		if (!hasMetadata && !tooLarge && output.length >= input.length) {
			return { hdr, before: input.length, rewrote: false };
		}
	}

	await writeFile(file, output);
	const why = [tooLarge && `${meta.width}x${meta.height}`, hasMetadata && 'metadata', hdr && 'HDR kept']
		.filter(Boolean)
		.join(', ');
	console.log(`normalized ${rel(file)}  ${fmtBytes(input.length)} -> ${fmtBytes(output.length)}  (${why})`);
	return { hdr, before: input.length, after: output.length, rewrote: true };
}

// ----------------------------------------------------------------- variants

async function buildVariants(file, previous) {
	const buf = await readFile(file);
	const hdr = hasGainMap(buf);
	const hash = `${hashBuffer(buf)}-${CONFIG_KEY}`;
	const url = toUrl(file);
	const { width, height } = orientedSize(await sharp(buf).metadata());

	const tiers = hdr ? HDR_WIDTHS : SDR_WIDTHS;
	const ext = hdr ? 'jpg' : 'webp';
	// Standard widths below the source, plus the source width itself for SDR
	// sources narrower than the largest tier (screenshots, small graphics). HDR
	// sources don't need that: the original is already the top tier.
	const widths = tiers.filter((w) => w < width);
	if (!hdr && width <= tiers[tiers.length - 1]) widths.push(width);

	const variants = widths.map((w) => ({ w, src: toUrl(variantPath(file, w, ext)) }));
	const entry = { width, height, hash, type: hdr ? 'image/jpeg' : 'image/webp', variants };
	const cached =
		previous?.hash === hash && variants.every((v) => existsSync(path.join(STATIC_DIR, v.src)));
	if (cached) return { entry, generated: 0, files: [] };

	const files = [];
	for (const w of widths) {
		const out = variantPath(file, w, ext);
		if (hdr) {
			await hdrResize(file, out, w, HDR_VARIANT_QUALITY);
		} else {
			await sharp(buf)
				.rotate()
				.resize({ width: w, withoutEnlargement: true })
				.webp({ quality: WEBP_QUALITY })
				.toFile(out);
		}
		files.push(out);
	}
	return { entry, generated: widths.length, files };
}

// --------------------------------------------------------------------- main

const started = performance.now();
const argv = process.argv.slice(2);
const stage = argv.includes('--stage');
const requested = argv.filter((a) => !a.startsWith('--')).map((f) => path.resolve(f));
const all = requested.length === 0;
const files = all ? await rasterSources() : requested.filter(isRaster);

let manifest = {};
try {
	manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf-8'));
} catch {
	/* first run */
}

// HDR work shells out to a single-threaded tool; keep concurrency modest.
const results = await mapLimit(files, 4, async (file) => {
	const norm = await normalize(file);
	const built = await buildVariants(file, manifest[toUrl(file)]);
	return { file, norm, ...built };
});

for (const r of results) manifest[toUrl(r.file)] = r.entry;

// Full runs also prune entries and variants whose source is gone.
let removed = 0;
if (all) {
	const live = new Set(files.map(toUrl));
	for (const url of Object.keys(manifest)) if (!live.has(url)) delete manifest[url];
	const liveVariants = new Set(Object.values(manifest).flatMap((m) => m.variants.map((v) => v.src)));
	for (const f of await walk(STATIC_DIR)) {
		if (GENERATED.test(f) && !liveVariants.has(toUrl(f))) {
			await unlink(f);
			removed++;
		}
	}
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, '\t') + '\n');

if (stage) {
	const generated = results.flatMap((r) => r.files);
	await git('git', ['add', '--', MANIFEST_PATH, ...generated]);
}

const rewrote = results.filter((r) => r.norm.rewrote);
const saved = rewrote.reduce((s, r) => s + (r.norm.before - r.norm.after), 0);
const generated = results.reduce((s, r) => s + r.generated, 0);
const hdrCount = results.filter((r) => r.norm.hdr).length;
const ms = Math.round(performance.now() - started);
console.log(
	`images: ${files.length} sources (${hdrCount} HDR), ${rewrote.length} normalized${saved ? ` (${fmtBytes(saved)} saved)` : ''}, ` +
		`${generated} variants generated, ${removed} stale removed -> ${rel(MANIFEST_PATH)} (${ms}ms)`
);
