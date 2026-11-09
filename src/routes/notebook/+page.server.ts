import { getPublishedPosts, ENTRY_TYPES } from '#content';
import { createMDXPreview, renderMarkdown } from '#lib/content/markdown.ts';
import type { PageServerLoad } from './$types';

const SHORT_MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

export const load: PageServerLoad = async () => {
	const posts = getPublishedPosts();

	const entries = await Promise.all(
		posts.map(async (post) => {
			const { preview, hasMore } = createMDXPreview(post.content, 2);
			const excerptHtml = preview ? await renderMarkdown(preview) : '';
			const config = ENTRY_TYPES[post.entry];
			// Dates are stored as YYYY-MM-DD; read the parts directly so no timezone shifts the day
			const [year, month, day] = post.published.slice(0, 10).split('-');

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
				day,
				month: SHORT_MONTHS[Number(month) - 1],
				year
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
