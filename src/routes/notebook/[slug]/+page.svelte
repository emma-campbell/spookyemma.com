<script lang="ts">
	import {
		Breadcrumb,
		ArticleHeader,
		TableOfContents,
		Prose,
		ArticleFooter
	} from '$lib/components/article';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title} · Emma Campbell</title>
	<meta name="description" content={data.post.description || data.post.title} />
</svelte:head>

<article>
	<Breadcrumb segments={[
		{ label: 'Index', href: '/' },
		{ label: 'Notebook', href: '/notebook' },
		{ label: data.post.title }
	]} />

	<ArticleHeader
		title={data.post.title}
		description={data.post.description}
		published={data.post.published}
		updated={data.post.updated}
		status={data.post.status}
		entry={data.post.entry}
		tags={data.post.tags}
		wordCount={data.wordCount}
		readingTime={data.readingTime}
	/>

	<TableOfContents headings={data.toc} />
	<Prose html={data.post.contentHtml} />

	<ArticleFooter
		prevPost={data.prevPost}
		nextPost={data.nextPost}
		backlinks={data.backlinks}
	/>
</article>
