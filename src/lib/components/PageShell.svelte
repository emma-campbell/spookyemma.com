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

<a class="skip-link" href="#main">Skip to main content</a>

<div class="page">
	<Topbar />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
</div>
