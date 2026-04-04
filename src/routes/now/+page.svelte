<script lang="ts">
	import { BgCanvas } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Now · Emma Campbell</title>
	<meta name="description" content="What I'm up to, updated whenever something changes." />
</svelte:head>

<BgCanvas />

<div class="page">
	<!-- Topbar -->
	<div class="topbar">
		<a class="site-title" href="/">Emma Campbell</a>
		<nav>
			<a href="/notebook">notebook</a>
			<a href="/about">about</a>
			<a href="/now" class="active">now</a>
			<a href="/uses">uses</a>
			<a href="/changelog">changelog</a>
		</nav>
	</div>

	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">{data.lastUpdated ?? ''}</span>
		</div>
		<div class="page-header-content">
			<p class="hero-eyebrow">∴ living document ∴</p>
			<h1 class="page-title">what I'm up to <em>now</em></h1>
			<p class="page-lede">A <a href="https://nownownow.com/about" class="lede-link">/now page</a>. Not a blog post, not a status page. Just what I'm up to, updated whenever something changes.</p>
		</div>
		<div class="page-header-aside">
			<div class="quick-facts">
				<div class="qf-item">
					<span class="qf-label">as of</span>
					<span class="qf-value">{data.lastUpdated ?? ''}</span>
				</div>
				<div class="qf-item">
					<span class="qf-label">location</span>
					<span class="qf-value">Bloomington, IN</span>
				</div>
				<div class="qf-item">
					<span class="qf-label">working on</span>
					<span class="qf-value">Arboretum Lifesciences</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Featured: most recent entry -->
	{#if data.featured}
		<div class="section-row">
			<div class="row-label">
				<span class="row-label-text" style="color:var(--amber)">now<span class="row-label-num">most recent</span></span>
			</div>
			<div class="row-content">
				<div class="entry-date-stamp current">{data.featured.label}</div>
				<div class="prose">
					{@html data.featured.contentHtml}
				</div>
			</div>
			<div class="row-aside">
				<div class="annotation">
					<strong>focus</strong>
					The most recent update on what's happening.
				</div>
			</div>
		</div>
	{/if}

	<!-- Archive: older entries as timeline -->
	{#if data.archive.length > 0}
		<div class="section-row">
			<div class="row-label">
				<span class="row-label-text" style="color:var(--muted)">archive<span class="row-label-num">§ prior</span></span>
			</div>
			<div class="row-content">
				<ul class="now-timeline">
					{#each data.archive as entry}
						<li class="now-timeline-item">
							<div class="tl-date">{entry.label}</div>
							<div class="tl-prose">
								{@html entry.contentHtml}
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div class="row-aside">
				<div class="annotation">
					<strong>how this works</strong>
					Newest entry is featured above. Everything else lives here in reverse chronological order.
				</div>
			</div>
		</div>
	{/if}

	<!-- Footer -->
	<footer class="now-footer">
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

	.now-footer {
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
	.now-footer a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
	.now-footer a:hover { color: var(--amber); }
</style>
