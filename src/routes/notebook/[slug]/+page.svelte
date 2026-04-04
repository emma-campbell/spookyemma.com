<script lang="ts">
	import { PageShell } from '$lib/components';
	import { ENTRY_TYPES } from '$lib/content/entryTypes';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const config = $derived(ENTRY_TYPES[data.post.entry]);
</script>

<svelte:head>
	<title>{data.post.title} · Emma Campbell</title>
	<meta name="description" content={data.post.description || data.post.title} />
</svelte:head>

<PageShell>
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
</PageShell>
