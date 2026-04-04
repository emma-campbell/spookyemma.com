<script lang="ts">
	import { BgCanvas, GearList, ContentHeader, QuickFacts } from '$lib/components';
</script>

<svelte:head>
	<title>Uses · Emma Campbell</title>
	<meta name="description" content="The hardware and software I use daily." />
</svelte:head>

<BgCanvas />

<div class="page">
	<!-- Topbar -->
	<div class="topbar">
		<a class="site-title" href="/">Emma Campbell</a>
		<nav>
			<a href="/notebook">notebook</a>
			<a href="/about">about</a>
			<a href="/now">now</a>
			<a href="/uses" class="active">uses</a>
			<a href="/changelog">changelog</a>
		</nav>
	</div>

	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">2026-04-03</span>
		</div>
		<div class="page-header-content">
			<p class="hero-eyebrow">∴ gear + software inventory ∴</p>
			<h1 class="page-title">what I <em>use</em></h1>
			<p class="page-lede">The hardware and software I use daily. Inspired by <a href="https://uses.tech" class="lede-link">uses.tech</a>. Kept updated whenever something changes.</p>
		</div>
		<div class="page-header-aside">
			<QuickFacts facts={[
				{ label: 'primary machine', value: 'M4 MacBook Pro 64GB' },
				{ label: 'also runs', value: 'Custom PC (Omarchy)' },
				{ label: 'editor', value: 'Cursor' },
				{ label: 'notes', value: 'Obsidian' }
			]} />
		</div>
	</div>

	<!-- Workstation -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--amber)">workstation<span class="row-label-num">§ 01</span></span>
		</div>
		<div class="row-content">
			<ContentHeader glyph="⌥" glyphColor="var(--amber)" title="Workstation" count="3 items" />
			<GearList items={[
				{ name: 'M4 MacBook Pro (64 GB)', note: 'The only machine that matters for work. 64GB handles everything without complaint.', category: 'laptop', tag: { label: '✦ daily driver', type: 'fav' } },
				{ name: 'Apple Magic Trackpad', note: "Gestures are non-negotiable. Can't go back to a mouse for Mac work.", category: 'input' },
				{ name: 'CalDigit TS3', note: 'Thunderbolt dock. One cable to rule them all.', category: 'dock' }
			]} />
		</div>
		<div class="row-aside">
			<div class="annotation">
				<strong>on the M4</strong>
				64GB RAM is the sweet spot — enough to run a full dev environment, Docker, and a dozen browser tabs without sweating.
			</div>
		</div>
	</div>

	<!-- Playstation -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--lavender)">playstation<span class="row-label-num">§ 02</span></span>
		</div>
		<div class="row-content">
			<ContentHeader glyph="⎈" glyphColor="var(--lavender)" title="Playstation" count="3 items" />
			<GearList items={[
				{ name: 'Custom Built PC', note: 'Built February 2026 — a milestone. Gaming and anything that benefits from a big screen.', category: 'desktop', tag: { label: '✦ first build', type: 'built' } },
				{ name: 'Omarchy', href: 'https://omarchy.com', note: 'Linux configuration for the custom PC. Makes the whole thing feel intentional.', category: 'os / config' },
				{ name: 'Logitech Superlight Pro', note: 'Extremely light. Good for gaming, also used on the Mac side when I need precision.', category: 'mouse' }
			]} />
		</div>
		<div class="row-aside">
			<div class="annotation">
				<strong>the build</strong>
				First PC build after years of Mac-only. A whole different kind of project — half engineering, half ritual.
			</div>
		</div>
	</div>

	<!-- Shared -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--coral)">shared<span class="row-label-num">§ 03</span></span>
		</div>
		<div class="row-content">
			<ContentHeader glyph="⇄" glyphColor="var(--coral)" title="Shared" count="2 items" />
			<GearList items={[
				{ name: 'Zoom 75', href: 'https://www.zsa.io/zoom75', note: 'With Zooted keycaps. Sits between both machines via the CalDigit. The keyboard that ended the keyboard search.', category: 'keyboard', tag: { label: 'shared', type: 'shared' } },
				{ name: 'Ryugashima Island Mousepad', note: 'By the Mousepad Company. Large enough for both the Magic Trackpad and Superlight to coexist.', category: 'mousepad', tag: { label: 'shared', type: 'shared' } }
			]} />
		</div>
		<div class="row-aside">
			<div class="annotation">
				<strong>shared peripherals</strong>
				Keyboard and mousepad live between both machines — plug into whichever setup you're at.
			</div>
		</div>
	</div>

	<!-- Software -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--sage)">software<span class="row-label-num">§ 04</span></span>
		</div>
		<div class="row-content">
			<ContentHeader glyph="◈" glyphColor="var(--sage)" title="Software" count="4 items" />
			<GearList items={[
				{ name: 'Obsidian', href: 'https://obsidian.md', note: 'Notes, writing, thinking out loud. Local-first. The connective tissue of everything else.', category: 'notes / PKM', tag: { label: '✦ daily', type: 'fav' } },
				{ name: 'Todoist', href: 'https://todoist.com', note: "Task management. Simple enough to actually use, powerful enough when you need it.", category: 'tasks', tag: { label: '✦ daily', type: 'fav' } },
				{ name: 'Fantastical', href: 'https://fantastical.app', note: "Calendar. Natural language input is the reason I haven't left.", category: 'calendar' },
				{ name: 'Granola', href: 'https://granola.so', note: 'AI meeting notes. Quietly takes notes during calls without being weird about it.', category: 'meetings', tag: { label: 'new', type: 'new' } }
			]} />
		</div>
		<div class="row-aside">
			<div class="annotation">
				<strong>the PKM stack</strong>
				Obsidian + Todoist + Fantastical have been stable for 2+ years. That's a long time in productivity app years.
			</div>
			<div class="annotation">
				<strong>on granola</strong>
				Recent addition. Still deciding if it earns a permanent spot.
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="uses-footer">
		<span>&copy; 2022&ndash;2026 Emma &middot; CC-BY-SA 4.0</span>
		<div class="footer-links">
			<a href="/rss.xml">rss</a>
			<a href="/changelog">changelog</a>
			<a href="https://github.com/emma-campbell" target="_blank" rel="noopener noreferrer">github</a>
		</div>
	</footer>
</div>

<style>
	.page { position: relative; z-index: 1; }
	.topbar nav a.active { color: var(--amber); }

	.lede-link {
		color: var(--amber);
		text-decoration: none;
		border-bottom: 1px solid rgba(232,168,48,0.4);
	}
	.lede-link:hover { border-bottom-color: var(--amber); }

	.uses-footer {
		margin-left: calc(var(--col-label) - 2px);
		border-left: 2px solid var(--red-line);
		border-top: 1px solid var(--border);
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.68rem;
		color: var(--muted);
	}
	.uses-footer a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
	.uses-footer a:hover { color: var(--amber); }
</style>
