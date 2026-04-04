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
				<div class="citations">
					<p class="citations-title">references</p>
					<ol>
						{#each data.references as ref}
							<li><a href={ref.url}>{ref.title || ref.url}</a></li>
						{/each}
					</ol>
				</div>
			{/if}

			{#if data.prevPost || data.nextPost}
				<nav class="post-nav">
					{#if data.prevPost}
						<a class="post-nav-item prev" href="/notebook/{data.prevPost.slug}">
							<span class="post-nav-dir">← previous</span>
							<span class="post-nav-title">{data.prevPost.title}</span>
						</a>
					{:else}
						<span></span>
					{/if}
					{#if data.nextPost}
						<a class="post-nav-item next" href="/notebook/{data.nextPost.slug}">
							<span class="post-nav-dir">next →</span>
							<span class="post-nav-title">{data.nextPost.title}</span>
						</a>
					{/if}
				</nav>
			{/if}
		</div>
	</div>
</PageShell>

<style>
/* Article layout */
.article-row { display: flex; min-height: calc(100vh - 60px); }

/* Sticky label column */
.label-col {
	width: var(--col-label); flex-shrink: 0;
	border-right: 2px solid var(--red-line);
	position: sticky; top: 0; height: fit-content;
	align-self: flex-start;
	display: flex; flex-direction: column;
	align-items: flex-end;
	padding: 2.5rem 1rem 2rem 0.5rem;
	gap: 2rem;
}
.label-section { display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem; }
.label-tag { font-size: 0.62rem; letter-spacing: 0.1em; text-transform: lowercase; color: var(--muted); text-align: right; }
.label-val { font-size: 0.68rem; color: var(--parchment); text-align: right; line-height: 1.4; }
.label-divider { width: 24px; height: 1px; background: var(--border); align-self: flex-end; }
.label-type {
	font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
	color: var(--amber); text-align: right;
	writing-mode: vertical-rl; transform: rotate(180deg);
	margin-top: auto; padding-bottom: 1rem;
}

/* Article content column */
.content-col {
	flex: 1;
	padding: 3rem 3rem 5rem 2.5rem;
	max-width: calc(620px + 6rem);
}

/* Post title */
.post-title {
	font-family: var(--font-display);
	font-weight: 700;
	font-size: clamp(1.8rem, 3.5vw, 2.8rem);
	line-height: 1.1;
	color: var(--parchment);
	margin-bottom: 2rem;
	max-width: 620px;
}

/* Meta strip */
.meta-strip {
	display: flex; gap: 2rem; flex-wrap: wrap;
	margin-bottom: 3rem; padding-bottom: 1.5rem;
	border-bottom: 1px solid var(--border);
}
.meta-item { display: flex; flex-direction: column; gap: 0.2rem; }
.meta-label { font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.meta-value { font-size: 0.78rem; color: var(--amber); }

/* Tablet: tighten content */
@media (max-width: 899px) {
	.content-col { padding: 2.5rem 2rem 4rem 2rem; }
}

/* Mobile: collapse label col */
@media (max-width: 599px) {
	.article-row { flex-direction: column; min-height: auto; }
	.label-col { display: none; }
	.content-col { padding: 1.5rem 1.25rem 3rem; max-width: none; }
	.post-title { font-size: clamp(1.4rem, 6vw, 2rem); }
	.meta-strip { gap: 1rem; margin-bottom: 2rem; padding-bottom: 1rem; }
	.post-nav { flex-direction: column; gap: 0.75rem; }
	.post-nav-item { padding: 1rem 1.25rem; }
	.post-nav-item.next { text-align: left; }
}
</style>
