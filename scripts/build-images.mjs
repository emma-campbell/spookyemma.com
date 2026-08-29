#!/usr/bin/env node
// Generates responsive WebP variants next to every raster under static/ and
// writes a manifest (dimensions + variant URLs) that the markdown renderer and
// the photos page use to emit <picture> with srcset/sizes/width/height.
//
// Variants (`name-{w}w.webp`) and the manifest are gitignored. Runs before
// `dev` and `build`; work is keyed on a content hash so unchanged images are
// skipped and a no-change run costs a few milliseconds.
import { existsSync } from 'node:fs';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {
	CONFIG_KEY,
	GENERATED,
	MANIFEST_PATH,
	STATIC_DIR,
	WEBP_QUALITY,
	WIDTHS,
	hashBuffer,
	mapLimit,
	orientedSize,
	rasterSources,
	rel,
	toUrl,
	variantPath,
	walk
} from './images/lib.mjs';

const started = performance.now();

let previous = {};
try {
	previous = JSON.parse(await readFile(MANIFEST_PATH, 'utf-8'));
} catch {
	/* first run */
}

const sources = await rasterSources();
const manifest = {};
let generated = 0;

await mapLimit(sources, 8, async (file) => {
	const buf = await readFile(file);
	const hash = `${hashBuffer(buf)}-${CONFIG_KEY}`;
	const url = toUrl(file);
	const { width, height } = orientedSize(await sharp(buf).metadata());

	// Standard widths below the source, plus the source width itself when it is
	// narrower than the largest standard width (screenshots, small graphics).
	const widths = WIDTHS.filter((w) => w < width);
	if (width <= WIDTHS[WIDTHS.length - 1]) widths.push(width);

	const webp = widths.map((w) => ({ w, src: toUrl(variantPath(file, w)) }));
	const cached =
		previous[url]?.hash === hash && webp.every((v) => existsSync(path.join(STATIC_DIR, v.src)));

	if (!cached) {
		await Promise.all(
			widths.map((w) =>
				sharp(buf)
					.rotate()
					.resize({ width: w, withoutEnlargement: true })
					.webp({ quality: WEBP_QUALITY })
					.toFile(variantPath(file, w))
			)
		);
		generated += widths.length;
	}

	manifest[url] = { width, height, hash, webp };
});

// Drop variants whose source was removed or renamed so they never ship in build/.
const live = new Set(Object.values(manifest).flatMap((m) => m.webp.map((v) => v.src)));
let removed = 0;
for (const file of await walk(STATIC_DIR)) {
	if (GENERATED.test(file) && !live.has(toUrl(file))) {
		await unlink(file);
		removed++;
	}
}

await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, '\t') + '\n');

const ms = Math.round(performance.now() - started);
console.log(
	`images: ${sources.length} sources, ${generated} variants generated, ${removed} stale removed -> ${rel(MANIFEST_PATH)} (${ms}ms)`
);
