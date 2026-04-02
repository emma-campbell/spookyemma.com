<script lang="ts">
	import { DateTime } from 'luxon';
	import UnderlineToBackground from './UnderlineToBackground.svelte';

	interface PostWithPreview {
		slug: string;
		title: string;
		published: string;
		previewHtml: string;
		hasMore: boolean;
	}

	interface Props {
		post: PostWithPreview;
	}

	let { post }: Props = $props();

	const formattedDate = $derived(DateTime.fromISO(post.published).toFormat('MM/dd/yy'));
</script>

<article class="post-item">
	<!-- Desktop layout - date on the left -->
	<div class="post-desktop">
		<p class="post-date">
			{formattedDate}
		</p>
		<div class="post-body">
			<a href="/notebook/{post.slug}" class="post-link group">
				<h3 class="page-title group-hover:text-highlighted">
					<UnderlineToBackground>
						{post.title}
					</UnderlineToBackground>
				</h3>
			</a>

			{#if post.previewHtml}
				<div class="post-preview">
					{@html post.previewHtml}
				</div>
			{/if}

			{#if post.hasMore}
				<a href="/notebook/{post.slug}" class="post-more">
					Read more →
				</a>
			{/if}
		</div>
	</div>

	<!-- Mobile layout - date under title -->
	<div class="post-mobile">
		<a class="post-link group" href="/notebook/{post.slug}">
			<h3 class="page-title group-hover:text-highlighted">
				<UnderlineToBackground>
					{post.title}
				</UnderlineToBackground>
			</h3>
		</a>

		<p class="post-date" style="margin-bottom: var(--space-sm);">
			{formattedDate}
		</p>

		{#if post.previewHtml}
			<div class="post-preview">
				{@html post.previewHtml}
			</div>
		{/if}

		{#if post.hasMore}
			<a href="/notebook/{post.slug}" class="post-more">
				Read more →
			</a>
		{/if}
	</div>
</article>

<style>
	.post-item {
		border-bottom: 1px solid var(--border-subtle);
		padding-bottom: var(--space-md);
		margin-bottom: var(--space-md);
	}

	.post-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
		margin-bottom: 0;
	}

	.post-desktop {
		display: none;
	}

	.post-date {
		font-size: 0.72rem;
		font-family: var(--font-sans);
		font-weight: 700;
		color: var(--accent);
		flex-shrink: 0;
		margin-top: 0.25rem;
		font-variant-numeric: tabular-nums;
	}

	.post-body {
		flex-grow: 1;
	}

	.post-link {
		display: block;
		margin-bottom: var(--space-sm);
		text-decoration: none;
	}

	.post-preview {
		color: var(--text-secondary);
		font-size: 0.82rem;
		line-height: 1.75;
		margin-bottom: var(--space-sm);
	}

	.post-preview :global(p) {
		margin-bottom: var(--space-sm);
	}

	.post-preview :global(p:last-child) {
		margin-bottom: 0;
	}

	.post-more {
		font-size: 0.72rem;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 600;
		text-decoration: none;
		transition: color 120ms ease;
	}

	.post-more:hover {
		color: var(--text);
	}

	@media (min-width: 768px) {
		.post-desktop {
			display: flex;
			gap: var(--space-md);
			align-items: flex-start;
		}

		.post-mobile {
			display: none;
		}
	}
</style>
