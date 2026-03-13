<script lang="ts">
  import { page } from "$app/state";
  import Logo from "./Logo.svelte";
  import { theme } from "$lib/theme.svelte";

  type NavItem = { href: string; label: string };

  let menuOpen = $state(false);
  let logoOpacity = $state(1);

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

  $effect(() => {
    page.url.pathname;
    menuOpen = false;
  });

  $effect(() => {
    function onScroll() {
      if (window.innerWidth <= 768) {
        logoOpacity = Math.max(0, 1 - window.scrollY / 80);
      } else {
        logoOpacity = 1;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
</script>

<aside class="sidebar">
  <div class="logo-row">
    <div class="logo-block" style="opacity: {logoOpacity}">
      <Logo class="h-12" />
    </div>
    <button
      class="hamburger"
      class:open={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
  </div>

  <div class="nav-collapse" class:open={menuOpen}>
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
  </div>
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

  .logo-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-block {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: opacity 100ms ease;
  }

  .hamburger {
    display: none;
  }

  .nav-collapse {
    display: contents;
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
      position: sticky;
      top: 0;
      gap: 0;
      background: var(--bg);
      z-index: 100;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border-subtle);
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      z-index: 10;
    }

    .hamburger .bar {
      display: block;
      width: 18px;
      height: 2px;
      background: var(--text);
      transition: transform 200ms ease, opacity 200ms ease;
    }

    .hamburger.open .bar:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }

    .hamburger.open .bar:nth-child(2) {
      opacity: 0;
    }

    .hamburger.open .bar:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }

    .nav-collapse {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height 250ms ease, opacity 200ms ease;
      padding: 0;
    }

    .nav-collapse.open {
      max-height: 500px;
      opacity: 1;
      padding-top: 1rem;
    }

    .logo-block :global(a) {
      height: 2rem;
    }

    .logo-block :global(svg) {
      height: 2rem;
    }

    .nav-separator {
      display: none;
    }
  }
</style>
