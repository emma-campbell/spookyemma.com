<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		styled?: boolean;
		children: Snippet;
	}

	let { title, styled = false, children }: Props = $props();
</script>

<div
	class="relative my-6 rounded-lg border border-background bg-surface p-6 shadow-sm dark:border-blue-800 dark:bg-blue-950/30"
>
	<div
		class="text-text/60 dark:text-blue-200"
		class:text-sm={styled}
		class:italic={styled}
	>
		{@render children()}
	</div>
</div>
