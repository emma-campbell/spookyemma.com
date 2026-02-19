<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: number;
		children: Snippet;
	}

	let { id, children }: Props = $props();
</script>

<sup class="sidenote-ref"><a href="#sn-{id}">{id}</a></sup>
<aside class="sidenote" id="sn-{id}">
	<span class="sidenote-number">{id}.</span>
	{@render children()}
</aside>
