import fs from 'node:fs';
import path from 'node:path';

/**
 * Reads the manifest written by scripts/build-images.mjs (gitignored, generated
 * before dev/build). Server-only: imported from load functions and the markdown
 * renderer during prerender.
 */

export interface ImageVariant {
	/** Rendered width in CSS pixels. */
	w: number;
	/** Site-relative URL of the WebP variant. */
	src: string;
}

export interface ImageInfo {
	width: number;
	height: number;
	hash: string;
	webp: ImageVariant[];
}

const MANIFEST_PATH = path.resolve('src/lib/generated/image-manifest.json');

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

export function webpSrcset(info: ImageInfo): string {
	return info.webp.map((v) => `${v.src} ${v.w}w`).join(', ');
}

/** Prose figures fill the article column, which tops out around 620px. */
export const PROSE_SIZES = '(max-width: 700px) 100vw, 620px';
