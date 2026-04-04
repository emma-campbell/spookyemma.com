<script lang="ts">
	import { format } from 'date-fns';
	import { BgCanvas } from '$lib/components';

	let { data } = $props();
</script>

<svelte:head>
	<title>Emma Campbell</title>
	<meta name="description" content="Personal website of Emma Campbell. Software, experiments, notes, and the occult mundane." />
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
			<a href="/uses">uses</a>
			<a href="/changelog">changelog</a>
		</nav>
	</div>

	<!-- Hero -->
	<div class="section-row hero-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--muted)">∴ index ∴</span>
		</div>
		<div class="row-content" style="padding-top:3.5rem;padding-bottom:3rem;">
			<p class="hero-eyebrow">personal index · est. 2022</p>
			<h1 class="hero-title">the<em>occult<br>mundane</em></h1>
			<p class="hero-desc">
				This is the personal website of <a href="/about">Emma</a>.
				I write about software, self-experiments, and things that haunt me.
			</p>
			<div class="tag-row">
				<span class="tag tag-amber">✦ software</span>
				<span class="tag tag-coral">⚗ experiments</span>
				<span class="tag tag-sage">◈ notes</span>
				<span class="tag tag-lavender">⌘ guides</span>
			</div>
		</div>
	</div>

	<!-- Sections -->
	{#each data.sections as section}
		<div class="section-row">
			<div class="row-label">
				<span class="row-label-text" style:color={section.color}>
					{section.label.toLowerCase()}<span class="row-label-num">{section.sectionNum}</span>
				</span>
			</div>
			<div class="row-content">
				<div class="content-header">
					<span class="ch-glyph" style:color={section.color}>{section.icon}</span>
					<span class="ch-title">{section.label}</span>
					<span class="ch-count">{section.posts.length} {section.posts.length === 1 ? 'entry' : 'entries'}</span>
				</div>
				<ul class="post-list">
					{#each section.posts as post}
						<li class="post-item">
							<span class="post-icon" style:color={section.color}>{section.icon}</span>
							<a class="post-link" href="/notebook/{post.slug}">{post.title}</a>
							{#each post.tags as tag}
								<span class="post-badge badge-{section.id === 'blog' ? 'amber' : section.id === 'experiments' ? 'coral' : section.id === 'notes' ? 'sage' : section.id === 'guides' ? 'lavender' : 'amber'}">{tag}</span>
							{/each}
							<span class="post-meta">{format(new Date(post.published), 'yyyy-MM-dd')}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}

	<!-- Footer -->
	<div class="footer-row">
		<div class="row-label"></div>
		<footer>
			<span>&copy; 2022&ndash;2026 Emma &middot; CC-BY-SA 4.0</span>
			<div class="footer-links">
				<a href="/rss.xml">rss</a>
				<a href="/changelog">changelog</a>
				<a href="https://github.com/emma-campbell" target="_blank" rel="noopener noreferrer">github</a>
			</div>
		</footer>
	</div>
</div>

<style>
	.page {
		position: relative;
		z-index: 2;
	}

	.hero-row .row-label {
		align-items: flex-end;
		padding-bottom: 3rem;
	}

	.footer-row {
		display: flex;
		border-bottom: 1px solid var(--border);
	}
	.footer-row .row-label {
		border-right: 1px solid var(--border);
	}
	.footer-row footer {
		flex: 1;
		padding: 1.5rem 2.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.68rem;
		color: var(--muted);
	}
	.footer-row footer a {
		color: var(--muted);
		text-decoration: none;
		transition: color 0.2s;
	}
	.footer-row footer a:hover {
		color: var(--amber);
	}
</style>
