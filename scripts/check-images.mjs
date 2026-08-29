#!/usr/bin/env node
// CI guard (runs anywhere sharp does): every committed raster under static/ must
// be within limits, carry no GPS, and have up-to-date variants + manifest entry.
// The pre-commit hook normally guarantees this; this catches images added
// around it (GitHub web UI, --no-verify, a clone without hooks).
// Fix with: pnpm images
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {
	CONFIG_KEY,
	MANIFEST_PATH,
	MAX_BYTES,
	MAX_EDGE,
	STATIC_DIR,
	fmtBytes,
	hasGps,
	hashBuffer,
	mapLimit,
	rasterSources,
	rel,
	toUrl
} from './images/lib.mjs';

let manifest = {};
try {
	manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf-8'));
} catch {
	console.error(`missing ${rel(MANIFEST_PATH)}`);
}

const files = await rasterSources();
const problems = (
	await mapLimit(files, 8, async (file) => {
		const buf = await readFile(file);
		const meta = await sharp(buf).metadata();
		const reasons = [];
		if (Math.max(meta.width, meta.height) > MAX_EDGE)
			reasons.push(`${meta.width}x${meta.height} exceeds ${MAX_EDGE}px`);
		if (buf.length > MAX_BYTES)
			reasons.push(`${fmtBytes(buf.length)} exceeds ${fmtBytes(MAX_BYTES)}`);
		if (hasGps(meta.exif)) reasons.push('carries GPS coordinates');
		const entry = manifest[toUrl(file)];
		if (!entry) reasons.push('missing from manifest');
		else if (entry.hash !== `${hashBuffer(buf)}-${CONFIG_KEY}`)
			reasons.push('manifest entry is stale');
		else {
			const missing = entry.variants.filter((v) => !existsSync(path.join(STATIC_DIR, v.src)));
			if (missing.length)
				reasons.push(`missing variants: ${missing.map((v) => v.w + 'w').join(', ')}`);
		}
		return reasons.length ? `${rel(file)}: ${reasons.join('; ')}` : null;
	})
).filter(Boolean);

const live = new Set(files.map(toUrl));
for (const url of Object.keys(manifest)) {
	if (!live.has(url)) problems.push(`${url}: in manifest but not on disk`);
}

if (problems.length) {
	console.error(
		`${problems.length} image problem(s) — run \`pnpm images\` on a Mac and commit the result:\n`
	);
	for (const p of problems) console.error(`  ${p}`);
	process.exit(1);
}
console.log(`images: ${files.length} sources checked, manifest and variants in sync`);
