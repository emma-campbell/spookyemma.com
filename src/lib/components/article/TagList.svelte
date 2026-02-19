<script lang="ts">
	interface Props {
		tags: string[];
	}

	let { tags }: Props = $props();
</script>

{#if tags.length > 0}
	<div class="tag-list">
		{#each tags as tag}
			<span class="tag">{tag.toLowerCase()}</span>
		{/each}
	</div>
{/if}
