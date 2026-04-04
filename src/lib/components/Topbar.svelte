<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/notebook', label: 'notebook' },
		{ href: '/about', label: 'about' },
		{ href: '/now', label: 'now' },
		{ href: '/uses', label: 'uses' },
		{ href: '/changelog', label: 'changelog' }
	];

	const pathname = $derived(page?.url?.pathname ?? '/');
</script>

<header class="topbar">
	<a class="site-title" href="/">Emma Campbell</a>
	<nav>
		{#each links as link}
			<a href={link.href} class:active={pathname.startsWith(link.href)}>{link.label}</a>
		{/each}
	</nav>
</header>
