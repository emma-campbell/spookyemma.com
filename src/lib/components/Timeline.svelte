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
		<li class="timeline-item">
			<div class="timeline-content">
				<div class="timeline-line"></div>

				<div class="timeline-dot" class:timeline-dot--active={isFirst}>
					{#if isFirst}
						<span class="timeline-ping"></span>
						<span class="timeline-ping timeline-ping--delayed"></span>
					{/if}
				</div>

				<time class="timeline-date">{format(date, 'MMMM y')}</time>
				<div class="timeline-body">
					{@render children({ item })}
				</div>
			</div>
		</li>
	{/each}
</ol>

<style>
	.timeline {
		list-style: none;
		padding: 0;
		-webkit-font-smoothing: antialiased;
	}

	.timeline-item {
		position: relative;
		padding-left: 1rem;
		padding-bottom: var(--space-xl);
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-content {
		padding-left: 1rem;
	}

	.timeline-line {
		position: absolute;
		left: 0;
		top: 0.75rem;
		bottom: 0;
		width: 1px;
		border-left: 1px dashed var(--border);
	}

	.timeline-item:last-child .timeline-line {
		display: none;
	}

	.timeline-dot {
		position: absolute;
		left: -0.375rem;
		top: 0.375rem;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: var(--text-tertiary);
	}

	.timeline-dot--active {
		background: var(--accent);
	}

	.timeline-ping {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: var(--accent);
		animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	.timeline-ping--delayed {
		animation-delay: 200ms;
	}

	@keyframes ping {
		75%, 100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.timeline-date {
		font-weight: 600;
		font-size: 0.82rem;
	}

	.timeline-body {
		margin-top: var(--space-sm);
		font-size: 0.78rem;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
</style>
