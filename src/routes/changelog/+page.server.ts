import { getChangelog } from '$lib/content';
import type { PageServerLoad } from './$types';

const SHORT_MONTHS = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function formatShortDate(dateStr: string): string {
	const d = new Date(dateStr + 'T00:00:00');
	return `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export const load: PageServerLoad = async () => {
	const changelog = getChangelog();
	const lastUpdated = changelog.lastUpdatedAt.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const months = changelog.months.map((month) => ({
		...month,
		entries: month.entries.map((entry) => ({
			...entry,
			shortDate: formatShortDate(entry.date)
		}))
	}));

	return {
		title: changelog.title,
		subtitle: changelog.subtitle,
		lastUpdated,
		months
	};
};
