<script lang="ts">
	import { MdxContent } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Changelog | Emma Campbell</title>
</svelte:head>

<h1 class="font-sans text-4xl pb-4">Changelog</h1>
<p class="text-text">
	A <i>changelog</i> is a document that collects records of changes made to a piece of software. Here
	are all the ways this site has changed over time.
</p>

<section class="text-body pt-3 space-y-4">
	<MdxContent html={data.changelogHtml} />
</section>
