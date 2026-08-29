#!/usr/bin/env node
// CI guard: fails if any committed raster under static/ is oversized or still
// carries metadata (EXIF/GPS). The pre-commit hook normally prevents this; this
// catches images added around it (GitHub web UI, --no-verify, a fresh clone
// without hooks installed). Fix with: pnpm images:normalize
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { MAX_BYTES, MAX_EDGE, fmtBytes, mapLimit, rasterSources, rel } from './images/lib.mjs';

const files = await rasterSources();
const problems = (
	await mapLimit(files, 8, async (file) => {
		const buf = await readFile(file);
		const meta = await sharp(buf).metadata();
		const reasons = [];
		if (Math.max(meta.width, meta.height) > MAX_EDGE) reasons.push(`${meta.width}x${meta.height} exceeds ${MAX_EDGE}px`);
		if (buf.length > MAX_BYTES) reasons.push(`${fmtBytes(buf.length)} exceeds ${fmtBytes(MAX_BYTES)}`);
		if (meta.exif || meta.xmp || meta.iptc) reasons.push('carries EXIF/XMP/IPTC metadata (possibly GPS)');
		return reasons.length ? `${rel(file)}: ${reasons.join('; ')}` : null;
	})
).filter(Boolean);

if (problems.length) {
	console.error(`${problems.length} image(s) need normalizing (run: pnpm images:normalize)\n`);
	for (const p of problems) console.error(`  ${p}`);
	process.exit(1);
}
console.log(`images: ${files.length} checked, all within limits`);
