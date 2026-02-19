import { getChangelog } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const changelog = getChangelog();
	const lastUpdated = changelog.lastUpdatedAt.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return {
		title: changelog.title,
		subtitle: changelog.subtitle,
		lastUpdated,
		months: changelog.months
	};
};
