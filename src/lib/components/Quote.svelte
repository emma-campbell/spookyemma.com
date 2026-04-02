<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		cite?: string;
		children: Snippet;
	}

	let { cite, children }: Props = $props();
</script>

<figure class="blockquote">
	<blockquote>
		{@render children()}
	</blockquote>
	{#if cite}
		<cite>{cite}</cite>
	{/if}
</figure>
