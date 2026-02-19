<script lang="ts">
	import MetaBlock from './MetaBlock.svelte';

	interface Props {
		title: string;
		description?: string;
		published?: string;
		updated?: Date | string;
		status?: 'certain' | 'likely' | 'speculative' | 'uncertain';
		entry?: string;
		tags?: string[];
		wordCount?: number;
		readingTime?: string;
	}

	let { title, description, published, updated, status, entry, tags, wordCount, readingTime }: Props = $props();
</script>

<header>
	<h1 class="page-title">{title}</h1>
	{#if description}
		<p class="page-subtitle" style="margin-top: var(--space-sm);">{description}</p>
	{/if}
	<div style="margin-top: var(--space-md);">
		<MetaBlock
			{published}
			{updated}
			{status}
			{tags}
			{wordCount}
			{readingTime}
		/>
	</div>
</header>
