import type { PostEntry } from './types';

export interface EntryTypeConfig {
	label: string;
	color: string;
}

export const ENTRY_TYPES: Record<PostEntry, EntryTypeConfig> = {
	log: { label: 'log', color: 'var(--type-log)' },
	thinking: { label: 'thinking', color: 'var(--type-thinking)' },
	making: { label: 'making', color: 'var(--type-making)' }
};

/** Home page section order */
export const SECTION_ORDER: PostEntry[] = ['making', 'thinking', 'log'];

/** Filter buttons for notebook page */
export const FILTERS = [
	{ key: 'all' as const, label: 'all', cls: 'filter-all' },
	...SECTION_ORDER.map((key) => ({
		key,
		label: ENTRY_TYPES[key].label,
		cls: `filter-${key}`
	}))
];
