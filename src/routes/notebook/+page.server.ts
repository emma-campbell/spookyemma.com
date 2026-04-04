import { getPublishedPosts, ENTRY_TYPES } from '$lib/content';
import { createMDXPreview, renderMarkdown } from '$lib/content/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = getPublishedPosts();

	const entries = await Promise.all(
		posts.map(async (post) => {
			const { preview, hasMore } = createMDXPreview(post.content, 2);
			const excerptHtml = preview ? await renderMarkdown(preview) : '';
			const config = ENTRY_TYPES[post.entry];
			const date = new Date(post.published);

			return {
				slug: post.slug,
				title: post.title,
				published: post.published,
				entry: post.entry,
				tags: post.tags,
				description: post.description,
				excerptHtml,
				hasMore,
				typeLabel: config.label,
				typeIcon: config.icon,
				day: String(date.getDate()).padStart(2, '0'),
				month: date.toLocaleDateString('en-US', { month: 'short' }),
				year: String(date.getFullYear())
			};
		})
	);

	// Count by type for the header aside
	const typeCounts: Record<string, number> = {};
	for (const post of posts) {
		const label = ENTRY_TYPES[post.entry].label;
		typeCounts[label] = (typeCounts[label] || 0) + 1;
	}

	return {
		entries,
		totalCount: posts.length,
		typeCounts
	};
};
