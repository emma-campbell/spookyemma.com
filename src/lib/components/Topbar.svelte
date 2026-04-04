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

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="topbar">
	<a class="site-title" href="/">Emma Campbell</a>
	<nav class="topbar-nav-desktop">
		{#each links as link}
			<a href={link.href} class:active={pathname.startsWith(link.href)}>{link.label}</a>
		{/each}
	</nav>
	<button class="hamburger" onclick={toggleMenu} aria-label="Toggle menu">
		{#if menuOpen}✕{:else}☰{/if}
	</button>
</header>

{#if menuOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="mobile-overlay" onclick={closeMenu} onkeydown={(e) => e.key === 'Escape' && closeMenu()}>
		<nav class="mobile-nav" onclick={(e) => e.stopPropagation()}>
			{#each links as link}
				<a href={link.href} class:active={pathname.startsWith(link.href)} onclick={closeMenu}>{link.label}</a>
			{/each}
		</nav>
	</div>
{/if}

<style>
	.hamburger {
		display: none;
		background: none;
		border: none;
		color: var(--muted);
		font-size: 1.2rem;
		cursor: pointer;
		padding: 0.25rem;
		transition: color 0.2s;
	}
	.hamburger:hover { color: var(--amber); }

	.mobile-overlay {
		display: none;
		position: fixed;
		inset: 0;
		background: rgba(24, 20, 16, 0.95);
		z-index: 100;
		justify-content: center;
		align-items: center;
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
	.mobile-nav a {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.5rem;
		color: var(--muted);
		text-decoration: none;
		transition: color 0.2s;
	}
	.mobile-nav a:hover, .mobile-nav a.active { color: var(--amber); }

	@media (max-width: 599px) {
		.topbar-nav-desktop { display: none; }
		.hamburger { display: block; }
		.mobile-overlay { display: flex; }
	}

	@media (min-width: 600px) {
		.mobile-overlay { display: none !important; }
	}
</style>
