import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Backlink {
	slug: string;
	title: string;
	context: string;
	excerpt: string;
}

let cache: Map<string, Backlink[]> | null = null;

function buildCache(): Map<string, Backlink[]> {
	const postsDir = path.join(process.cwd(), 'content', 'posts');
	const backlinksMap = new Map<string, Backlink[]>();

	let files: string[];
	try {
		files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
	} catch {
		return backlinksMap;
	}

	for (const file of files) {
		const slug = file.replace(/\.mdx$/, '');
		const filePath = path.join(postsDir, file);
		const raw = fs.readFileSync(filePath, 'utf-8');
		const { data, content } = matter(raw);

		if (data.status === 'draft') continue;

		const title = data.title || slug;
		let published = '';
		if (data.published instanceof Date) {
			published = data.published.toISOString().split('T')[0];
		} else if (typeof data.published === 'string') {
			published = data.published;
		}

		const entry = data.entry || 'note';
		const context = `Blog · ${entry}, ${published}`;

		// Find all internal links to /notebook/<slug>
		const linkRegex = /\[([^\]]*)\]\(\/notebook\/([^)]+)\)/g;
		let match;

		while ((match = linkRegex.exec(content)) !== null) {
			const targetSlug = match[2];
			const linkPos = match.index;

			// Extract surrounding sentence as excerpt
			const before = content.slice(Math.max(0, linkPos - 120), linkPos);
			const after = content.slice(linkPos + match[0].length, linkPos + match[0].length + 120);
			const sentenceStart = before.lastIndexOf('.') !== -1 ? before.lastIndexOf('.') + 1 : 0;
			const sentenceEnd = after.indexOf('.') !== -1 ? after.indexOf('.') + 1 : after.length;
			const excerpt = (before.slice(sentenceStart) + match[0] + after.slice(0, sentenceEnd)).trim();

			if (!backlinksMap.has(targetSlug)) {
				backlinksMap.set(targetSlug, []);
			}

			const existing = backlinksMap.get(targetSlug)!;
			// Avoid duplicates from same source
			if (!existing.some((b) => b.slug === slug)) {
				existing.push({ slug, title, context, excerpt });
			}
		}
	}

	return backlinksMap;
}

export function getBacklinks(targetSlug: string): Backlink[] {
	if (!cache) {
		cache = buildCache();
	}
	return cache.get(targetSlug) || [];
}
