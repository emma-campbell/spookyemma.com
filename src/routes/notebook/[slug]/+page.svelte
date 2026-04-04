<script lang="ts">
	import { BgCanvas } from '$lib/components';
	import type { PageData } from './$types';
	import type { PostEntry } from '$lib/content';

	let { data }: { data: PageData } = $props();

	const entryConfig: Record<PostEntry, { label: string; icon: string; color: string }> = {
		essay:      { label: 'blog',       icon: '✦', color: 'var(--amber)' },
		experiment: { label: 'experiment', icon: '⚗', color: 'var(--coral)' },
		note:       { label: 'note',       icon: '◈', color: 'var(--sage)' },
		'how-to':   { label: 'guide',      icon: '⌘', color: 'var(--lavender)' },
		micro:      { label: 'micro',      icon: '○', color: 'var(--muted)' }
	};

	const config = $derived(entryConfig[data.post.entry]);
</script>

<svelte:head>
	<title>{data.post.title} · Emma Campbell</title>
	<meta name="description" content={data.post.description || data.post.title} />
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

	<div class="article-row">
		<!-- Sticky label column -->
		<div class="label-col">
			<div class="label-section">
				<span class="label-tag">created</span>
				<span class="label-val">{data.post.published}</span>
			</div>
			<div class="label-divider"></div>
			<div class="label-section">
				<span class="label-tag">words</span>
				<span class="label-val">~{data.wordCount.toLocaleString()}</span>
			</div>
			<div class="label-section">
				<span class="label-tag">reading</span>
				<span class="label-val">{data.readingTime}</span>
			</div>
			<span class="label-type" style:color={config.color}>{config.icon} {config.label}</span>
		</div>

		<!-- Article -->
		<div class="content-col">
			<div class="breadcrumb">
				<a href="/">index</a><span>/</span>
				<a href="/notebook">notebook</a><span>/</span>
				{data.post.title.toLowerCase().slice(0, 30)}{data.post.title.length > 30 ? '...' : ''}
			</div>

			<h1 class="post-title">{data.post.title}</h1>

			<div class="meta-strip">
				<div class="meta-item">
					<span class="meta-label">category</span>
					<span class="meta-value" style:color={config.color}>{config.icon} {config.label}</span>
				</div>
				{#if data.post.tags.length > 0}
					<div class="meta-item">
						<span class="meta-label">tags</span>
						<span class="meta-value" style="color:var(--parchment);font-size:0.72rem;">{data.post.tags.join(' · ')}</span>
					</div>
				{/if}
			</div>

			<div class="prose">
				{@html data.post.contentHtml}
			</div>

			{#if data.references.length > 0}
				<div class="references">
					<div class="references-title">references</div>
					<ol>
						{#each data.references as ref}
							<li><a href={ref.url}>{ref.title || ref.url}</a></li>
						{/each}
					</ol>
				</div>
			{/if}

			{#if data.prevPost || data.nextPost}
				<nav class="post-nav-inline">
					{#if data.prevPost}
						<a class="post-nav-link prev" href="/notebook/{data.prevPost.slug}">
							<span class="post-nav-dir">← previous</span>
							<span class="post-nav-title">{data.prevPost.title}</span>
						</a>
					{:else}
						<span></span>
					{/if}
					{#if data.nextPost}
						<a class="post-nav-link next" href="/notebook/{data.nextPost.slug}">
							<span class="post-nav-dir">next →</span>
							<span class="post-nav-title">{data.nextPost.title}</span>
						</a>
					{/if}
				</nav>
			{/if}
		</div>
	</div>
</div>

<style>
	.page { position: relative; z-index: 2; }
</style>
