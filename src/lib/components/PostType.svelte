<script lang="ts">
  import type { PostEntry } from "$lib/content/types";

  interface Props {
    type: PostEntry;
  }

  let { type }: Props = $props();

  const colorClass = $derived(() => {
    switch (type) {
      case "note":
        return "bg-accent text-background";
      case "essay":
        return "bg-highlight text-background";
      case "how-to":
        return "bg-destructive text-background";
      case "micro":
        return "bg-info text-background";
      case "experiment":
        return "bg-warning text-background";
      default:
        return "bg-accent text-background";
    }
  });
</script>

<span class="font-semibold rounded-sm px-1 text-md {colorClass()}">{type}</span>
