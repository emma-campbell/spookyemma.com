import fs from 'fs';
import path from 'path';
import { renderMarkdown } from '$lib/content/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
	let changelogHtml = '';

	try {
		const changelog = fs.readFileSync(changelogPath, 'utf-8');
		changelogHtml = await renderMarkdown(changelog);
	} catch (error) {
		console.error('Error reading changelog:', error);
		changelogHtml = '<p>No changelog found.</p>';
	}

	return { changelogHtml };
};
