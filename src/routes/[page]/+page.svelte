<script lang="ts">
  import { format } from "date-fns";
  import type { PageData } from "./$types";

  export let data: PageData;

  const formatDate = (date: Date | string) => {
    return format(new Date(date), "yyyy.MMM.dd");
  };
</script>

<article class="space-y-2">
  <div>
    <h1 class="text-3xl font-extrabold">{data.page.title}</h1>
    <p class="text-sm font-mono text-muted-ink">
      Updated <span class="uppercase"
        >{formatDate(data.page.lastUpdatedAt)}</span
      >
    </p>
  </div>

  {@html data.page.contentHtml}
</article>
