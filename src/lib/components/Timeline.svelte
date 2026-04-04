<script lang="ts" generics="T extends { month: number; year: number }">
	import { format } from 'date-fns';
	import type { Snippet } from 'svelte';

	interface Props {
		items: T[];
		children: Snippet<[{ item: T }]>;
	}

	let { items, children }: Props = $props();
</script>

<ol class="timeline">
	{#each items as item, index}
		{@const isFirst = index === 0}
		{@const date = new Date(item.year, item.month - 1)}
		<li class="timeline-item" class:t-amber={isFirst}>
			<div class="timeline-date">{format(date, 'MMMM y')}</div>
			<div class="timeline-body">
				{@render children({ item })}
			</div>
		</li>
	{/each}
</ol>
