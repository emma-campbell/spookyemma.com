<script lang="ts">
  import { format } from "date-fns";
  import { PostType, MdxContent } from "$lib/components";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const formatDate = (date: Date | string) => {
    return format(new Date(date), "yyyy.MMM.dd");
  };
</script>

<svelte:head>
  <title>{data.post.title} | Emma Campbell</title>
  <meta name="description" content={data.post.description || data.post.title} />
</svelte:head>

<section class="pb-8">
  <div class="flex space-x-2 text-muted-ink font-mono items-center">
    <p class="uppercase">{formatDate(data.post.published)}</p>
    <p>•</p>
    <PostType type={data.post.entry} />
  </div>
  <h1 class="font-sans text-3xl">
    {data.post.title}
  </h1>
</section>

<section class="flex flex-col space-y-4 text-text/80 pb-16">
  <MdxContent html={data.post.contentHtml} />
</section>

<section class="text-muted-ink font-mono">
  <h4 class="font-mono uppercase text-md text-muted-ink pb-2">Metadata</h4>
  <div class="flex flex-col text-sm">
    <div class="flex justify-between">
      <p>Published</p>
      <p class="uppercase">{formatDate(data.post.published)}</p>
    </div>
    {#if data.post.updated}
      <div class="flex justify-between">
        <p>Updated</p>
        <p class="uppercase">{formatDate(data.post.updated)}</p>
      </div>
    {/if}
    {#if data.post.tags && data.post.tags.length > 0}
      <div class="flex justify-between">
        <p>Tags</p>
        <p>{data.post.tags.map((t) => t.toLowerCase()).join(", ")}</p>
      </div>
    {/if}
  </div>
</section>
