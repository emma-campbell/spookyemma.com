<script lang="ts">
	import { DateTime } from 'luxon';
	import { PostType, MdxContent } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const published = $derived(DateTime.fromISO(data.post.published));
</script>

<svelte:head>
	<title>{data.post.title} | Emma Campbell</title>
	<meta name="description" content={data.post.description || data.post.title} />
</svelte:head>

<section class="pb-8">
	<div class="flex uppercase space-x-2 font-serif text-highlighted items-center">
		<p>{published.toLocaleString(DateTime.DATE_MED)}</p>
		<p>•</p>
		<PostType type={data.post.entry} />
	</div>
	<h1 class="font-sans uppercase text-4xl">
		{data.post.title}
	</h1>
</section>

<section class="flex flex-col space-y-4 text-text/80 pb-16">
	<MdxContent html={data.post.contentHtml} />
</section>

<section class="text-muted-ink">
	<h4 class="font-sans uppercase text-body text-3xl text-muted-ink pb-2">Metadata</h4>
	<div class="flex flex-col text-body">
		<div class="flex justify-between text-lg">
			<p>Published</p>
			<p>{published.toLocaleString(DateTime.DATE_MED)}</p>
		</div>
		{#if data.post.tags && data.post.tags.length > 0}
			<div class="flex justify-between text-lg">
				<p>Tags</p>
				<p>{data.post.tags.map((t) => t.toLowerCase()).join(', ')}</p>
			</div>
		{/if}
	</div>
</section>
