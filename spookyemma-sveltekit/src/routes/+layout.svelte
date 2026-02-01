<script lang="ts">
	import '../app.css';
	import { Sidebar } from '$lib/components';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Emma Campbell</title>
	<meta name="description" content="Emma's Digital Presence" />
</svelte:head>

<div class="root bg-background leading-relaxed text-text min-h-screen">
	<Sidebar />
	<div class="lg:ml-48 min-h-screen flex flex-col">
		<main class="flex-grow mx-auto w-full max-w-4xl px-4 sm:px-8 py-12 pt-20 lg:pt-12 text-md font-sans">
			{@render children()}
		</main>
	</div>
</div>
