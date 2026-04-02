<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		styled?: boolean;
		children: Snippet;
	}

	let { title, styled = false, children }: Props = $props();
</script>

<aside class="callout">
	{#if title}
		<div class="callout-label">{title}</div>
	{/if}
	<div class:callout-styled={styled}>
		{@render children()}
	</div>
</aside>

<style>
	.callout-styled {
		font-size: 0.78rem;
		font-style: italic;
	}
</style>
