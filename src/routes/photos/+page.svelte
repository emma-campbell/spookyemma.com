<script lang="ts">
	import { PageShell } from '$lib/components';
	import type { PageData } from './$types';
	import type { Photo } from '$lib/content';

	let { data }: { data: PageData } = $props();

	let active = $state('all');
	let lightboxPhoto = $state<Photo | null>(null);

	const collMap = $derived(new Map(data.collections.map((c) => [c.id, c])));

	const visiblePhotos = $derived(
		active === 'all' ? data.photos : data.photos.filter((p) => p.collection === active)
	);

	function openLightbox(photo: Photo) {
		lightboxPhoto = photo;
	}
	function closeLightbox() {
		lightboxPhoto = null;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeLightbox();
	}
</script>

<svelte:head>
	<title>Photos · Emma Campbell</title>
	<meta name="description" content="A visual field journal — the dog, trails, and whatever caught the light." />
</svelte:head>

<svelte:window onkeydown={onKeydown} />

<PageShell>
	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">total</span>
			<span class="phl-val">{data.photos.length} photos</span>
		</div>
		<div class="page-header-content">
			<p class="hero-eyebrow">{data.eyebrow}</p>
			<h1 class="page-title">the <em>photos</em></h1>
			<p class="page-lede">{data.lede}</p>
		</div>
		<div class="page-header-aside">
			<div class="coll-stats">
				{#each data.collections as coll}
					<div class="stat-line">
						<span class="stat-key">{#if coll.icon}{coll.icon} {/if}{coll.label}</span>
						<span class="stat-val">{coll.count}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Collection filter -->
	<div class="filter-row">
		<div class="filter-label-col"><span class="filter-label-text">collection</span></div>
		<div class="filter-content">
			<button class="filter-btn" class:active={active === 'all'} onclick={() => (active = 'all')}>
				all
			</button>
			{#each data.collections as coll}
				<button
					class="filter-btn"
					class:active={active === coll.id}
					onclick={() => (active = coll.id)}
				>
					{#if coll.icon}{coll.icon} {/if}{coll.label}
				</button>
			{/each}
		</div>
		<div class="filter-aside">
			<span class="filter-count">
				{visiblePhotos.length} photo{visiblePhotos.length === 1 ? '' : 's'}
			</span>
		</div>
	</div>

	<!-- Mosaic -->
	<div class="mosaic-row">
		<div class="mosaic-spacer"></div>
		<div class="mosaic-wrap">
			{#if visiblePhotos.length > 0}
				<div class="mosaic">
					{#each visiblePhotos as photo (photo.src)}
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<button class="photo" onclick={() => openLightbox(photo)} aria-label="View {photo.caption}">
							<img src={photo.src} alt={photo.alt} loading="lazy" />
							<span class="photo-overlay">
								<span class="photo-caption">{photo.caption}</span>
								<span class="photo-meta">
									{#if collMap.get(photo.collection)}
										<span class="photo-collection-tag">
											{#if collMap.get(photo.collection)?.icon}{collMap.get(photo.collection)
													?.icon} {/if}{collMap.get(photo.collection)?.label}
										</span>
										·
									{/if}
									{photo.dateLabel}
								</span>
							</span>
						</button>
					{/each}
				</div>
			{:else}
				<p class="mosaic-empty">No photos in this collection yet.</p>
			{/if}
		</div>
		<div class="mosaic-aside">
			{#each data.annotations as note}
				<div class="annotation">
					<strong>{note.title}</strong>
					{note.body}
				</div>
			{/each}
		</div>
	</div>
</PageShell>

<!-- Lightbox -->
{#if lightboxPhoto}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lightbox open" onclick={closeLightbox}>
		<span class="lightbox-close" aria-hidden="true">✕</span>
		<img src={lightboxPhoto.src} alt={lightboxPhoto.alt} />
		<div class="lightbox-caption">
			{lightboxPhoto.caption}
			<small>{lightboxPhoto.place} · {lightboxPhoto.dateLabel}</small>
		</div>
	</div>
{/if}

<style>
	/* ── Page-header collection stats ── */
	.coll-stats {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.stat-line {
		display: flex;
		justify-content: space-between;
		font-size: 0.68rem;
	}
	.stat-line .stat-key {
		color: var(--muted);
	}
	.stat-line .stat-val {
		color: var(--parchment);
	}

	/* ── Collection filter strip ── */
	.filter-row {
		display: flex;
		border-bottom: 1px solid var(--border);
	}
	.filter-label-col {
		width: var(--col-label);
		flex-shrink: 0;
		border-right: 2px solid var(--red-line);
		padding: 0.9rem 1rem 0.9rem 0.75rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.filter-label-text {
		font-size: 0.58rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
		text-align: right;
	}
	.filter-content {
		flex: 1;
		padding: 0.9rem 3rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		border-right: 1px solid var(--border);
	}
	.filter-btn {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.08em;
		padding: 3px 11px;
		border-radius: var(--radius-sm);
		border: 1px solid currentColor;
		background: transparent;
		cursor: pointer;
		transition: background 0.15s;
		color: var(--muted);
	}
	.filter-btn:hover {
		background: rgba(255, 255, 255, 0.05);
	}
	.filter-btn.active {
		color: var(--amber);
		border-color: var(--amber);
		background: rgba(232, 168, 48, 0.08);
	}
	.filter-aside {
		width: var(--col-right);
		flex-shrink: 0;
		padding: 0.9rem 1.5rem;
		display: flex;
		align-items: center;
	}
	.filter-count {
		font-size: 0.65rem;
		color: var(--muted);
		letter-spacing: 0.04em;
	}

	/* ── Mosaic ── */
	.mosaic-row {
		display: flex;
	}
	.mosaic-spacer {
		width: var(--col-label);
		flex-shrink: 0;
		border-right: 2px solid var(--red-line);
	}
	.mosaic-wrap {
		flex: 1;
		padding: 2rem 2rem 3rem;
		border-right: 1px solid var(--border);
	}
	.mosaic {
		column-count: 3;
		column-gap: 14px;
	}
	@media (max-width: 1100px) {
		.mosaic {
			column-count: 2;
		}
	}
	.mosaic-empty {
		font-size: 0.82rem;
		font-style: italic;
		color: var(--muted);
	}

	.photo {
		break-inside: avoid;
		width: 100%;
		margin-bottom: 14px;
		padding: 0;
		position: relative;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 1px solid rgba(196, 169, 106, 0.15);
		cursor: pointer;
		display: block;
		background: #221c16;
		font: inherit;
		color: inherit;
		text-align: left;
	}
	.photo img {
		width: 100%;
		display: block;
		transition: transform 0.4s ease, filter 0.4s ease;
		filter: saturate(0.92) brightness(0.96);
	}
	.photo:hover img {
		transform: scale(1.04);
		filter: saturate(1.05) brightness(1.02);
	}

	/* Caption overlay */
	.photo-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(24, 20, 16, 0.85) 0%, rgba(24, 20, 16, 0) 45%);
		opacity: 0;
		transition: opacity 0.3s;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 0.85rem 1rem;
	}
	.photo:hover .photo-overlay,
	.photo:focus-visible .photo-overlay {
		opacity: 1;
	}
	.photo-caption {
		font-size: 0.72rem;
		color: var(--parchment);
		font-family: var(--font-display);
		font-style: italic;
		line-height: 1.3;
		margin-bottom: 0.2rem;
	}
	.photo-meta {
		font-size: 0.58rem;
		color: var(--muted);
		letter-spacing: 0.04em;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
	.photo-collection-tag {
		color: var(--amber);
	}

	/* Mosaic right aside */
	.mosaic-aside {
		width: var(--col-right);
		flex-shrink: 0;
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	/* ── Lightbox ── */
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(12, 10, 8, 0.94);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		cursor: zoom-out;
		backdrop-filter: blur(4px);
	}
	.lightbox img {
		max-width: 90%;
		max-height: 82vh;
		border-radius: var(--radius-md);
		border: 1px solid rgba(196, 169, 106, 0.2);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
	}
	.lightbox-caption {
		position: absolute;
		bottom: 1.5rem;
		left: 0;
		right: 0;
		text-align: center;
		font-size: 0.78rem;
		font-family: var(--font-display);
		font-style: italic;
		color: var(--parchment);
	}
	.lightbox-caption small {
		display: block;
		font-family: var(--font-mono);
		font-style: normal;
		font-size: 0.62rem;
		color: var(--muted);
		margin-top: 0.3rem;
		letter-spacing: 0.06em;
	}
	.lightbox-close {
		position: absolute;
		top: 1.5rem;
		right: 2rem;
		font-size: 1.4rem;
		color: var(--muted);
		cursor: pointer;
		transition: color 0.2s;
	}
	.lightbox-close:hover {
		color: var(--amber);
	}

	/* ── Mobile ── */
	@media (max-width: 599px) {
		.filter-label-col {
			display: none;
		}
		.filter-content {
			border-right: none;
			padding: 0.75rem 1.25rem;
		}
		.filter-aside {
			display: none;
		}

		.mosaic-spacer {
			display: none;
		}
		.mosaic-aside {
			display: none;
		}
		.mosaic-wrap {
			border-right: none;
			border-top: 2px solid var(--red-line);
			padding: 1.5rem 1.25rem 2.5rem;
		}
		.mosaic {
			column-count: 2;
			column-gap: 10px;
		}
		.photo {
			margin-bottom: 10px;
		}
		/* Always show captions on mobile (no hover) */
		.photo-overlay {
			opacity: 1;
			background: linear-gradient(to top, rgba(24, 20, 16, 0.8) 0%, rgba(24, 20, 16, 0) 50%);
		}
	}
</style>
