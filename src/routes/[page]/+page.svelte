<script lang="ts">
	import {
		Breadcrumb,
		ArticleHeader,
		TableOfContents,
		Prose
	} from '$lib/components/article';
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

	<ArticleHeader
		title={data.page.title}
		description={data.page.description}
		updated={data.page.lastUpdatedAt}
		wordCount={data.wordCount}
		readingTime={data.readingTime}
	/>

	<TableOfContents headings={data.toc} />
	<Prose html={data.page.contentHtml} />
</article>
