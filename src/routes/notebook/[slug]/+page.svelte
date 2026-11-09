<script lang="ts">
	import { PageShell, Stickers } from '#components';
	import { ENTRY_TYPES } from '#lib/content/entryTypes.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const config = $derived(ENTRY_TYPES[data.post.entry]);
	const published = $derived(data.post.published.slice(0, 10));
</script>

<svelte:head>
	<title>{data.post.title} · Emma Campbell</title>
	<meta name="description" content={data.post.description || data.post.title} />
</svelte:head>

<PageShell>
	<div class="article-wrap">
		<Stickers variant="margins" />

		<article class="article">
			<header class="article-header">
				<div class="article-meta">
					<a href="/notebook">notebook</a>
					<span style:color={config.color}>{config.label}</span>
					<time datetime={data.post.published}>{published}</time>
					<span>{data.readingTime.replace('~', '')} read</span>
				</div>

				<h1 class="post-title">{data.post.title}</h1>

				{#if data.post.tags.length > 0}
					<ul class="tag-list" aria-label="Tags">
						{#each data.post.tags as tag}
							<li class="post-tag">{tag}</li>
						{/each}
					</ul>
				{/if}
			</header>

			<div class="prose">
				{@html data.post.contentHtml}
			</div>

			{#if data.references.length > 0}
				<div class="citations">
					<h2 class="citations-title">References</h2>
					<ol>
						{#each data.references as ref}
							<li id="ref-{ref.id}"><a href={ref.url}>{ref.title || ref.url}</a></li>
						{/each}
					</ol>
				</div>
			{/if}

			{#if data.prevPost || data.nextPost}
				<nav class="post-nav" aria-label="More entries">
					{#if data.prevPost}
						<a class="post-nav-item prev" href="/notebook/{data.prevPost.slug}">
							<span class="post-nav-dir">Previous</span>
							<span class="post-nav-title">{data.prevPost.title}</span>
						</a>
					{/if}
					{#if data.nextPost}
						<a class="post-nav-item next" href="/notebook/{data.nextPost.slug}">
							<span class="post-nav-dir">Next</span>
							<span class="post-nav-title">{data.nextPost.title}</span>
						</a>
					{/if}
				</nav>
			{/if}
		</article>
	</div>
</PageShell>

<style>
	.article-wrap {
		position: relative;
	}

	.article {
		max-width: var(--measure);
		margin: 0 auto;
		padding: 2.5rem 0 2rem;
	}

	.article-header {
		margin-bottom: 2.5rem;
	}

	.article-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1.25rem;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--fg-muted);
		font-variant-numeric: tabular-nums;
		margin-bottom: 1rem;
	}
	.article-meta a {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--line-strong);
		text-decoration-thickness: 1.5px;
		text-underline-offset: 0.25em;
	}
	.article-meta a:hover {
		text-decoration-color: var(--fg);
	}

	.post-title {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.3rem, 5.5vw, 3.6rem);
		line-height: 1;
		letter-spacing: -0.035em;
		color: var(--fg);
	}

	.tag-list {
		list-style: none;
		margin-top: 1.25rem;
	}
	.post-tag {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--fg-muted);
		padding: 1px 10px;
		border: 1.5px solid var(--line-strong);
		border-radius: 999px;
	}

	/* The first paragraph opens a touch larger */
	.prose > :global(p:first-child) {
		font-size: 1.15rem;
		line-height: 1.7;
	}

	@media (max-width: 639px) {
		.article {
			padding-top: 1rem;
		}
	}
</style>
