<script lang="ts">
	import { PageShell, GearList, QuickFacts } from '#components';
</script>

<svelte:head>
	<title>Uses · Emma Campbell</title>
	<meta name="description" content="The hardware and software I use daily." />
</svelte:head>

<PageShell>
	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">2026-04-03</span>
		</div>
		<div class="page-header-content">
			<h1 class="page-title">What I use</h1>
			<p class="page-lede">
				The hardware and software I use daily. Inspired by <a
					href="https://uses.tech"
					class="accent-link">uses.tech</a
				>. Kept updated whenever something changes.
			</p>
		</div>
		<div class="page-header-aside">
			<QuickFacts
				facts={[
					{ label: 'primary machine', value: 'M4 MacBook Pro 64GB' },
					{ label: 'also runs', value: 'Custom PC (Omarchy)' },
					{ label: 'editor', value: 'Zed' },
					{ label: 'notes', value: 'Obsidian' }
				]}
			/>
		</div>
	</div>

	<!-- Workstation -->
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Workstation</h2>
		</div>
		<div class="row-content">
			<GearList
				items={[
					{
						name: 'M4 MacBook Pro (64 GB)',
						note: '',
						category: 'laptop',
						tag: { label: 'daily driver', type: 'fav' }
					},
					{
						name: 'Apple Magic Trackpad',
						note: "Can't go back to a mouse for Mac work.",
						category: 'peripheral'
					},
					{
						name: 'CalDigit TS3',
						note: 'Thunderbolt dock.',
						category: 'dock'
					}
				]}
			/>
		</div>
	</div>

	<!-- Playstation -->
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Playstation</h2>
		</div>
		<div class="row-content">
			<GearList
				items={[
					{
						name: 'Custom Built PC',
						note: 'Built February 2026. Gaming and anything that benefits from a big screen.',
						category: 'desktop',
						tag: { label: 'first build', type: 'built' }
					},
					{
						name: 'Omarchy',
						href: 'https://omarchy.com',
						note: 'Linux configuration for the custom PC.',
						category: 'os / config'
					},
					{
						name: 'Logitech Superlight Pro',
						note: 'Extremely light. Good for gaming, also used on the Mac side when I need precision.',
						category: 'peripheral'
					}
				]}
			/>
		</div>
	</div>

	<!-- Shared -->
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Shared</h2>
		</div>
		<div class="row-content">
			<GearList
				items={[
					{
						name: 'Zoom 75',
						href: 'https://www.zsa.io/zoom75',
						note: 'With Zooted keycaps. Sits between both machines via the CalDigit.',
						category: 'peripheral',
						tag: { label: 'shared', type: 'shared' }
					},
					{
						name: 'Ryugashima Island Mousepad',
						note: 'By the Mousepad Company. Large enough for both the Magic Trackpad and Superlight to coexist.',
						category: 'peripheral',
						tag: { label: 'shared', type: 'shared' }
					},
					{
						name: 'UGREEN 8K Displayport KVM Switch',
						note: 'Switch between the two workstations with the press of a button. No fiddling about with cables.',
						category: 'peripheral',
						tag: { label: 'shared', type: 'shared' }
					}
				]}
			/>
		</div>
	</div>

	<!-- Software -->
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Software</h2>
		</div>
		<div class="row-content">
			<GearList
				items={[
					{
						name: 'Obsidian',
						href: 'https://obsidian.md',
						note: 'Notes, writing, thinking out loud. Local-first.',
						category: 'notes / PKM'
					},
					{
						name: 'Todoist',
						href: 'https://todoist.com',
						note: 'Task management.',
						category: 'tasks'
					},
					{
						name: 'Fantastical',
						href: 'https://fantastical.app',
						note: "Calendar. Natural language input is the reason I haven't left.",
						category: 'calendar'
					},
					{
						name: 'lazyvim',
						href: 'https://lazyvim.github.io',
						note: 'Neovim plus lazyvim is my go to for quickly looking at files and making changes.',
						category: 'notes / PKM'
					},
					{
						name: 'Granola',
						href: 'https://granola.so',
						note: "AI meeting notes. Quietly takes notes during calls without being weird about it, and let's my ADHD self focus more on the discussion than the notes.",
						category: 'meetings'
					},
					{
						name: 'Superwhisper',
						href: 'https://superwhisper.ai',
						note: 'There is nothing more useful than being able to just spitball your thoughts and watch them transform into text (especially in the age of AI assisted coding).',
						category: 'transcription'
					}
				]}
			/>
		</div>
	</div>
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Homelab</h2>
		</div>
		<div class="row-content">
			<GearList
				items={[
					{
						name: 'Paperless',
						href: 'https://docs.paperless-ngx.com',
						note: 'I would never find anything (ever) without paperless. Highly recommend.',
						category: 'documents'
					},
					{
						name: 'Authentik',
						href: 'https://goauthentik.io/docs',
						note: 'Identity management. Not much to say about it, but I use it and it works.',
						category: 'identity'
					},
					{
						name: 'calibre-web-automated',
						href: 'https://github.com/crocodilestick/Calibre-Web-Automated',
						note: 'In an effort to de-amazon I started buying from other ebook stores and using Calibre to manage my ebook library. This provides a convenient way to access and manage my ebooks, as well as an ODPS server for downloading directly in KOReader.',
						category: 'identity'
					},
					{
						name: 'Tailscale',
						href: 'https://tailscale.com',
						note: 'A VPN/wiremesh that works. I use it for remote access to my home network and for secure access to my services.',
						category: 'vpn'
					}
				]}
			/>
		</div>
	</div>
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Devices</h2>
		</div>
		<div class="row-content">
			<GearList
				items={[
					{
						name: 'Supernote Nomad',
						href: 'https://supernote.com/pages/supernote-nomad',
						note: "I adore this thing. Infinite paper. Barely have to charge. Upcoming plugins system. If you've been considering this, get it.",
						category: 'note-taking'
					},
					{
						name: 'Boox Palma 2',
						href: 'https://boox.me/palma-2',
						note: 'This has been my go-to eReader -- especially with the Wekind case. The size is just perfect.',
						category: 'e-reader'
					}
				]}
			/>
		</div>
	</div>
</PageShell>

<style>
	/* Items without a note don't need an empty second line */
	.row-content :global(.gear-note:empty) {
		display: none;
	}
</style>
