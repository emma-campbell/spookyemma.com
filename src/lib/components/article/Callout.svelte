<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'note' | 'warning' | 'danger';
		children: Snippet;
	}

	let { type = 'note', children }: Props = $props();

	const labels: Record<string, string> = {
		note: '✦ Note',
		warning: '⚠ Warning',
		danger: '⊘ Danger'
	};
</script>

<div class="callout {type}">
	<div class="callout-label">{labels[type]}</div>
	{@render children()}
</div>
