import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Changelog, ChangelogEntry, ChangelogMonth, ChangelogTag } from './types';

const CHANGELOG_PATH = path.join(process.cwd(), 'content', 'changelog.md');

const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

function formatMonthLabel(dateStr: string): string {
	const d = new Date(dateStr + 'T00:00:00');
	return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

export function getChangelog(): Changelog {
	const fileContent = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
	const stats = fs.statSync(CHANGELOG_PATH);
	const { data } = matter(fileContent);

	const rawEntries: ChangelogEntry[] = (data.entries || []).map(
		(e: { date: string | Date; tag: string; text: string }) => {
			let date = '';
			if (e.date instanceof Date) {
				date = e.date.toISOString().split('T')[0];
			} else {
				date = String(e.date);
			}
			return { date, tag: e.tag as ChangelogTag, text: e.text };
		}
	);

	const monthMap = new Map<string, ChangelogEntry[]>();
	for (const entry of rawEntries) {
		const key = entry.date.slice(0, 7); // "YYYY-MM"
		if (!monthMap.has(key)) monthMap.set(key, []);
		monthMap.get(key)!.push(entry);
	}

	const months: ChangelogMonth[] = Array.from(monthMap.entries())
		.sort(([a], [b]) => b.localeCompare(a))
		.map(([, entries]) => ({
			label: formatMonthLabel(entries[0].date),
			entries
		}));

	return {
		title: data.title || 'Changelog',
		subtitle: data.subtitle || '',
		lastUpdatedAt: stats.mtime,
		months
	};
}
