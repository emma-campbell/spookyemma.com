<script lang="ts">
  import "@fontsource-variable/geist";
  import "@fontsource-variable/geist-mono";
  import "../app.css";
  import posthog from "posthog-js";
  import { browser } from "$app/environment";
  import { env } from "$env/dynamic/public";
  import { Sidebar } from "$lib/components";
  import { DateTime } from "luxon";
  import { format } from "date-fns";

  interface Props {
    children: import("svelte").Snippet;
  }

  const year = format(DateTime.now(), "y");

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

<div class="page">
  <Sidebar />
  <main>
    {@render children()}
  </main>
  <footer class="footer">
    <span>&copy; 2022&ndash;{year} Emma &middot; CC-BY-SA 4.0</span>
    <a href="/rss.xml">RSS</a>
    <a href="/changelog">Changelog</a>
    <a
      href="https://github.com/emma-campbell"
      target="_blank"
      rel="noopener noreferrer">GitHub</a
    >
  </footer>
</div>

<style>
  .page {
    max-width: 72rem;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 3rem;
    min-height: 100vh;
  }

  main {
    min-width: 0;
  }

  .footer {
    grid-column: 1 / -1;
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    font-size: 0.7rem;
    color: var(--muted-ink);
  }

  .footer a {
    color: var(--muted-ink);
    text-decoration: none;
    transition: color 120ms ease;
  }

  .footer a:hover {
    color: var(--text);
  }

  @media (max-width: 768px) {
    .page {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1rem;
    }
  }
</style>
