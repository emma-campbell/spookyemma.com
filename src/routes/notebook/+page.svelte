<script lang="ts">
  import { PostList } from "$lib/components";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<section class="max-w-[60ch]"></section>
<div class="max-w-[60ch]">
  <PostList posts={data.posts} />
</div>
