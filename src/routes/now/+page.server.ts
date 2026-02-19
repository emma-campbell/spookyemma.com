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

	const lastUpdated = entries.length > 0
		? `${MONTH_NAMES[entries[0].month - 1]} ${entries[0].year}`
		: null;

	return { entries: entriesWithHtml, lastUpdated };
};
