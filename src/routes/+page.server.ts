import { getPublishedPosts } from '$lib/content';
import type { PostEntry } from '$lib/content';
import type { PageServerLoad } from './$types';

const sectionConfig: Record<PostEntry, { label: string; icon: string; order: number }> = {
	essay: { label: 'Blog', icon: '✦', order: 1 },
	experiment: { label: 'Experiments', icon: '⚗', order: 2 },
	note: { label: 'Notes', icon: '◈', order: 3 },
	'how-to': { label: 'Guides', icon: '⌘', order: 4 },
	micro: { label: 'Micro', icon: '○', order: 5 }
};

export const load: PageServerLoad = async () => {
	const posts = getPublishedPosts();

	// Group posts by entry type
	const grouped = new Map<PostEntry, typeof posts>();
	for (const post of posts) {
		const group = grouped.get(post.entry) || [];
		group.push(post);
		grouped.set(post.entry, group);
	}

	// Build sections sorted by config order
	const sections = Array.from(grouped.entries())
		.map(([entry, posts]) => ({
			id: sectionConfig[entry].label.toLowerCase().replace(/\s+/g, '-'),
			label: sectionConfig[entry].label,
			icon: sectionConfig[entry].icon,
			order: sectionConfig[entry].order,
			posts: posts.map((p) => ({
				slug: p.slug,
				title: p.title,
				published: p.published,
				entry: p.entry,
				tags: p.tags
			}))
		}))
		.sort((a, b) => a.order - b.order);

	const pages = [
		{ href: '/about', label: 'About' },
		{ href: '/now', label: 'Now' },
		{ href: '/uses', label: 'Uses' },
		{ href: '/changelog', label: 'Changelog' },
		{ href: '/notebook', label: 'Notebook' }
	];

	return { sections, pages };
};
