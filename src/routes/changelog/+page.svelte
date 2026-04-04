<script lang="ts">
	import { BgCanvas } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function splitLabel(label: string): { name: string; year: string } {
		const parts = label.split(' ');
		return { name: parts[0], year: parts[1] || '' };
	}

	function countByTag(entries: { tag: string }[]) {
		const counts: Record<string, number> = {};
		for (const e of entries) {
			counts[e.tag] = (counts[e.tag] || 0) + 1;
		}
		return counts;
	}

	const tagColors: Record<string, string> = {
		added: 'var(--sage)',
		changed: 'var(--amber)',
		fixed: 'var(--coral)',
		meta: 'var(--lavender)'
	};
</script>

<svelte:head>
	<title>Changelog · Emma Campbell</title>
	<meta name="description" content="What's changed on this site — new posts, fixes, redesigns, and version milestones." />
</svelte:head>

<BgCanvas />

<div class="page">
	<!-- Topbar -->
	<div class="topbar">
		<a class="site-title" href="/">Emma Campbell</a>
		<nav>
			<a href="/notebook">notebook</a>
			<a href="/about">about</a>
			<a href="/now">now</a>
			<a href="/uses">uses</a>
			<a href="/changelog" class="active">changelog</a>
		</nav>
	</div>

	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">{data.lastUpdated}</span>
		</div>
		<div class="page-header-content">
			<p class="page-eyebrow">∴ site history ∴</p>
			<h1 class="page-title">change<em>log</em></h1>
			<p class="page-lede">What's changed on this site — new posts, fixes, redesigns, and version milestones. Most recent first.</p>
		</div>
		<div class="page-header-aside">
			<div class="legend">
				<div class="legend-item"><span class="legend-dot" style="background:var(--sage)"></span><span style="color:var(--sage)">added</span> — new content or features</div>
				<div class="legend-item"><span class="legend-dot" style="background:var(--amber)"></span><span style="color:var(--amber)">changed</span> — modifications</div>
				<div class="legend-item"><span class="legend-dot" style="background:var(--coral)"></span><span style="color:var(--coral)">fixed</span> — bug fixes</div>
				<div class="legend-item"><span class="legend-dot" style="background:var(--lavender)"></span><span style="color:var(--lavender)">meta</span> — versions &amp; milestones</div>
			</div>
		</div>
	</div>

	<!-- Month rows -->
	{#each data.months as month}
		{@const { name, year } = splitLabel(month.label)}
		{@const counts = countByTag(month.entries)}
		<div class="month-row">
			<div class="month-label">
				<span class="month-name">{name}</span>
				<span class="month-year">{year}</span>
			</div>
			<div class="month-content">
				<ul class="cl-entry-list">
					{#each month.entries as entry}
						<li class="cl-entry-row">
							<span class="cl-entry-date">{entry.shortDate}</span>
							<span class="cl-entry-type type-{entry.tag}">{entry.tag}</span>
							<span class="cl-entry-desc" class:is-meta={entry.tag === 'meta'}>{entry.text}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="month-aside">
				{#each Object.entries(counts) as [tag, count]}
					<div class="month-stat">
						<span class="month-stat-dot" style="background:{tagColors[tag] || 'var(--muted)'}"></span>
						<span class="month-stat-count">{count}</span> {tag}
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<!-- Footer -->
	<footer class="cl-footer">
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

	.cl-footer {
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
	.cl-footer a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
	.cl-footer a:hover { color: var(--amber); }
</style>
