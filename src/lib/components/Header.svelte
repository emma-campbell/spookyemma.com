<script lang="ts">
  import Logo from "./Logo.svelte";

  interface Link {
    href: string;
    label?: string;
  }

  const links: Link[] = [
    { href: "/about" },
    { href: "/now" },
    { label: "/blog", href: "/notebook" },
  ];
</script>

<nav class="flex max-w-4xl mx-auto w-full justify-between">
  <Logo />
  <div class="border border-dashed space-x-2 justify-center">
    {#each links as link}
      <a href={link.href}>
        {link.label ?? link.href}
      </a>
    {/each}
  </div>
</nav>
