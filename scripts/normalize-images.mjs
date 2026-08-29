#!/usr/bin/env node
// Normalizes committed raster images under static/ so that oversized phone
// photos and their EXIF (including GPS coordinates) never land in git.
//
//   - applies EXIF orientation, then strips all metadata
//   - caps the long edge at MAX_EDGE, re-encoding as mozjpeg q82 / lossless PNG
//   - leaves files that are already within limits byte-for-byte untouched,
//     so re-running it (every commit, via lint-staged) never degrades quality
//
// Usage: node scripts/normalize-images.mjs [files...]   (no args = all of static/)
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {
	GENERATED,
	MAX_BYTES,
	MAX_EDGE,
	fmtBytes,
	isRaster,
	mapLimit,
	rasterSources,
	rel
} from './images/lib.mjs';

async function normalize(file) {
	const input = await readFile(file);
	const meta = await sharp(input).metadata();
	const hasMetadata = Boolean(meta.exif || meta.icc || meta.xmp || meta.iptc);
	const tooLarge = Math.max(meta.width, meta.height) > MAX_EDGE;
	const heavy = input.length > MAX_BYTES;

	if (!hasMetadata && !tooLarge && !heavy) return { file, action: 'ok', before: input.length };

	const isPng = path.extname(file).toLowerCase() === '.png';
	// .rotate() with no args bakes in the EXIF orientation before the EXIF is dropped.
	// Sharp converts embedded ICC (e.g. iPhone Display P3) to sRGB on the way out.
	let pipeline = sharp(input)
		.rotate()
		.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
	pipeline = isPng ? pipeline.png({ compressionLevel: 9 }) : pipeline.jpeg({ quality: 82, mozjpeg: true });
	const output = await pipeline.toBuffer();

	// A re-encode only for weight that didn't get lighter is not worth the quality loss.
	if (!hasMetadata && !tooLarge && output.length >= input.length) {
		return { file, action: 'ok', before: input.length };
	}

	await writeFile(file, output);
	return { file, action: 'rewrote', before: input.length, after: output.length, meta, hasMetadata, tooLarge };
}

const args = process.argv.slice(2).map((f) => path.resolve(f));
const files = args.length
	? args.filter((f) => isRaster(f) && !GENERATED.test(f))
	: await rasterSources();

const results = await mapLimit(files, 8, normalize);
let saved = 0;
for (const r of results) {
	if (r.action !== 'rewrote') continue;
	saved += r.before - r.after;
	const why = [r.tooLarge && `${r.meta.width}x${r.meta.height}`, r.hasMetadata && 'metadata'].filter(Boolean).join(', ');
	console.log(`normalized ${rel(r.file)}  ${fmtBytes(r.before)} -> ${fmtBytes(r.after)}  (${why})`);
}
const rewrote = results.filter((r) => r.action === 'rewrote').length;
console.log(`images: ${rewrote} normalized, ${results.length - rewrote} already fine${saved ? `, ${fmtBytes(saved)} saved` : ''}`);
