<script lang="ts" generics="T extends { month: number; year: number }">
	import { format } from 'date-fns';
	import type { Snippet } from 'svelte';

	interface Props {
		items: T[];
		children: Snippet<[{ item: T }]>;
	}

	let { items, children }: Props = $props();
</script>

<ol class="antialiased">
	{#each items as item, index}
		{@const isFirst = index === 0}
		{@const date = new Date(item.year, item.month - 1)}
		<li class="relative group ms-4 pb-8 last:pb-0">
			<div class="pl-4">
				<!-- Vertical line -->
				<div
					class="absolute left-0 top-3 bottom-0 w-px border-l border-dashed border-gray-300 last:hidden"
				></div>

				<!-- Dot -->
				<div class="absolute -start-1.5 top-1.5">
					<span class="relative block rounded-full w-3 h-3 {isFirst ? 'bg-green-500' : 'bg-gray-400'}">
						{#if isFirst}
							<span class="absolute inset-0 rounded-full bg-green-500 animate-ping"></span>
							<span class="absolute inset-0 rounded-full bg-green-500 animate-ping animation-delay-200"
							></span>
						{/if}
					</span>
				</div>

				<time class="font-medium">{format(date, 'MMMM y')}</time>
				<div class="space-y-4 text-sm mt-2">
					{@render children({ item })}
				</div>
			</div>
		</li>
	{/each}
</ol>
