<script lang="ts">
	import type { Snippet } from 'svelte';
	import BgCanvas from './BgCanvas.svelte';
	import Topbar from './Topbar.svelte';
	import Footer from './Footer.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<BgCanvas />

<div class="page">
	<Topbar />
	{@render children()}
	<Footer />
</div>
