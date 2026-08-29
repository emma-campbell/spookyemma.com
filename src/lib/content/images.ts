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

export interface ImageInfo {
	width: number;
	height: number;
	hash: string;
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
	} catch {
		// Missing manifest degrades to plain <img>; nothing breaks, images are just heavier.
		manifest = {};
	}
	return manifest!;
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
