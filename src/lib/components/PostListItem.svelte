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

<article class="border-b border-muted-ink/10 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
	<!-- Desktop layout - date on the left -->
	<div class="hidden md:flex space-x-4 items-start">
		<p class="text-sm flex font-sans font-bold text-highlighted shrink-0 mt-1">
			{formattedDate}
		</p>
		<div class="flex-grow">
			<a href="/notebook/{post.slug}" class="block group mb-2">
				<h3 class="text-3xl font-medium text-text group-hover:text-highlighted">
					<UnderlineToBackground>
						{post.title}
					</UnderlineToBackground>
				</h3>
			</a>

			{#if post.previewHtml}
				<div class="text-text/60 text-md leading-relaxed mb-2 max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0">
					{@html post.previewHtml}
				</div>
			{/if}

			{#if post.hasMore}
				<a href="/notebook/{post.slug}">
					<span
						class="text-sm text-accent uppercase tracking-wide font-medium hover:text-highlighted"
					>
						Read more →
					</span>
				</a>
			{/if}
		</div>
	</div>

	<!-- Mobile layout - date under title -->
	<div class="md:hidden">
		<a class="block group mb-2" href="/notebook/{post.slug}">
			<h3 class="text-3xl font-medium text-text group-hover:text-highlighted">
				<UnderlineToBackground>
					{post.title}
				</UnderlineToBackground>
			</h3>
		</a>

		<p class="text-sm font-sans font-bold text-highlighted mb-2">
			{formattedDate}
		</p>

		{#if post.previewHtml}
			<div class="text-muted-ink text-md leading-relaxed mb-2 max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0">
				{@html post.previewHtml}
			</div>
		{/if}

		{#if post.hasMore}
			<a href="/notebook/{post.slug}">
				<span
					class="text-sm text-accent uppercase tracking-wide font-medium hover:text-highlighted"
				>
					Read more →
				</span>
			</a>
		{/if}
	</div>
</article>
