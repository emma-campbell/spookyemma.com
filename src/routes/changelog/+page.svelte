<script lang="ts">
	import { PageShell } from '#components';
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
		added: 'var(--type-log)',
		changed: 'var(--type-thinking)',
		fixed: 'var(--type-danger)',
		meta: 'var(--type-making)'
	};

	const legend = [
		{ tag: 'added', desc: 'new content or features' },
		{ tag: 'changed', desc: 'modifications' },
		{ tag: 'fixed', desc: 'bug fixes' },
		{ tag: 'meta', desc: 'versions and milestones' }
	];
</script>

<svelte:head>
	<title>Changelog · Emma Campbell</title>
	<meta
		name="description"
		content="What's changed on this site — new posts, fixes, redesigns, and version milestones."
	/>
</svelte:head>

<PageShell>
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">{data.lastUpdated}</span>
		</div>
		<div class="page-header-content">
			<h1 class="page-title">Changelog</h1>
			<p class="page-lede">{data.subtitle}</p>
		</div>
		<div class="page-header-aside">
			<dl class="legend">
				{#each legend as item}
					<div class="legend-item">
						<dt class="cl-tag" style:color={tagColors[item.tag]}>{item.tag}</dt>
						<dd>{item.desc}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>

	{#each data.months as month}
		{@const { name, year } = splitLabel(month.label)}
		{@const counts = countByTag(month.entries)}
		<section class="section-row month-row" aria-label={month.label}>
			<div class="row-label">
				<span class="month-name">{name}</span>
				<span class="month-year">{year}</span>
			</div>
			<div class="row-content">
				<ul class="cl-entry-list">
					{#each month.entries as entry}
						<li class="cl-entry-row">
							<span class="cl-entry-date">{entry.shortDate}</span>
							<span class="cl-tag" style:color={tagColors[entry.tag] || 'var(--fg-muted)'}
								>{entry.tag}</span
							>
							<span class="cl-entry-desc" class:is-meta={entry.tag === 'meta'}>{entry.text}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="row-aside">
				<div class="month-stats">
					{#each Object.entries(counts) as [tag, count]}
						<div class="month-stat">
							<span class="month-stat-count">{count}</span>
							<span style:color={tagColors[tag] || 'var(--fg-muted)'}>{tag}</span>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/each}
</PageShell>

<style>
	.legend {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}
	.legend-item {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		font-size: 0.95rem;
		color: var(--fg-muted);
		line-height: 1.4;
	}

	.month-name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: -0.01em;
		color: var(--fg);
		line-height: 1.2;
	}
	.month-year {
		font-size: 0.95rem;
		color: var(--fg-muted);
		font-variant-numeric: tabular-nums;
	}

	.cl-entry-list {
		list-style: none;
		max-width: var(--measure);
	}
	.cl-entry-row {
		display: grid;
		grid-template-columns: 4rem 5.5rem minmax(0, 1fr);
		gap: 0 1rem;
		padding: 0.55rem 0;
		align-items: baseline;
		border-bottom: 1px solid var(--line);
	}
	.cl-entry-row:last-child {
		border-bottom: none;
	}
	.cl-entry-date {
		font-size: 0.95rem;
		color: var(--fg-muted);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	/* Tag as a coloured word: the colour carries the type, the word carries it for everyone else */
	.cl-tag {
		font-size: 0.92rem;
		font-weight: 650;
		white-space: nowrap;
	}
	.cl-entry-desc {
		color: var(--fg);
		line-height: 1.5;
	}
	.cl-entry-desc.is-meta {
		font-weight: 650;
	}

	@media (max-width: 639px) {
		.month-row .row-label {
			flex-direction: row;
			align-items: baseline;
			gap: 0.5rem;
		}
		.cl-entry-row {
			grid-template-columns: auto 1fr;
			row-gap: 0.15rem;
		}
		.cl-entry-desc {
			grid-column: 1 / -1;
		}
		.month-row .row-aside {
			display: none;
		}
	}
</style>
