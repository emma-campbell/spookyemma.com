<script lang="ts">
  import Logo from "./Logo.svelte";

  interface Link {
    href: string;
    label?: string;
  }

  const links: Link[] = [{ href: "/about" }, { href: "/now" }];
</script>

<nav class="flex mx-12 justify-between">
  <a href="/" class="font-bold flex items-center gap-2">
    <Logo size={24} />
    SpookyEmma
  </a>
  <div class="space-x-2">
    {#each links as link}
      <a href={link.href}>
        {link.label ?? link.href}
      </a>
    {/each}
  </div>
</nav>
