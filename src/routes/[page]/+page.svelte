<script lang="ts">
	import { Breadcrumb } from '$lib/components/article';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.page.title} · Emma Campbell</title>
	{#if data.page.description}
		<meta name="description" content={data.page.description} />
	{/if}
</svelte:head>

<article>
	<Breadcrumb segments={[
		{ label: 'Index', href: '/' },
		{ label: data.page.title }
	]} />

	<header class="page-header">
		<h1 class="page-title">{data.page.title}</h1>
		{#if data.page.description}
			<p class="page-subtitle">{data.page.description}</p>
		{/if}
		{#if data.lastUpdated}
			<p class="page-updated">Last updated {data.lastUpdated}</p>
		{/if}
	</header>

	<div class="page-body">
		{@html data.page.contentHtml}
	</div>
</article>
