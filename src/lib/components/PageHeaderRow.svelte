<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		eyebrow?: string;
		title: string;
		titleEmphasis?: string;
		lede?: string;
		labelKey?: string;
		labelValue?: string;
		aside?: Snippet;
	}

	let { eyebrow, title, titleEmphasis, lede, labelKey, labelValue, aside }: Props = $props();
</script>

<div class="page-header-row">
	<div class="page-header-label">
		{#if labelKey}
			<span class="phl-key">{labelKey}</span>
		{/if}
		{#if labelValue}
			<span class="phl-val">{labelValue}</span>
		{/if}
	</div>
	<div class="page-header-content">
		{#if eyebrow}
			<p class="hero-eyebrow">{eyebrow}</p>
		{/if}
		<h1 class="page-title">
			{title}
			{#if titleEmphasis}
				<em>{titleEmphasis}</em>
			{/if}
		</h1>
		{#if lede}
			<p class="page-lede">{lede}</p>
		{/if}
	</div>
	{#if aside}
		<div class="page-header-aside">
			{@render aside()}
		</div>
	{/if}
</div>
