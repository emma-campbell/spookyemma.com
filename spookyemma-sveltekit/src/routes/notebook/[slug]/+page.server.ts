import { getPost, getAllPostSlugs } from '$lib/content';
import { renderMarkdown } from '$lib/content/markdown';
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

	// Render markdown to HTML at build time
	const contentHtml = await renderMarkdown(post.content);

	return {
		post: {
			...post,
			contentHtml
		}
	};
};
