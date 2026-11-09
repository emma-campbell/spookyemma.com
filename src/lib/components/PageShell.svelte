<script lang="ts">
	import type { Snippet } from 'svelte';
	import Topbar from './Topbar.svelte';
	import Footer from './Footer.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<a class="skip-link" href="#main">Skip to main content</a>

<div class="page">
	<Topbar />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
</div>
