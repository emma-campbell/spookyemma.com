<script lang="ts">
	import PostListItem from './PostListItem.svelte';

	interface PostWithPreview {
		slug: string;
		title: string;
		published: string;
		previewHtml: string;
		hasMore: boolean;
	}

	interface Props {
		posts: PostWithPreview[];
	}

	let { posts }: Props = $props();
</script>

<div class="flex flex-col space-y-4">
	{#each posts as post}
		<PostListItem {post} />
	{/each}
</div>
