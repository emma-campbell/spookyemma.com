<script lang="ts">
	import { format } from 'date-fns';
	import TagList from './TagList.svelte';
	import EpistemicStatus from './EpistemicStatus.svelte';

	interface Props {
		published?: string;
		updated?: Date | string;
		status?: 'certain' | 'likely' | 'speculative' | 'uncertain';
		tags?: string[];
		wordCount?: number;
		readingTime?: string;
	}

	let { published, updated, status, tags, wordCount, readingTime }: Props = $props();

	const formatDate = (date: Date | string) => {
		return format(new Date(date), 'yyyy-MM-dd');
	};
</script>

<dl class="meta-block">
	{#if published}
		<dt>created</dt>
		<dd>{formatDate(published)}</dd>
	{/if}

	{#if updated}
		<dt>modified</dt>
		<dd>{formatDate(updated)}</dd>
	{/if}

	{#if status}
		<dt>certainty</dt>
		<dd><EpistemicStatus level={status} /></dd>
	{/if}

	{#if wordCount && readingTime}
		<dt>words</dt>
		<dd>~{wordCount.toLocaleString()}</dd>
		<dt>reading</dt>
		<dd>{readingTime}</dd>
	{/if}

	{#if tags && tags.length > 0}
		<dt>tags</dt>
		<dd><TagList {tags} /></dd>
	{/if}
</dl>
