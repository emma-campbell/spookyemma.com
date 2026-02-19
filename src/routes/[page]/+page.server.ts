import { getPage, getAllPageSlugs } from '$lib/content';
import { renderMarkdown, extractHeadings, countWords } from '$lib/content/markdown';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const slugs = getAllPageSlugs();
	return slugs.map((page) => ({ page }));
};

export const load: PageServerLoad = async ({ params }) => {
	const page = getPage(params.page);

	if (!page) {
		throw error(404, 'Page not found');
	}

	const contentHtml = await renderMarkdown(page.content);
	const toc = extractHeadings(page.content);
	const wordCount = countWords(page.content);
	const readingTime = `~${Math.ceil(wordCount / 200)} min`;

	return {
		page: {
			...page,
			contentHtml
		},
		toc,
		wordCount,
		readingTime
	};
};
