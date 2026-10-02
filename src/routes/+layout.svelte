<script lang="ts">
	import '../app.css';
	import posthog from 'posthog-js';
	import { browser } from '$app/env';
	import { PUBLIC_POSTHOG_KEY } from '$app/env/public';

	interface Props {
		children: import('svelte').Snippet;
	}

	export const load = async () => {
		if (browser && PUBLIC_POSTHOG_KEY) {
			posthog.init(PUBLIC_POSTHOG_KEY, {
				api_host: 'https://n.spookyemma.com',
				ui_host: 'https://us.posthog.com'
			});
		}

		return;
	};

	let { children }: Props = $props();
	load();
</script>

<svelte:head>
	<title>Emma Campbell</title>
	<meta name="description" content="Emma's Digital Presence" />
</svelte:head>

{@render children()}
