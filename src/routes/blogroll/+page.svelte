<script lang="ts">
	import { UnderlineToBackground } from '$lib/components';

	const links = [
		{ text: 'Winnie Lim', href: 'https://winnielim.org' },
		{ text: 'Rachel Smith', href: 'https://rachsmith.com' },
		{ text: 'Manu Moreale', href: 'https://manuelmoreale.com' },
		{ text: 'Steph Ango', href: 'https://stephango.com/' },
		{ text: 'Your Local Epidemiologist', href: 'https://yourlocalepidemiologist.substack.com' },
		{ text: 'Health API Guy', href: 'https://healthapiguy.substack.com' }
	];
</script>

<svelte:head>
	<title>Blogroll | Emma Campbell</title>
</svelte:head>

<h1 class="font-sans uppercase text-body text-4xl pb-2">Blogroll</h1>
<p class="text-body">
	This is a list off the blogs that read frequently or subscribe to in my RSS reader.
</p>

<section id="blogroll" class="space-y-12 pt-8 text-body">
	<ul class="list-disc list-inside [&_a]:underline">
		{#each links as link}
			<li>
				<a href={link.href} target="_blank" rel="noopener noreferrer">
					<UnderlineToBackground isExternal>{link.text}</UnderlineToBackground>
				</a>
			</li>
		{/each}
	</ul>
</section>
