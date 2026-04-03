import { getCV } from '$lib/content';
import { renderMarkdown } from '$lib/content/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const cv = getCV();
	const lastUpdated = cv.lastUpdatedAt.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const sections = await Promise.all(
		cv.sections.map(async (section) => ({
			...section,
			entries: await Promise.all(
				section.entries.map(async (entry) => ({
					...entry,
					descriptionHtml: entry.description
						? await renderMarkdown(entry.description)
						: undefined,
				}))
			),
		}))
	);

	return {
		title: cv.title,
		subtitle: cv.subtitle,
		lastUpdated,
		sections,
	};
};
