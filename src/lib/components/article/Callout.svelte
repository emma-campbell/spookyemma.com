<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'note' | 'warning' | 'info' | 'danger';
		children: Snippet;
	}

	let { type = 'note', children }: Props = $props();

	const labels: Record<string, string> = {
		note: 'Note',
		warning: 'Warning',
		info: 'Info',
		danger: 'Danger'
	};
</script>

<div class="callout {type}">
	<div class="callout-body">
		<strong>{labels[type]}</strong>
		{@render children()}
	</div>
</div>
