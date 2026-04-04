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
