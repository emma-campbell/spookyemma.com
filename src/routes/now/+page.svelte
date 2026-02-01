<script lang="ts">
	import { Timeline, MdxContent } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Now | Emma Campbell</title>
</svelte:head>

<section class="flex flex-col space-y-10 text-body">
	<div>
		<h1 class="font-sans text-4xl font-medium text-body pb-2">What I'm doing now</h1>
		<p class="text-md">
			This page is updated as I do things. No particular cadence. Just when I feel like it.
		</p>
	</div>

	<Timeline items={data.entries}>
		{#snippet children({ item })}
			<div class="space-y-4 text-sm">
				<MdxContent html={item.contentHtml} />
			</div>
		{/snippet}
	</Timeline>
</section>
