<script lang="ts">
	import { spring } from 'svelte/motion';
	import type { Snippet } from 'svelte';

	interface Props {
		isActive?: boolean;
		isExternal?: boolean;
		class?: string;
		children: Snippet;
	}

	let { isActive = false, isExternal = false, class: className = '', children }: Props = $props();

	let isHovered = $state(false);
	const shouldAnimate = $derived(isActive || isHovered);

	const height = spring(2, { stiffness: 0.1, damping: 0.4 });
	const colorProgress = spring(0, { stiffness: 0.15, damping: 0.5 });

	$effect(() => {
		height.set(shouldAnimate ? 100 : 2);
		colorProgress.set(shouldAnimate ? 1 : 0);
	});
</script>

<span
	class="relative inline-block {className}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="presentation"
>
	<span
		class="absolute inset-x-0 bottom-0 bg-accent origin-left"
		style="height: {$height}%"
	></span>
	<span class="relative z-10 inline-flex items-center gap-1">
		<span
			class="inline-block transition-colors duration-200"
			style="color: {$colorProgress > 0.5 ? 'var(--background)' : 'currentColor'}"
		>
			{@render children()}
		</span>
		{#if isExternal}
			<svg
				class="w-3 h-3 inline-block transition-colors duration-200"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				style="color: {$colorProgress > 0.5 ? 'var(--background)' : 'currentColor'}"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
				/>
			</svg>
		{/if}
	</span>
</span>
