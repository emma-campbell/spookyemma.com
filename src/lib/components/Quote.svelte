<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		cite?: string;
		children: Snippet;
	}

	let { cite, children }: Props = $props();
</script>

<figure class="my-2 mb-4 border-l-4 border-accent bg-accent/10 pl-6 pr-4 py-4 rounded-md relative">
	<blockquote class="text-lg italic text-text/80">
		{@render children()}
	</blockquote>
	{#if cite}
		<figcaption class="mt-2 text-sm text-accent font-medium text-right">— {cite}</figcaption>
	{/if}
</figure>
