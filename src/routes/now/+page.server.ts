import { getNowEntries } from '$lib/content';
import { renderMarkdown } from '$lib/content/markdown';
import type { PageServerLoad } from './$types';

const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export const load: PageServerLoad = async () => {
	const entries = getNowEntries();

	const entriesWithHtml = await Promise.all(
		entries.map(async (entry) => ({
			...entry,
			label: `${MONTH_NAMES[entry.month - 1]} ${entry.year}`,
			contentHtml: await renderMarkdown(entry.content)
		}))
	);

	const featured = entriesWithHtml.length > 0 ? entriesWithHtml[0] : null;
	const archive = entriesWithHtml.slice(1);

	const lastUpdated = featured?.label ?? null;

	return { featured, archive, lastUpdated };
};
