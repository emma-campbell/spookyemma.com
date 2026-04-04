<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: number;
		children: Snippet;
	}

	let { id, children }: Props = $props();
</script>

<a class="sidenote-ref" href="#sn-{id}">{id}</a>
<aside class="sidenote" id="sn-{id}">
	<span class="sidenote-num">{id}.</span>
	{@render children()}
</aside>
