import { getPublishedPosts } from '#content';
import type { PageServerLoad } from './$types';

const LATEST_COUNT = 6;
const THINKING_COUNT = 6;

export const load: PageServerLoad = async () => {
	const posts = getPublishedPosts().map((p) => ({
		slug: p.slug,
		title: p.title,
		published: p.published,
		entry: p.entry
	}));

	const latest = posts.slice(0, LATEST_COUNT);
	const latestSlugs = new Set(latest.map((p) => p.slug));

	// Longer-lived thinking pieces, skipping anything already under "Lately"
	const thinking = posts
		.filter((p) => p.entry === 'thinking' && !latestSlugs.has(p.slug))
		.slice(0, THINKING_COUNT);

	return { latest, thinking, totalCount: posts.length };
};
