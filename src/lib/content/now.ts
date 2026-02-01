import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NowEntry } from './types';

const NOW_DIR = path.join(process.cwd(), 'content', 'now');

export function getAllNowSlugs(): string[] {
	try {
		const files = fs.readdirSync(NOW_DIR);
		return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
	} catch (error) {
		console.error('Error reading now directory:', error);
		return [];
	}
}

export function getNowEntry(slug: string): NowEntry | null {
	try {
		const filePath = path.join(NOW_DIR, `${slug}.mdx`);
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const { data, content } = matter(fileContent);

		return {
			slug,
			month: data.month || 1,
			year: data.year || 2024,
			content
		};
	} catch (error) {
		console.error(`Error reading now entry ${slug}:`, error);
		return null;
	}
}

export function getNowEntries(): NowEntry[] {
	const slugs = getAllNowSlugs();
	return slugs
		.map((slug) => getNowEntry(slug))
		.filter((entry): entry is NowEntry => entry !== null)
		.sort((a, b) => {
			const dateA = new Date(a.year, a.month - 1);
			const dateB = new Date(b.year, b.month - 1);
			return dateB.getTime() - dateA.getTime();
		});
}
