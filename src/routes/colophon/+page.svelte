<script lang="ts">
	import { UnderlineToBackground } from '$lib/components';
	import { DateTime } from 'luxon';

	const updated = DateTime.fromObject({ year: 2025, month: 7, day: 4 });
</script>

<svelte:head>
	<title>Colophon | Emma Campbell</title>
</svelte:head>

<h1 class="font-sans uppercase text-body text-4xl pb-2">Colophon</h1>

<section class="flex flex-col space-y-4 [&_a]:underline text-body">
	<p>
		This website was originally published January 14th, 2024 near Washington, D.C. It's developed
		on a 2021 M1 Macbook Pro and hosted on
		<a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">
			<UnderlineToBackground isExternal>Digital Ocean</UnderlineToBackground>
		</a>. All content was migrated from my previous domain emmacampbell.dev. The code is open source
		on
		<a href="https://github.com/emma-campbell/spookyemma.com" target="_blank" rel="noopener noreferrer">
			<UnderlineToBackground isExternal>Github</UnderlineToBackground>
		</a>.
	</p>
	<p>
		The sans serif font for this site is
		<a href="https://www.fontspring.com/fonts/type-forward/garet" target="_blank" rel="noopener noreferrer">
			<UnderlineToBackground isExternal>Garet</UnderlineToBackground>
		</a>.
	</p>
	<p>
		This site was built using
		<a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">
			<UnderlineToBackground isExternal>SvelteKit</UnderlineToBackground>
		</a>.
	</p>
	<p>
		All content is hosted in Github as Markdown files with frontmatter, parsed using gray-matter
		and rendered with MDsveX.
	</p>
	<p class="text-sm text-muted-ink italic">
		Last updated: {updated.toLocaleString(DateTime.DATE_FULL)}
	</p>
</section>
