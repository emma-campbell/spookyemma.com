import type { PostEntry } from './types';

export interface EntryTypeConfig {
	label: string;
	icon: string;
	color: string;
}

export const ENTRY_TYPES: Record<PostEntry, EntryTypeConfig> = {
	log:      { label: 'log',      icon: '◈', color: 'var(--sage)' },
	thinking: { label: 'thinking', icon: '✦', color: 'var(--amber)' },
	making:   { label: 'making',   icon: '⚗', color: 'var(--lavender)' }
};

/** Home page section order */
export const SECTION_ORDER: PostEntry[] = ['making', 'thinking', 'log'];

/** Filter buttons for notebook page */
export const FILTERS = [
	{ key: 'all' as const, label: 'all', cls: 'filter-all' },
	...SECTION_ORDER.map((key) => ({
		key,
		label: `${ENTRY_TYPES[key].icon} ${ENTRY_TYPES[key].label}`,
		cls: `filter-${key}`
	}))
];
