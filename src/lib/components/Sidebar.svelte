<script lang="ts">
  import { page } from "$app/state";
  import Logo from "./Logo.svelte";
  import { theme } from "$lib/theme.svelte";

  type NavItem = { href: string; label: string };

  const navItems: NavItem[] = [
    { href: "/notebook", label: "Notebook" },
    { href: "/about", label: "About" },
    { href: "/now", label: "Now" },
    { href: "/uses", label: "Uses" },
    { href: "/changelog", label: "Changelog" },
  ];

  function isActive(href: string): boolean {
    const path = page.url.pathname;
    if (href === "/") return path === "/";
    return path === href || path.startsWith(href + "/");
  }
</script>

<aside class="sidebar">
  <div class="logo-block">
    <Logo class="h-12" />
  </div>

  <hr class="nav-separator" />

  <nav class="nav">
    {#each navItems as item}
      <a href={item.href} class:active={isActive(item.href)}>{item.label}</a>
    {/each}
  </nav>

  <hr class="nav-separator" />

  <div class="nav external">
    <a
      href="https://github.com/emma-campbell"
      target="_blank"
      rel="noopener noreferrer">GitHub</a
    >
    <a href="/rss.xml">RSS</a>
  </div>

  <hr class="nav-separator" />

  <button class="theme-toggle" onclick={() => theme.toggle()}>
    {theme.current === "dark" ? "Light" : "Dark"}
  </button>
</aside>

<style>
  .sidebar {
    position: sticky;
    top: 2rem;
    align-self: start;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .logo-block {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .site-title {
    font-family: "Geist Mono Variable", ui-monospace, monospace;
    font-size: 0.75rem;
    color: var(--muted-ink);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .nav-separator {
    border: none;
    border-top: 1px solid var(--border-subtle);
    margin: 0;
  }

  .nav {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .nav a {
    font-family: "Geist Mono Variable", ui-monospace, monospace;
    font-size: 0.75rem;
    color: var(--muted-ink);
    text-decoration: none;
    padding: 0.25rem 0;
    transition: color 120ms ease;
    letter-spacing: 0.02em;
  }

  .nav a:hover {
    color: var(--text);
  }

  .nav a.active {
    color: var(--text);
  }

  .theme-toggle {
    font-family: "Geist Mono Variable", ui-monospace, monospace;
    font-size: 0.7rem;
    color: var(--muted-ink);
    background: none;
    border: 1px solid var(--border);
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    transition: all 120ms ease;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    align-self: flex-start;
  }

  .theme-toggle:hover {
    color: var(--text);
    border-color: var(--muted-ink);
  }

  @media (max-width: 768px) {
    .sidebar {
      position: static;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }

    .site-title {
      display: none;
    }

    .nav-separator {
      display: none;
    }

    .nav {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.25rem 1rem;
    }
  }
</style>
