<script lang="ts">
	import { page } from '$app/stores';
	import UnderlineToBackground from './UnderlineToBackground.svelte';
	import { DateTime } from 'luxon';

	declare const __APP_VERSION__: string;
	const version = __APP_VERSION__;

	type NavItem = {
		href: string;
		text: string;
	};

	const navItems: NavItem[] = [
		{ href: '/', text: 'Notebook' },
		{ href: '/bio', text: 'About' },
		{ href: '/now', text: 'Now' }
	];

	let isMobileMenuOpen = $state(false);

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') {
			return pathname === '/' || pathname.startsWith('/notebook');
		}
		return pathname === href || pathname.startsWith(href);
	}
</script>

<!-- Mobile Menu Button -->
<button
	onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
	class="fixed top-4 left-4 z-50 p-2 lg:hidden"
	aria-label="Toggle menu"
>
	<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		{#if isMobileMenuOpen}
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		{:else}
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		{/if}
	</svg>
</button>

<!-- Overlay for mobile -->
{#if isMobileMenuOpen}
	<button
		class="fixed inset-0 bg-black/50 z-40 lg:hidden"
		onclick={() => (isMobileMenuOpen = false)}
		aria-label="Close menu"
	></button>
{/if}

<!-- Sidebar -->
<aside
	class="
		fixed inset-y-0 left-0 w-48 bg-background px-6 py-12 overflow-y-auto z-40
		transform transition-transform duration-300 ease-in-out
		{isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
		lg:translate-x-0
	"
>
	<div class="flex flex-col h-full">
		<!-- Name -->
		<div class="mb-12">
			<h1 class="text-lg font-bold">Emma Campbell</h1>
			<p class="text-sm text-muted-ink italic">A collection of notes and thoughts</p>
		</div>

		<!-- Navigation -->
		<nav class="flex-grow">
			<ul class="space-y-1">
				{#each navItems as item}
					{@const active = isActive(item.href, $page.url.pathname)}
					<li>
						<a
							href={item.href}
							onclick={() => (isMobileMenuOpen = false)}
							class="block py-1 text-sm"
						>
							<UnderlineToBackground isActive={active}>
								{item.text}
							</UnderlineToBackground>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- Footer Links -->
		<div class="space-y-1 text-sm">
			<a
				href="https://github.com/emma-campbell"
				target="_blank"
				rel="noopener noreferrer"
				class="block py-1"
			>
				<UnderlineToBackground isExternal>GitHub</UnderlineToBackground>
			</a>
			<a href="/rss.xml" class="block py-1"> RSS </a>
		</div>

		<!-- Copyright -->
		<div class="mt-8 pt-4 border-t border-muted-ink/20">
			<p class="text-xs text-muted-ink">© 2022–{DateTime.now().year} Emma Campbell</p>
			<a href="/changelog" class="text-xs text-muted-ink hover:text-accent transition-colors">
				v{version}
			</a>
		</div>
	</div>
</aside>
