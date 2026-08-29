import fs from 'node:fs';
import path from 'node:path';

/**
 * Reads src/lib/image-manifest.json, written by scripts/images.mjs and committed
 * alongside the variants it describes. Server-only: imported from load functions
 * and the markdown renderer during prerender.
 */

export interface ImageVariant {
	/** Rendered width in CSS pixels. */
	w: number;
	/** Site-relative URL of the variant. */
	src: string;
}

/** Shooting details captured from the original's EXIF before the pipeline stripped it. */
export interface ImageExif {
	make?: string;
	model?: string;
	lens?: string;
	fNumber?: number;
	/** Seconds. */
	exposureTime?: number;
	iso?: number;
	/** Millimetres, actual. */
	focalLength?: number;
	/** Millimetres, 35mm equivalent. */
	focalLength35?: number;
	/** ISO 8601. */
	takenAt?: string;
}

export interface ImageInfo {
	width: number;
	height: number;
	hash: string;
	exif?: ImageExif;
	/** MIME type of every entry in `variants`: WebP for SDR sources, JPEG (with gain map) for HDR. */
	type: 'image/webp' | 'image/jpeg';
	variants: ImageVariant[];
}

const MANIFEST_PATH = path.resolve('src/lib/image-manifest.json');

let manifest: Record<string, ImageInfo> | null = null;

function loadManifest(): Record<string, ImageInfo> {
	if (manifest) return manifest;
	try {
		manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
		return manifest!;
	} catch {
		// Missing manifest degrades to plain <img>; nothing breaks, images are just
		// heavier. Not cached, so a dev server picks the file up once it appears.
		return {};
	}
}

/** Look up a site-relative image URL such as `/images/posts/foo/bar.jpeg`. */
export function getImageInfo(src: string): ImageInfo | undefined {
	return loadManifest()[src];
}

export function srcset(info: ImageInfo): string {
	return info.variants.map((v) => `${v.src} ${v.w}w`).join(', ');
}

/** Prose figures fill the article column, which tops out around 620px. */
export const PROSE_SIZES = '(max-width: 700px) 100vw, 620px';

/**
 * Human-readable shooting details, e.g.
 * ["Fujifilm X-T50", "23mm", "f/11", "1/100s", "ISO 1250"].
 * The lens name is left out; focal length stands in for it. Phones report the
 * 35mm-equivalent so the number means the same thing across cameras.
 */
export function formatExif(exif: ImageExif): string[] {
	const parts: string[] = [];
	const make = exif.make ?? '';
	const model = exif.model ?? '';
	if (model) {
		const brandInModel = make && model.toLowerCase().includes(make.toLowerCase().split(' ')[0]);
		parts.push(brandInModel || !make ? model : `${titleCase(make)} ${model}`);
	}
	const isPhone = Boolean(exif.lens && model && exif.lens.includes(model));
	if (isPhone && exif.focalLength35) parts.push(`${exif.focalLength35}mm equiv`);
	else if (exif.focalLength) parts.push(`${trim(exif.focalLength)}mm`);
	if (exif.fNumber) parts.push(`f/${trim(exif.fNumber, 1)}`);
	if (exif.exposureTime) parts.push(formatShutter(exif.exposureTime));
	if (exif.iso) parts.push(`ISO ${exif.iso}`);
	return parts;
}

function formatShutter(seconds: number): string {
	if (seconds >= 1) return `${trim(seconds, 1)}s`;
	return `1/${Math.round(1 / seconds)}s`;
}

function trim(n: number, places = 2): string {
	return Number(n.toFixed(places)).toString();
}

/** "FUJIFILM" -> "Fujifilm"; leaves mixed-case makes alone. */
function titleCase(s: string): string {
	return s === s.toUpperCase() ? s.charAt(0) + s.slice(1).toLowerCase() : s;
}
