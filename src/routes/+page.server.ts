import { getPublishedPosts } from '$lib/content';
import type { PostEntry } from '$lib/content';
import type { PageServerLoad } from './$types';

const sectionConfig: Record<PostEntry, { label: string; icon: string; color: string; order: number }> = {
	essay: { label: 'Blog', icon: '✦', color: 'var(--amber)', order: 1 },
	experiment: { label: 'Experiments', icon: '⚗', color: 'var(--coral)', order: 2 },
	note: { label: 'Notes', icon: '◈', color: 'var(--sage)', order: 3 },
	'how-to': { label: 'Guides', icon: '⌘', color: 'var(--lavender)', order: 4 },
	micro: { label: 'Micro', icon: '○', color: 'var(--muted)', order: 5 }
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
			color: sectionConfig[entry].color,
			order: sectionConfig[entry].order,
			sectionNum: `§ 0${sectionConfig[entry].order}`,
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
