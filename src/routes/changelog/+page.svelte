<script lang="ts">
	import { Breadcrumb } from '$lib/components/article';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDay(dateStr: string): string {
		const d = new Date(dateStr + 'T00:00:00');
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>Changelog · Emma Campbell</title>
	<meta name="description" content="A running log of changes to this site." />
</svelte:head>

<article>
	<Breadcrumb segments={[
		{ label: 'Index', href: '/' },
		{ label: 'Changelog' }
	]} />

	<header class="changelog-header">
		<h1 class="page-title">{data.title}</h1>
		<p class="page-subtitle">{data.subtitle}</p>
		{#if data.lastUpdated}
			<p class="changelog-updated">Last updated {data.lastUpdated}</p>
		{/if}
	</header>

	{#each data.months as month}
		<section class="changelog-month">
			<h2 class="changelog-month-label">{month.label}</h2>
			<ul class="changelog-entries">
				{#each month.entries as entry}
					<li class="changelog-entry">
						<span class="changelog-date">{formatDay(entry.date)}</span>
						<span class="changelog-tag tag-{entry.tag}">{entry.tag}</span>
						<span class="changelog-text">{entry.text}</span>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</article>
