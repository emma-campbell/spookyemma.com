<script lang="ts">
	import { PageShell, Stickers } from '#components';
	import { ENTRY_TYPES, FILTERS } from '#lib/content/entryTypes.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let activeFilter = $state('all');

	const filteredEntries = $derived(
		activeFilter === 'all' ? data.entries : data.entries.filter((e) => e.entry === activeFilter)
	);

	function setFilter(filter: string) {
		activeFilter = filter;
	}

	const typeStats = Object.entries(ENTRY_TYPES).map(([key, cfg]) => ({ ...cfg, key }));
</script>

<svelte:head>
	<title>Notebook · Emma Campbell</title>
	<meta
		name="description"
		content="All writing — blog posts, experiments, notes, guides, micro entries."
	/>
</svelte:head>

<PageShell>
	<Stickers variant="margins" sides="right" top="20rem" />
	<div class="page-header-row">
		<div class="page-header-label"></div>
		<div class="page-header-content">
			<h1 class="page-title">Notebook</h1>
		</div>
		<div class="page-header-aside">
			<div class="nb-type-stats">
				{#each typeStats as stat}
					<div class="nb-type-row">
						<span class="nb-type-name" style:color={stat.color}>{stat.label}</span>
						<span class="nb-type-count">{data.typeCounts[stat.key] || 0}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="filter-row">
		<div class="filter-content" role="group" aria-label="Filter by type">
			{#each FILTERS as f}
				<button
					type="button"
					class="filter-btn {f.cls}"
					class:active={activeFilter === f.key}
					aria-pressed={activeFilter === f.key}
					onclick={() => setFilter(f.key)}>{f.label}</button
				>
			{/each}
		</div>
		<span class="filter-count" aria-live="polite"
			>{filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}</span
		>
	</div>

	<ul class="feed">
		{#each filteredEntries as entry (entry.slug)}
			<li>
				<a href="/notebook/{entry.slug}" class="feed-entry type-{entry.entry}">
					<div class="entry-date-col">
						<span class="entry-date-day">{entry.day}</span>
						<span class="entry-date-month">{entry.month}</span>
						<span class="entry-date-year">{entry.year}</span>
					</div>
					<div class="entry-body">
						<div class="entry-title">{entry.title}</div>
						<div class="entry-meta">
							<span class="entry-glyph" aria-hidden="true"></span>
							<span class="entry-type-label">{entry.typeLabel}</span>
							{#each entry.tags as tag}
								<span class="entry-tag">{tag}</span>
							{/each}
						</div>
						{#if entry.excerptHtml}
							<div class="entry-excerpt">{@html entry.excerptHtml}</div>
						{/if}
						{#if entry.hasMore}
							<span class="entry-read-link">Read more</span>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</PageShell>

<style>
	/* Type stats in the header aside */
	.nb-type-stats {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.nb-type-row {
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		font-size: 0.98rem;
	}
	.nb-type-name {
		font-weight: 650;
	}
	.nb-type-count {
		color: var(--fg);
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	/* Filter bar: sticks under the top of the viewport while scanning */
	.filter-row {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		padding: 0.9rem 0 0.9rem calc(var(--col-label) + 3rem);
		background: var(--bg);
		border-top: 1px dashed var(--line-strong);
		border-bottom: 1px dashed var(--line-strong);
	}
	.filter-content {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.filter-btn {
		font: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		padding: 0.3rem 0.95rem;
		border-radius: 999px;
		border: 1.5px solid var(--line-strong);
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
		transition:
			background-color var(--transition),
			border-color var(--transition),
			color var(--transition);
	}
	.filter-btn:hover {
		color: var(--fg);
		border-color: var(--fg-muted);
	}
	.filter-btn.active {
		background: var(--fg);
		border-color: var(--fg);
		color: var(--bg);
	}
	.filter-log:not(.active) {
		color: var(--type-log);
	}
	.filter-thinking:not(.active) {
		color: var(--type-thinking);
	}
	.filter-making:not(.active) {
		color: var(--type-making);
	}
	.filter-count {
		font-size: 0.95rem;
		color: var(--fg-muted);
		font-variant-numeric: tabular-nums;
	}

	/* Feed */
	.feed {
		list-style: none;
	}
	.feed-entry {
		display: grid;
		grid-template-columns: var(--col-label) minmax(0, 1fr);
		column-gap: 3rem;
		padding: 2.25rem 0;
		border-bottom: 1px solid var(--line);
		color: inherit;
		text-decoration: none;
	}

	.entry-date-col {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.1rem;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
	.entry-date-day {
		font-family: var(--font-display);
		font-weight: 750;
		font-size: 2.2rem;
		line-height: 1;
		letter-spacing: -0.03em;
		color: var(--fg);
	}
	.entry-date-month {
		font-size: 0.98rem;
		font-weight: 600;
		color: var(--fg-muted);
	}
	.entry-date-year {
		font-size: 0.9rem;
		color: var(--fg-muted);
	}

	.entry-body {
		min-width: 0;
		max-width: var(--measure);
	}
	.entry-meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.4rem 0.75rem;
		margin-bottom: 0.75rem;
		font-size: 0.92rem;
	}
	/* A small dot of the entry's colour, no icon font */
	.entry-glyph {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: currentColor;
		flex-shrink: 0;
	}
	.entry-type-label {
		font-weight: 650;
	}
	.entry-tag {
		color: var(--fg-muted);
	}
	.type-log .entry-meta {
		color: var(--type-log);
	}
	.type-thinking .entry-meta {
		color: var(--type-thinking);
	}
	.type-making .entry-meta {
		color: var(--type-making);
	}

	.entry-title {
		font-family: var(--font-display);
		font-weight: 750;
		font-size: 1.6rem;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--fg);
		text-wrap: balance;
		margin-bottom: 0.35rem;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.15em;
	}
	.feed-entry:hover .entry-title {
		text-decoration: underline;
		text-decoration-color: var(--accent);
	}

	.entry-excerpt {
		max-width: var(--measure);
		font-size: 1.02rem;
		color: var(--fg-muted);
		line-height: 1.65;
	}
	.entry-excerpt :global(p + p) {
		margin-top: 0.75rem;
	}
	/* Headings inside a preview read as a lead-in, not a second title */
	.entry-excerpt :global(:is(h1, h2, h3, h4)) {
		font-family: var(--font-body);
		font-size: 1.02rem;
		font-weight: 700;
		letter-spacing: 0;
		color: var(--fg);
		margin: 0 0 0.25rem;
	}
	/* Quotes and disclaimers in a preview stay at body size */
	.entry-excerpt :global(blockquote),
	.entry-excerpt :global(blockquote p),
	.entry-excerpt :global(.pull-quote),
	.entry-excerpt :global(.pull-quote p) {
		font-family: var(--font-body);
		font-size: 1.02rem;
		font-weight: 400;
		letter-spacing: 0;
		line-height: 1.65;
		margin: 0;
		padding: 0;
		border: none;
		color: var(--fg-muted);
	}
	.entry-excerpt :global(div.pull-quote) {
		margin-bottom: 0.75rem;
	}
	.entry-excerpt :global(strong) {
		color: var(--fg);
		font-weight: 700;
	}
	.entry-excerpt :global(img) {
		max-width: min(100%, 560px);
		height: auto;
		display: block;
		border-radius: var(--radius-md);
		margin: 1rem 0;
	}
	.entry-excerpt :global(.figure) {
		max-width: 560px;
	}

	.entry-read-link {
		display: inline-block;
		margin-top: 0.85rem;
		font-size: 0.95rem;
		font-weight: 650;
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--accent-soft);
		text-decoration-thickness: 2px;
		text-underline-offset: 0.2em;
	}
	.feed-entry:hover .entry-read-link {
		text-decoration-color: var(--accent);
	}

	@media (max-width: 1023px) {
		.filter-row {
			padding-left: calc(120px + 2rem);
		}
		.feed-entry {
			grid-template-columns: 120px minmax(0, 1fr);
			column-gap: 2rem;
		}
	}

	@media (max-width: 639px) {
		.filter-row {
			position: static;
			padding-left: 0;
		}
		.feed-entry {
			display: block;
			padding: 1.75rem 0;
		}
		.entry-date-col {
			display: none;
		}
		.entry-title {
			font-size: 1.35rem;
		}
	}
</style>
