<script lang="ts">
	import { PostList } from '$lib/components';
  import { Hero } from "$lib/components";
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>


<PostList posts={data.posts} />
