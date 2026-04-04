<script lang="ts">
	import { PageShell } from '$lib/components';
	import { ENTRY_TYPES, FILTERS } from '$lib/content/entryTypes';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let activeFilter = $state('all');

	const filteredEntries = $derived(
		activeFilter === 'all'
			? data.entries
			: data.entries.filter((e) => e.entry === activeFilter)
	);

	function setFilter(filter: string) {
		activeFilter = filter;
	}

	const typeStats = Object.entries(ENTRY_TYPES).map(([key, cfg]) => ({ ...cfg, key }));
</script>

<svelte:head>
	<title>Notebook · Emma Campbell</title>
	<meta name="description" content="All writing — blog posts, experiments, notes, guides, micro entries." />
</svelte:head>

<PageShell>
	<!-- Header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">entries</span>
			<span class="phl-val">{data.totalCount}</span>
		</div>
		<div class="page-header-content">
			<p class="hero-eyebrow">∴ all writing ∴</p>
			<h1 class="page-title">the <em>notebook</em></h1>
			<p class="page-lede">Everything — blog posts, experiments, notes, guides, micro entries. Reverse chronological. Filter by type below.</p>
		</div>
		<div class="page-header-aside">
			<div class="nb-type-stats">
				{#each typeStats as stat}
					<div class="nb-type-row">
						<span style:color={stat.color}>{stat.icon} {stat.label}</span>
						<span>{data.typeCounts[stat.key] || 0}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Filter -->
	<div class="filter-row">
		<div class="filter-label-col">
			<span class="filter-label-text">filter</span>
		</div>
		<div class="filter-content">
			{#each FILTERS as f}
				<button
					class="filter-btn {f.cls}"
					class:active={activeFilter === f.key}
					onclick={() => setFilter(f.key)}
				>{f.label}</button>
			{/each}
		</div>
		<div class="filter-aside">
			<span class="filter-count">showing {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}</span>
		</div>
	</div>

	<!-- Feed -->
	{#each filteredEntries as entry}
		<a href="/notebook/{entry.slug}" class="feed-entry type-{entry.entry}">
			<div class="entry-date-col">
				<span class="entry-date-day">{entry.day}</span>
				<span class="entry-date-month">{entry.month}</span>
				<span class="entry-date-year">{entry.year}</span>
			</div>
			<div class="entry-body">
				<div class="entry-meta">
					<span class="entry-glyph">{entry.typeIcon}</span>
					<span class="entry-type-label">{entry.typeLabel}</span>
					{#if entry.tags.length > 0}
						<div class="entry-tags">
							{#each entry.tags as tag}
								<span class="entry-tag" style:--badge-color={ENTRY_TYPES[entry.entry]?.color}>{tag}</span>
							{/each}
						</div>
					{/if}
				</div>
				<div class="entry-title">{entry.title}</div>
				{#if entry.excerptHtml}
					<div class="entry-excerpt">{@html entry.excerptHtml}</div>
				{/if}
				{#if entry.hasMore}
					<div class="entry-footer">
						<span class="entry-read-link">read more →</span>
					</div>
				{/if}
			</div>
			<div class="entry-aside"></div>
		</a>
	{/each}

</PageShell>

<style>
/* Filter strip */
.filter-row { display: flex; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 10; background: var(--ink); }
.filter-label-col {
	width: var(--col-label); flex-shrink: 0;
	border-right: 2px solid var(--red-line);
	padding: 0.9rem 1rem 0.9rem 0.75rem;
	display: flex; align-items: center; justify-content: flex-end;
}
.filter-label-text { font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); text-align: right; }
.filter-content {
	flex: 1; padding: 0.9rem 3rem;
	display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
	border-right: 1px solid var(--border);
}
.filter-btn {
	font-family: var(--font-mono);
	font-size: 0.65rem; letter-spacing: 0.08em;
	padding: 3px 10px; border-radius: 2px;
	border: 1px solid currentColor;
	background: transparent; cursor: pointer;
	transition: background 0.15s, color 0.15s;
}
.filter-btn:hover { background: rgba(255,255,255,0.05); }
.filter-all      { color: var(--parchment); border-color: var(--border); }
.filter-all.active { color: var(--amber); border-color: var(--amber); background: rgba(232,168,48,0.08); }
.filter-log      { color: var(--sage); }
.filter-log.active      { background: rgba(122,158,126,0.08); }
.filter-thinking { color: var(--amber); }
.filter-thinking.active { background: rgba(232,168,48,0.08); }
.filter-making   { color: var(--lavender); }
.filter-making.active   { background: rgba(155,142,196,0.08); }
.filter-aside {
	width: 220px; flex-shrink: 0; padding: 0.9rem 1.5rem;
	display: flex; align-items: center;
}
.filter-count { font-size: 0.65rem; color: var(--muted); letter-spacing: 0.04em; }

/* Feed entry card */
.feed-entry {
	display: flex;
	border-bottom: 1px solid var(--border);
	transition: background 0.15s;
	text-decoration: none;
	color: inherit;
}
.feed-entry:hover { background: rgba(232,168,48,0.025); }

.entry-date-col {
	width: var(--col-label); flex-shrink: 0;
	border-right: 2px solid var(--red-line);
	padding: 2.25rem 1rem 2.25rem 0.75rem;
	display: flex; flex-direction: column;
	align-items: flex-end; justify-content: flex-start; gap: 0.2rem;
}
.entry-date-day {
	font-family: var(--font-display);
	font-style: italic; font-size: 1.8rem;
	color: var(--muted); line-height: 1; letter-spacing: -0.02em;
}
.entry-date-month { font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); opacity: 0.7; }
.entry-date-year  { font-size: 0.52rem; color: var(--muted); opacity: 0.45; letter-spacing: 0.06em; }

.entry-body { flex: 1; }

.entry-meta {
	display: flex; align-items: center; gap: 0.5rem;
	padding: 2.25rem 2.5rem 0.6rem;
}
.entry-glyph { font-size: 0.72rem; flex-shrink: 0; }
.entry-type-label { font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; }
.entry-tags { display: flex; gap: 0.4rem; margin-left: 0.25rem; }
.entry-tag {
	font-size: 0.58rem; letter-spacing: 0.06em;
	padding: 1px 6px; border-radius: 2px;
}

.entry-title {
	font-family: var(--font-display);
	font-style: italic; font-weight: 700;
	font-size: 1.15rem; color: var(--parchment);
	line-height: 1.25;
	padding: 0 2.5rem 0.75rem;
	transition: color 0.2s;
}
.feed-entry:hover .entry-title { color: var(--amber); }

.entry-excerpt {
	font-size: 0.85rem; color: var(--muted);
	line-height: 1.8; padding: 0 2.5rem 1.5rem;
}
.entry-excerpt :global(strong) { color: var(--parchment); font-weight: 700; }
.entry-excerpt :global(img) {
	max-width: 620px; display: block;
	border: 1px solid rgba(196,169,106,0.15);
	border-radius: 3px;
	margin: 1rem 0;
}
.entry-excerpt :global(.figure) {
	max-width: 620px;
}

.entry-image {
	display: block;
	padding: 0 2.5rem 0;
}
.entry-image img {
	max-width: 100%; display: block;
	max-height: 340px; object-fit: cover;
	border: 1px solid rgba(196,169,106,0.15);
	border-radius: 3px;
}

.entry-footer {
	padding: 1rem 2.5rem 2rem;
	display: flex; align-items: center; gap: 0.5rem;
}
.entry-read-link {
	font-size: 0.65rem; letter-spacing: 0.1em;
	text-transform: uppercase; color: var(--muted);
	display: inline-flex; align-items: center; gap: 0.4rem;
	transition: color 0.2s;
}
.feed-entry:hover .entry-read-link { color: var(--amber); }

/* Type color variants */
.type-log      .entry-glyph, .type-log      .entry-type-label { color: var(--sage); }
.type-thinking .entry-glyph, .type-thinking .entry-type-label { color: var(--amber); }
.type-making   .entry-glyph, .type-making   .entry-type-label { color: var(--lavender); }

.entry-aside {
	width: 220px; flex-shrink: 0;
	border-left: 1px solid var(--border);
	padding: 2.25rem 1.5rem;
	display: flex; flex-direction: column; gap: 1rem;
}

/* Notebook header aside stats */
.nb-type-stats { display: flex; flex-direction: column; gap: 0.55rem; }
.nb-type-row { display: flex; justify-content: space-between; font-size: 0.68rem; }

/* Tablet: drop aside */
@media (max-width: 899px) {
	.entry-aside { display: none; }
	.filter-aside { display: none; }
	.filter-content { border-right: none; }
}

/* Mobile: collapse date col, full-width entries */
@media (max-width: 599px) {
	.filter-row { position: static; }
	.filter-label-col { display: none; }
	.filter-content { padding: 0.75rem 1.25rem; border-right: none; }
	.filter-btn { font-size: 0.6rem; padding: 3px 8px; }

	.feed-entry { flex-direction: column; }
	.entry-date-col { display: none; }
	.entry-aside { display: none; }
	.entry-body { width: 100%; }
	.entry-meta { padding: 1.25rem 1.25rem 0.5rem; }
	.entry-title { padding: 0 1.25rem 0.5rem; font-size: 1rem; }
	.entry-excerpt { padding: 0 1.25rem 1rem; font-size: 0.82rem; }
	.entry-footer { padding: 0.75rem 1.25rem 1.25rem; }
}
</style>
