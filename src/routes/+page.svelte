<script lang="ts">
	import { PageShell, Stickers } from '#components';
	import { ENTRY_TYPES } from '#lib/content/entryTypes.ts';

	let { data } = $props();

	// Dates are stored as YYYY-MM-DD; print them as written, no timezone shift
	const day = (date: string) => date.slice(0, 10);
</script>

<svelte:head>
	<title>Emma Campbell</title>
	<meta
		name="description"
		content="Personal website of Emma Campbell. Software, experiments, notes, and the occult mundane."
	/>
</svelte:head>

<PageShell>
	<section class="home-hero">
		<div class="home-hero-text">
			<h1 class="hero-title">Emma<br />Campbell</h1>
			<p class="hero-desc">
				The personal website of <a href="/about">Emma</a>. I write about software, self-experiments,
				and things that haunt me.
			</p>
		</div>
		<div class="home-hero-stickers">
			<Stickers variant="hero" />
		</div>
	</section>

	<div class="home-lists">
		<section class="home-list" aria-labelledby="lately">
			<div class="section-header">
				<h2 id="lately">Lately</h2>
				<a class="section-count" href="/notebook">all {data.totalCount} entries</a>
			</div>
			<ul class="post-list">
				{#each data.latest as post (post.slug)}
					<li class="post-item">
						<a class="post-link" href="/notebook/{post.slug}">{post.title}</a>
						<span class="post-badge" style:color={ENTRY_TYPES[post.entry].color}
							>{ENTRY_TYPES[post.entry].label}</span
						>
						<time class="post-meta" datetime={post.published}>{day(post.published)}</time>
					</li>
				{/each}
			</ul>
		</section>

		{#if data.thinking.length > 0}
			<section class="home-list" aria-labelledby="worth-reading">
				<div class="section-header">
					<h2 id="worth-reading">Worth reading</h2>
					<span class="section-count">thinking</span>
				</div>
				<ul class="post-list">
					{#each data.thinking as post (post.slug)}
						<li class="post-item">
							<a class="post-link" href="/notebook/{post.slug}">{post.title}</a>
							<time class="post-meta" datetime={post.published}>{day(post.published)}</time>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
</PageShell>

<style>
	.home-hero {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		align-items: center;
		gap: 2rem;
		padding: 3rem 0 4rem;
	}
	.home-hero-stickers {
		max-width: 560px;
		justify-self: end;
		width: 100%;
	}

	.home-lists {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem 5rem;
		padding-top: 3rem;
		border-top: 1px dashed var(--line-strong);
	}
	.home-list h2 {
		font: inherit;
	}
	.home-list .section-count {
		text-decoration: none;
	}
	a.section-count:hover {
		color: var(--fg);
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	@media (max-width: 899px) {
		.home-hero {
			grid-template-columns: 1fr;
			padding: 2rem 0 2.5rem;
		}
		.home-hero-stickers {
			order: -1;
			max-width: 320px;
			justify-self: start;
		}
		.home-lists {
			grid-template-columns: 1fr;
		}
	}
</style>
