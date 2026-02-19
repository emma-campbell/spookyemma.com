import { getPost, getAllPostSlugs, getPublishedPosts } from '$lib/content';
import { renderMarkdown, extractHeadings, countWords } from '$lib/content/markdown';
import { getBacklinks, extractReferences } from '$lib/server/backlinks';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const slugs = getAllPostSlugs();
	return slugs.map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const post = getPost(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const contentHtml = await renderMarkdown(post.content);
	const toc = extractHeadings(post.content);
	const wordCount = countWords(post.content);
	const readingTime = `~${Math.ceil(wordCount / 200)} min`;

	// Get prev/next posts
	const published = getPublishedPosts();
	const currentIndex = published.findIndex((p) => p.slug === params.slug);
	const prev = currentIndex < published.length - 1 ? published[currentIndex + 1] : null;
	const next = currentIndex > 0 ? published[currentIndex - 1] : null;

	const backlinks = getBacklinks(params.slug);
	const references = extractReferences(post.content);

	return {
		post: {
			...post,
			contentHtml
		},
		toc,
		wordCount,
		readingTime,
		prevPost: prev ? { slug: prev.slug, title: prev.title } : null,
		nextPost: next ? { slug: next.slug, title: next.title } : null,
		backlinks,
		references
	};
};
