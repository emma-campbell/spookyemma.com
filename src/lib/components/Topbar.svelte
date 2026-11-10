<script lang="ts">
	import { page } from '$app/state';
	import LightSwitch from './LightSwitch.svelte';

	const links = [
		{ href: '/notebook', label: 'notebook' },
		{ href: '/photos', label: 'photos' },
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
	<a class="site-title" href="/">
		<svg class="site-moon" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
			<path class="sticker" d="M58,4 A56,56 0 1,0 108,86 A44,44 0 1,1 58,4 Z" />
		</svg>SpookyEmma</a
	>
	<div class="topbar-end">
		<nav class="topbar-nav-desktop" aria-label="Site">
			{#each links as link}
				<a href={link.href} class:active={pathname.startsWith(link.href)}>{link.label}</a>
			{/each}
		</nav>
		<LightSwitch />
		<button
			class="hamburger"
			onclick={toggleMenu}
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
		>
			<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
				{#if menuOpen}
					<path d="M6 6l12 12M18 6L6 18" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
		</button>
	</div>
</header>

{#if menuOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="mobile-overlay"
		onclick={(e) => {
			if (e.target === e.currentTarget) closeMenu();
		}}
		onkeydown={(e) => e.key === 'Escape' && closeMenu()}
	>
		<nav class="mobile-nav" aria-label="Site navigation">
			{#each links as link}
				<a href={link.href} class:active={pathname.startsWith(link.href)} onclick={closeMenu}
					>{link.label}</a
				>
			{/each}
		</nav>
	</div>
{/if}

<style>
	.site-title {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}
	.site-moon {
		width: 1.6rem;
		height: 1.6rem;
		overflow: visible;
		transform: rotate(-8deg);
	}
	/* At this size the sticker needs a firmer edge to hold against the wall */
	.site-moon :global(.sticker) {
		stroke: #a9b78f;
		stroke-width: 5;
	}
	:global(:root[data-theme='dark']) .site-moon :global(.sticker) {
		stroke: var(--sticker-edge);
	}

	.hamburger {
		display: none;
		background: none;
		border: none;
		color: var(--fg);
		cursor: pointer;
		padding: 0.35rem;
		margin-right: -0.35rem;
	}
	.hamburger svg {
		display: block;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}

	.mobile-overlay {
		display: none;
		position: fixed;
		inset: 0;
		background: var(--bg);
		z-index: 100;
		justify-content: center;
		align-items: center;
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}
	.mobile-nav a {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 2rem;
		letter-spacing: -0.02em;
		color: var(--fg-muted);
		text-decoration: none;
		transition: color var(--transition);
	}
	.mobile-nav a:hover,
	.mobile-nav a.active {
		color: var(--fg);
	}

	@media (max-width: 767px) {
		.topbar-nav-desktop {
			display: none !important;
		}
		.hamburger {
			display: block;
			position: relative;
			z-index: 101;
		}
		.mobile-overlay {
			display: flex;
		}
		.topbar-end {
			gap: 1rem;
		}
	}

	@media (min-width: 768px) {
		.mobile-overlay {
			display: none !important;
		}
	}
</style>
