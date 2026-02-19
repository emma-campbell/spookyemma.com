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
			<span>{segment.label}</span>
		{/if}
	{/each}
</nav>
