<script lang="ts">
  import { PostList } from "$lib/components";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<section></section>
<PostList posts={data.posts} />
