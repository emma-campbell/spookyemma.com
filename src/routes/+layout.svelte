<script lang="ts">
  import "../app.css";
  import posthog from "posthog-js";
  import { browser } from "$app/environment";
  import { env } from "$env/dynamic/public";

  interface Props {
    children: import("svelte").Snippet;
  }

  export const load = async () => {
    if (browser && env.PUBLIC_POSTHOG_KEY) {
      posthog.init(env.PUBLIC_POSTHOG_KEY, {
        api_host: "https://us.i.posthog.com",
      });
    }

    return;
  };

  let { children }: Props = $props();
  load();
</script>

<svelte:head>
  <title>Emma Campbell</title>
  <meta name="description" content="Emma's Digital Presence" />
</svelte:head>

{@render children()}
