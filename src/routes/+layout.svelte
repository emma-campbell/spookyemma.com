<script lang="ts">
  import "@fontsource-variable/geist";
  import "@fontsource-variable/geist-mono";
  import "../app.css";
  import posthog from 'posthog-js';
  import { browser } from '$app/environment';
  import { PUBLIC_POSTHOG_KEY } from '$env/static/public';
  import { Header } from "$lib/components";

  interface Props {
    children: import("svelte").Snippet;
  }

  export const load = async () => {
    if (browser && PUBLIC_POSTHOG_KEY) {
      posthog.init(PUBLIC_POSTHOG_KEY, {
        api_host: 'https://us.i.posthog.com'
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

<div class="root bg-background leading-relaxed text-text min-h-screen">
  <div class="min-h-screen flex flex-col">
    <Header />
    <main
      class="flex-grow mx-auto w-full max-w-4xl px-4 sm:px-8 py-12 pt-20 lg:pt-12 text-md font-sans"
    >
      {@render children()}
    </main>
  </div>
</div>
