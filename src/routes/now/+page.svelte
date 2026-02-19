<script lang="ts">
	import { Breadcrumb } from '$lib/components/article';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Now · Emma Campbell</title>
	<meta name="description" content="What I'm up to, updated whenever something changes." />
</svelte:head>

<article>
	<Breadcrumb segments={[
		{ label: 'Index', href: '/' },
		{ label: 'Now' }
	]} />

	<header class="now-header">
		<h1 class="now-title">Now</h1>
		<p class="now-subtitle">What I'm up to, updated whenever something changes.</p>
		{#if data.lastUpdated}
			<p class="now-updated">Last updated {data.lastUpdated}</p>
		{/if}
		<p class="now-what">
			This is a <a href="https://nownownow.com/about">/now page</a>.
			It's a living document — not a blog post, not a status page. Just what I'm up to.
		</p>
	</header>

	<div class="now-body">
		{#each data.entries as entry}
			<h2>{entry.label}</h2>
			{@html entry.contentHtml}
		{/each}
	</div>
</article>
