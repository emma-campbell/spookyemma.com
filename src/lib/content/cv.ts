import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { CV, CVSection, CVEntry } from './types';

const CV_PATH = path.join(process.cwd(), 'content', 'cv.md');

export function getCV(): CV {
	const fileContent = fs.readFileSync(CV_PATH, 'utf-8');
	const stats = fs.statSync(CV_PATH);
	const { data } = matter(fileContent);

	const sections: CVSection[] = (data.sections || [])
		.map((s: { heading: string; order?: number; entries?: any[] }) => ({
			heading: s.heading,
			order: s.order ?? 99,
			entries: (s.entries || []).map((e: any): CVEntry => ({
				role: e.role,
				organization: e.organization,
				location: e.location,
				start: e.start ? String(e.start) : undefined,
				end: e.end ? String(e.end) : undefined,
				description: e.description,
			})),
		}))
		.sort((a: CVSection, b: CVSection) => a.order - b.order);

	return {
		title: data.title || 'CV',
		subtitle: data.subtitle,
		lastUpdatedAt: stats.mtime,
		sections,
	};
}
