import { getNowEntries } from '$lib/content';
import { renderMarkdown } from '$lib/content/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const entries = getNowEntries();

	// Render markdown for each entry at build time
	const entriesWithHtml = await Promise.all(
		entries.map(async (entry) => ({
			...entry,
			contentHtml: await renderMarkdown(entry.content)
		}))
	);

	return { entries: entriesWithHtml };
};
