<script lang="ts">
	import { PageShell, QuickFacts } from '#components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Now · Emma Campbell</title>
	<meta name="description" content="What I'm up to, updated whenever something changes." />
</svelte:head>

<PageShell>
	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">{data.lastUpdated ?? ''}</span>
		</div>
		<div class="page-header-content">
			<h1 class="page-title">What I'm up to now</h1>
			<p class="page-lede">
				A <a href="https://nownownow.com/about">/now page</a>: what I'm up to, updated whenever
				something changes.
			</p>
		</div>
		<div class="page-header-aside">
			<QuickFacts
				facts={[
					{ label: 'location', value: 'Bloomington, IN' },
					{ label: 'working on', value: 'Arboretum Lifesciences' }
				]}
			/>
		</div>
	</div>

	<!-- Latest entry -->
	{#if data.featured}
		<div class="section-row">
			<div class="row-label">
				<span class="row-label-text">Latest</span>
			</div>
			<div class="row-content">
				<h2 class="entry-date">{data.featured.label}</h2>
				<div class="prose">
					{@html data.featured.contentHtml}
				</div>
			</div>
		</div>
	{/if}

	<!-- Older entries -->
	{#if data.archive.length > 0}
		<div class="section-row">
			<div class="row-label">
				<span class="row-label-text">Earlier</span>
			</div>
			<div class="row-content">
				<ul class="now-timeline">
					{#each data.archive as entry}
						<li class="now-timeline-item">
							<h3 class="tl-date">{entry.label}</h3>
							<div class="prose tl-prose">
								{@html entry.contentHtml}
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</PageShell>

<style>
	.entry-date {
		font-family: var(--font-display);
		font-weight: 750;
		font-size: 1.6rem;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--fg);
		margin-bottom: 1rem;
	}

	/* Older entries: a dashed line with an open dot per month */
	.now-timeline {
		list-style: none;
		position: relative;
		padding-left: 1.75rem;
	}
	.now-timeline::before {
		content: '';
		position: absolute;
		left: 5px;
		top: 0.6rem;
		bottom: 0.6rem;
		border-left: 1.5px dashed var(--line-strong);
	}
	.now-timeline-item {
		position: relative;
		padding-bottom: 2.25rem;
	}
	.now-timeline-item:last-child {
		padding-bottom: 0;
	}
	.now-timeline-item::before {
		content: '';
		position: absolute;
		left: -1.75rem;
		top: 0.45rem;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		border: 2px solid var(--fg-muted);
		background: var(--bg);
	}
	.tl-date {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15rem;
		line-height: 1.3;
		color: var(--fg);
		margin-bottom: 0.4rem;
	}
	.tl-prose :global(p) {
		margin-bottom: 0.75rem;
	}
	/* Now entries are mostly a line and a gif; keep images from swamping them */
	.row-content :global(.prose img) {
		max-width: min(100%, 480px);
	}
</style>
