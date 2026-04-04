import { getPublishedPosts, ENTRY_TYPES, SECTION_ORDER } from '$lib/content';
import type { PostEntry } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = getPublishedPosts();

	// Group posts by entry type
	const grouped = new Map<PostEntry, typeof posts>();
	for (const post of posts) {
		const group = grouped.get(post.entry) || [];
		group.push(post);
		grouped.set(post.entry, group);
	}

	// Build sections using SECTION_ORDER + ENTRY_TYPES
	const sections = SECTION_ORDER
		.filter((key) => grouped.has(key))
		.map((key, i) => {
			const cfg = ENTRY_TYPES[key];
			const colorName = cfg.color.replace('var(--', '').replace(')', '');
			return {
				id: key,
				label: cfg.label.charAt(0).toUpperCase() + cfg.label.slice(1),
				icon: cfg.icon,
				color: cfg.color,
				badgeCls: colorName,
				order: i + 1,
				sectionNum: `\u00A7 0${i + 1}`,
				posts: (grouped.get(key) || []).map((p) => ({
					slug: p.slug,
					title: p.title,
					published: p.published,
					entry: p.entry,
					tags: p.tags
				}))
			};
		});

	const pages = [
		{ href: '/about', label: 'About' },
		{ href: '/now', label: 'Now' },
		{ href: '/uses', label: 'Uses' },
		{ href: '/changelog', label: 'Changelog' },
		{ href: '/notebook', label: 'Notebook' }
	];

	return { sections, pages };
};
