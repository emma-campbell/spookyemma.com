<script lang="ts">
	interface Segment {
		label: string;
		href?: string;
	}

	interface Props {
		segments: Segment[];
	}

	let { segments }: Props = $props();
</script>

<nav class="breadcrumb">
	{#each segments as segment, i}
		{#if i > 0}
			<span class="sep">/</span>
		{/if}
		{#if segment.href}
			<a href={segment.href}>{segment.label}</a>
		{:else}
			<strong class="crumb-current" aria-current="page">{segment.label}</strong>
		{/if}
	{/each}
</nav>

<style>
	/* The current page reads at full muted ink, not faded like the separators */
	.crumb-current {
		font-weight: 500;
		color: var(--fg-muted);
	}
</style>
