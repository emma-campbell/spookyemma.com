<script lang="ts">
	import { BgCanvas } from '$lib/components';
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

	const filters = [
		{ key: 'all', label: 'all', cls: 'filter-all' },
		{ key: 'log', label: '◈ log', cls: 'filter-log' },
		{ key: 'thinking', label: '✦ thinking', cls: 'filter-thinking' },
		{ key: 'making', label: '⚗ making', cls: 'filter-making' }
	];

	const typeStats = [
		{ icon: '◈', label: 'log', color: 'var(--sage)', key: 'log' },
		{ icon: '✦', label: 'thinking', color: 'var(--amber)', key: 'thinking' },
		{ icon: '⚗', label: 'making', color: 'var(--lavender)', key: 'making' }
	];
</script>

<svelte:head>
	<title>Notebook · Emma Campbell</title>
	<meta name="description" content="All writing — blog posts, experiments, notes, guides, micro entries." />
</svelte:head>

<BgCanvas />

<div class="page">
	<!-- Topbar -->
	<div class="topbar">
		<a class="site-title" href="/">Emma Campbell</a>
		<nav>
			<a href="/notebook" class="active">notebook</a>
			<a href="/about">about</a>
			<a href="/now">now</a>
			<a href="/uses">uses</a>
			<a href="/changelog">changelog</a>
		</nav>
	</div>

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
			{#each filters as f}
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
								<span class="entry-tag badge-{entry.entry === 'log' ? 'sage' : entry.entry === 'making' ? 'lavender' : 'amber'}">{tag}</span>
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

	<!-- Footer -->
	<footer class="nb-footer">
		<span>&copy; 2022&ndash;2026 Emma &middot; CC-BY-SA 4.0</span>
		<div class="footer-links">
			<a href="/rss.xml">rss</a>
			<a href="/changelog">changelog</a>
			<a href="https://github.com/emma-campbell" target="_blank" rel="noopener noreferrer">github</a>
		</div>
	</footer>
</div>

<style>
	.page { position: relative; z-index: 1; }

	.topbar nav a.active { color: var(--amber); }

	.nb-footer {
		margin-left: calc(var(--col-label) - 2px);
		border-left: 2px solid var(--red-line);
		border-top: 1px solid var(--border);
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.68rem;
		color: var(--muted);
	}
	.nb-footer a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
	.nb-footer a:hover { color: var(--amber); }
</style>
