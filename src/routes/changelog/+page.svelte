<script lang="ts">
	import { PageShell } from '$lib/components';
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

<PageShell>
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
</PageShell>

<style>
/* Month row layout */
.month-row { display: flex; border-bottom: 1px solid var(--border); }
.month-label {
	width: var(--col-label); flex-shrink: 0;
	border-right: 2px solid var(--red-line);
	padding: 1.75rem 1rem 1.75rem 0.75rem;
	display: flex; flex-direction: column;
	align-items: flex-end; justify-content: flex-start; gap: 0.3rem;
}
.month-name { font-size: 0.72rem; letter-spacing: 0.06em; color: var(--parchment); text-align: right; line-height: 1.4; }
.month-year { font-size: 0.58rem; color: var(--muted); letter-spacing: 0.06em; text-align: right; }
.month-content { flex: 1; padding: 1.5rem 3rem; border-right: 1px solid var(--border); }
.month-aside { width: var(--col-right); flex-shrink: 0; padding: 1.75rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }

/* Changelog entry grid */
.cl-entry-list { list-style: none; display: flex; flex-direction: column; }
.cl-entry-row {
	display: grid;
	grid-template-columns: 56px 76px 1fr;
	gap: 0 0.75rem;
	padding: 0.55rem 0;
	align-items: baseline;
	transition: background 0.15s;
}
.cl-entry-row:hover { background: rgba(232,168,48,0.04); margin-left: -0.5rem; padding-left: 0.5rem; }

.cl-entry-date { font-size: 0.68rem; color: var(--muted); font-variant-numeric: tabular-nums; letter-spacing: 0.04em; white-space: nowrap; }
.cl-entry-type {
	display: inline-block; font-size: 0.58rem; letter-spacing: 0.08em;
	padding: 2px 6px; border-radius: 2px; text-transform: lowercase;
	justify-self: start; white-space: nowrap;
}
.type-added   { background: rgba(122,158,126,0.15); color: var(--sage); }
.type-changed { background: rgba(232,168,48,0.12);  color: var(--amber); }
.type-fixed   { background: rgba(212,101,74,0.12);  color: var(--coral); }
.type-meta    { background: rgba(155,142,196,0.15); color: var(--lavender); }
.cl-entry-desc { font-size: 0.8rem; color: var(--parchment); line-height: 1.5; }
.cl-entry-desc.is-meta { font-family: var(--font-display); font-style: italic; font-size: 0.85rem; color: var(--lavender); }

/* Legend */
.legend { display: flex; flex-direction: column; gap: 0.5rem; }
.legend-item { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.68rem; color: var(--muted); line-height: 1.5; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 0.3em; }

/* Month stats */
.month-stat { display: flex; align-items: center; gap: 0.5rem; font-size: 0.65rem; color: var(--muted); }
.month-stat-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.month-stat-count { color: var(--parchment); font-variant-numeric: tabular-nums; }
</style>
