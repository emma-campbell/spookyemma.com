<script lang="ts">
	import { PageShell, QuickFacts } from '$lib/components';
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
			<p class="hero-eyebrow">∴ living document ∴</p>
			<h1 class="page-title">what I'm up to <em>now</em></h1>
			<p class="page-lede">A <a href="https://nownownow.com/about" class="accent-link">/now page</a>. Not a blog post, not a status page. Just what I'm up to, updated whenever something changes.</p>
		</div>
		<div class="page-header-aside">
			<QuickFacts facts={[
				{ label: 'as of', value: data.lastUpdated ?? '' },
				{ label: 'location', value: 'Bloomington, IN' },
				{ label: 'working on', value: 'Arboretum Lifesciences' }
			]} />
		</div>
	</div>

	<!-- Featured: most recent entry -->
	{#if data.featured}
		<div class="section-row">
			<div class="row-label">
				<span class="row-label-text" style="color:var(--amber)">now<span class="row-label-num">most recent</span></span>
			</div>
			<div class="row-content">
				<div class="entry-date-stamp current">{data.featured.label}</div>
				<div class="prose">
					{@html data.featured.contentHtml}
				</div>
			</div>
			<div class="row-aside">
				<div class="annotation">
					<strong>focus</strong>
					The most recent update on what's happening.
				</div>
			</div>
		</div>
	{/if}

	<!-- Archive: older entries as timeline -->
	{#if data.archive.length > 0}
		<div class="section-row">
			<div class="row-label">
				<span class="row-label-text" style="color:var(--muted)">archive<span class="row-label-num">§ prior</span></span>
			</div>
			<div class="row-content">
				<ul class="now-timeline">
					{#each data.archive as entry}
						<li class="now-timeline-item">
							<div class="tl-date">{entry.label}</div>
							<div class="tl-prose">
								{@html entry.contentHtml}
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div class="row-aside">
				<div class="annotation">
					<strong>how this works</strong>
					Newest entry is featured above. Everything else lives here in reverse chronological order.
				</div>
			</div>
		</div>
	{/if}
</PageShell>
