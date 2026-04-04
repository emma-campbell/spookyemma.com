<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'note' | 'warning' | 'info' | 'danger';
		children: Snippet;
	}

	let { type = 'note', children }: Props = $props();

	const icons: Record<string, string> = {
		note: '◈',
		warning: '⚠',
		info: '✦',
		danger: '!'
	};

	const labels: Record<string, string> = {
		note: 'note',
		warning: 'warning',
		info: 'info',
		danger: 'danger'
	};
</script>

<div class="callout {type}">
	<span class="callout-icon">{icons[type]}</span>
	<div class="callout-body">
		<strong>{labels[type]}</strong>
		{@render children()}
	</div>
</div>
