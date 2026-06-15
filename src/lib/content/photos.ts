import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Photo, PhotoAnnotation, PhotoCollection, PhotosContent } from './types';

const PHOTOS_PATH = path.join(process.cwd(), 'content', 'photos.md');

const MONTHS = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/** Turn an authored `YYYY-MM` (or `YYYY-MM-DD`) into "Mon YYYY". Falls back to the raw value. */
function formatDateLabel(raw: string): string {
	const match = /^(\d{4})-(\d{2})/.exec(raw);
	if (!match) return raw;
	const [, year, month] = match;
	const monthName = MONTHS[Number(month) - 1];
	return monthName ? `${monthName} ${year}` : raw;
}

export function getPhotos(): PhotosContent {
	const fileContent = fs.readFileSync(PHOTOS_PATH, 'utf-8');
	const stats = fs.statSync(PHOTOS_PATH);
	const { data } = matter(fileContent);

	const photos: Photo[] = (data.photos ?? [])
		.map((p: Record<string, unknown>): Photo => {
			const date = String(p.date ?? '');
			return {
				src: String(p.src ?? ''),
				alt: String(p.alt ?? p.caption ?? ''),
				caption: String(p.caption ?? ''),
				collection: String(p.collection ?? ''),
				place: String(p.place ?? ''),
				date,
				dateLabel: formatDateLabel(date)
			};
		})
		// Newest first; undated photos sort to the end.
		.sort((a: Photo, b: Photo) => (b.date || '').localeCompare(a.date || ''));

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
