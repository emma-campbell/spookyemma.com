import fs from 'fs';
import path from 'path';
import matter from '@11ty/gray-matter';
import type { Photo, PhotoAnnotation, PhotoCollection, PhotosContent } from './types';
import { formatExif, getImageInfo, srcset } from './images';

const PHOTOS_PATH = path.join(process.cwd(), 'content', 'photos.md');

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Turn an authored `YYYY-MM` (or `YYYY-MM-DD`) into "Mon YYYY". Falls back to the raw value. */
function formatDateLabel(raw: string): string {
	const match = /^(\d{4})-(\d{2})/.exec(raw);
	if (!match) return raw;
	const [, year, month] = match;
	const monthName = MONTHS[Number(month) - 1];
	return monthName ? `${monthName} ${year}` : raw;
}

/** In-place Fisher–Yates. */
function shuffle<T>(items: T[]): void {
	for (let i = items.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[items[i], items[j]] = [items[j], items[i]];
	}
}

export function getPhotos(): PhotosContent {
	const fileContent = fs.readFileSync(PHOTOS_PATH, 'utf-8');
	const stats = fs.statSync(PHOTOS_PATH);
	const { data } = matter(fileContent);

	const photos: Photo[] = (data.photos ?? []).map((p: Record<string, unknown>): Photo => {
		const date = String(p.date ?? '');
		const src = String(p.src ?? '');
		const image = getImageInfo(src);
		return {
			src,
			alt: String(p.alt ?? p.caption ?? ''),
			width: image?.width,
			height: image?.height,
			srcset: image ? srcset(image) : undefined,
			srcsetType: image?.type,
			exif: image?.exif ? formatExif(image.exif) : undefined,
			caption: String(p.caption ?? ''),
			collection: String(p.collection ?? ''),
			place: String(p.place ?? ''),
			date,
			dateLabel: formatDateLabel(date)
		};
	});
	// Shuffled rather than date-sorted, so the grid doesn't read as a timeline.
	// This runs at prerender, so the order is fixed per build and changes each deploy.
	shuffle(photos);

	const counts = new Map<string, number>();
	for (const photo of photos) {
		counts.set(photo.collection, (counts.get(photo.collection) ?? 0) + 1);
	}

	const collections: PhotoCollection[] = (data.collections ?? []).map(
		(c: Record<string, unknown>): PhotoCollection => {
			const id = String(c.id ?? '');
			return {
				id,
				label: String(c.label ?? id),
				icon: c.icon ? String(c.icon) : undefined,
				count: counts.get(id) ?? 0
			};
		}
	);

	const annotations: PhotoAnnotation[] = (data.annotations ?? []).map(
		(a: Record<string, unknown>): PhotoAnnotation => ({
			title: String(a.title ?? ''),
			body: String(a.body ?? '')
		})
	);

	return {
		title: data.title ?? 'the photos',
		eyebrow: data.eyebrow ?? '',
		lede: data.lede ?? '',
		lastUpdatedAt: stats.mtime,
		collections,
		photos,
		annotations
	};
}
