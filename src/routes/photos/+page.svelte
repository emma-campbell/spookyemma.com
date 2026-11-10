<script lang="ts">
	import { tick } from 'svelte';
	import { PageShell } from '#components';
	import type { PageData } from './$types';
	import type { Photo } from '#content';

	let { data }: { data: PageData } = $props();

	let active = $state('all');
	let lightboxPhoto = $state<Photo | null>(null);
	let closeButton = $state<HTMLButtonElement | null>(null);
	let lastTrigger: HTMLElement | null = null;

	const collMap = $derived(new Map(data.collections.map((c) => [c.id, c])));

	// Mirrors the .mosaic column counts below: 2 on mobile, 3 under 1100px, 4 under 1400px, 5 above.
	const GRID_SIZES =
		'(max-width: 599px) 50vw, (max-width: 1100px) 33vw, (max-width: 1400px) 25vw, 20vw';

	const visiblePhotos = $derived(
		active === 'all' ? data.photos : data.photos.filter((p) => p.collection === active)
	);

	const label = (photo: Photo) => photo.caption || photo.alt;

	async function openLightbox(photo: Photo, e: MouseEvent) {
		lastTrigger = e.currentTarget as HTMLElement;
		lightboxPhoto = photo;
		await tick();
		closeButton?.focus();
	}
	function closeLightbox() {
		lightboxPhoto = null;
		lastTrigger?.focus();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && lightboxPhoto) closeLightbox();
	}
</script>

<svelte:head>
	<title>Photos · Emma Campbell</title>
	<meta name="description" content="Photos by Emma Campbell." />
</svelte:head>

<svelte:window onkeydown={onKeydown} />

<PageShell>
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-val">{data.photos.length} photos</span>
		</div>
		<div class="page-header-content">
			<h1 class="page-title">Photos</h1>
			{#if data.lede}<p class="page-lede">{data.lede}</p>{/if}
		</div>
		<div class="page-header-aside">
			{#each data.annotations as note}
				<p class="kit-note">{note.body}</p>
			{/each}
		</div>
	</div>

	<div class="photo-filters" role="group" aria-label="Filter by collection">
		<button class="filter-btn" aria-pressed={active === 'all'} onclick={() => (active = 'all')}>
			all <span class="filter-num">{data.photos.length}</span>
		</button>
		{#each data.collections as coll}
			<button
				class="filter-btn"
				aria-pressed={active === coll.id}
				onclick={() => (active = coll.id)}
			>
				{coll.label} <span class="filter-num">{coll.count}</span>
			</button>
		{/each}
	</div>

	{#if visiblePhotos.length > 0}
		<div class="mosaic">
			{#each visiblePhotos as photo (photo.src)}
				<button
					class="photo"
					onclick={(e) => openLightbox(photo, e)}
					aria-label="View {label(photo)}"
				>
					<picture>
						{#if photo.srcset && photo.srcsetType === 'image/webp'}
							<source type="image/webp" srcset={photo.srcset} sizes={GRID_SIZES} />
						{/if}
						<img
							src={photo.src}
							srcset={photo.srcsetType === 'image/jpeg' ? photo.srcset : undefined}
							sizes={photo.srcsetType === 'image/jpeg' ? GRID_SIZES : undefined}
							alt={photo.alt}
							width={photo.width}
							height={photo.height}
							loading="lazy"
							decoding="async"
						/>
					</picture>
					<span class="photo-overlay" aria-hidden="true">
						{#if photo.caption}<span class="photo-caption">{photo.caption}</span>{/if}
						<span class="photo-meta">
							{photo.place || collMap.get(photo.collection)?.label} · {photo.dateLabel}
						</span>
					</span>
				</button>
			{/each}
		</div>
	{:else}
		<p class="mosaic-empty">No photos in this collection yet.</p>
	{/if}
</PageShell>

{#if lightboxPhoto}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lightbox" onclick={closeLightbox}>
		<div class="lightbox-inner" role="dialog" aria-modal="true" aria-label={label(lightboxPhoto)}>
			<button
				class="lightbox-close"
				bind:this={closeButton}
				onclick={closeLightbox}
				aria-label="Close photo"
			>
				<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
			<picture>
				{#if lightboxPhoto.srcset && lightboxPhoto.srcsetType === 'image/webp'}
					<source type="image/webp" srcset={lightboxPhoto.srcset} sizes="90vw" />
				{/if}
				<img
					src={lightboxPhoto.src}
					srcset={lightboxPhoto.srcsetType === 'image/jpeg' ? lightboxPhoto.srcset : undefined}
					sizes={lightboxPhoto.srcsetType === 'image/jpeg' ? '90vw' : undefined}
					alt={lightboxPhoto.alt}
					decoding="async"
				/>
			</picture>
			<div class="lightbox-caption">
				{#if lightboxPhoto.caption}<p class="lb-title">{lightboxPhoto.caption}</p>{/if}
				<p class="lb-place">{lightboxPhoto.place} · {lightboxPhoto.dateLabel}</p>
				{#if lightboxPhoto.exif?.length}
					<p class="lb-exif">
						{#each lightboxPhoto.exif as part, i}
							{#if i > 0}<span class="exif-sep" aria-hidden="true">·</span>{/if}<span>{part}</span>
						{/each}
					</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.kit-note {
		font-size: 0.95rem;
		color: var(--fg-muted);
		line-height: 1.5;
	}

	/* Collection filter */
	.photo-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0 0 1.75rem;
	}
	.filter-btn {
		font: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		padding: 0.3rem 0.95rem;
		border-radius: 999px;
		border: 1.5px solid var(--line-strong);
		background: transparent;
		color: var(--fg-muted);
		cursor: pointer;
		transition:
			background-color var(--transition),
			color var(--transition),
			border-color var(--transition);
	}
	.filter-btn:hover {
		color: var(--fg);
		border-color: var(--fg-muted);
	}
	.filter-btn[aria-pressed='true'] {
		background: var(--fg);
		border-color: var(--fg);
		color: var(--bg);
	}
	.filter-num {
		font-weight: 500;
		opacity: 0.75;
		font-variant-numeric: tabular-nums;
		margin-left: 0.15rem;
	}

	/* Mosaic */
	.mosaic {
		column-count: 5;
		column-gap: 14px;
	}
	@media (max-width: 1400px) {
		.mosaic {
			column-count: 4;
		}
	}
	@media (max-width: 1100px) {
		.mosaic {
			column-count: 3;
		}
	}
	.mosaic-empty {
		color: var(--fg-muted);
	}

	.photo {
		break-inside: avoid;
		width: 100%;
		margin-bottom: 14px;
		padding: 0;
		position: relative;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: none;
		cursor: zoom-in;
		display: block;
		background: var(--bg-sunk);
		font: inherit;
		color: inherit;
		text-align: left;
		box-shadow: 1px 3px 8px rgba(20, 24, 50, 0.18);
	}
	.photo picture {
		display: block;
	}
	.photo img {
		width: 100%;
		height: auto;
		display: block;
		transition: transform 0.5s var(--ease-out);
	}
	.photo:hover img {
		transform: scale(1.03);
	}

	/* Caption overlay */
	.photo-overlay {
		position: absolute;
		inset: auto 0 0 0;
		background: linear-gradient(to top, rgba(12, 15, 31, 0.82), rgba(12, 15, 31, 0));
		opacity: 0;
		transition: opacity 0.3s var(--ease-out);
		display: flex;
		flex-direction: column;
		padding: 2.5rem 0.9rem 0.75rem;
		color: #e1e5f7;
	}
	.photo:hover .photo-overlay,
	.photo:focus-visible .photo-overlay {
		opacity: 1;
	}
	.photo-caption {
		font-family: var(--font-display);
		font-weight: 650;
		font-size: 0.98rem;
		line-height: 1.3;
	}
	.photo-meta {
		font-size: 0.85rem;
		font-variant-numeric: tabular-nums;
		color: rgba(225, 229, 247, 0.85);
	}

	/* Lightbox: always the night ceiling, photos read best on dark */
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: rgba(12, 15, 31, 0.96);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3.5rem 2rem 2rem;
		cursor: zoom-out;
		color: #e1e5f7;
	}
	.lightbox-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 100%;
		max-height: 100%;
	}
	.lightbox img {
		display: block;
		max-width: min(90vw, 100%);
		max-height: 78vh;
		width: auto;
		height: auto;
		border-radius: var(--radius-md);
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
		cursor: default;
	}
	.lightbox-caption {
		text-align: center;
		cursor: default;
	}
	.lb-title {
		font-family: var(--font-display);
		font-weight: 650;
		font-size: 1.1rem;
	}
	.lb-place,
	.lb-exif {
		font-size: 0.92rem;
		font-variant-numeric: tabular-nums;
		color: rgba(225, 229, 247, 0.78);
	}
	.lb-exif {
		margin-top: 0.15rem;
	}
	.exif-sep {
		margin: 0 0.5em;
		opacity: 0.6;
	}
	.lightbox-close {
		position: fixed;
		top: 1rem;
		right: 1rem;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1.5px solid rgba(225, 229, 247, 0.3);
		background: rgba(225, 229, 247, 0.06);
		color: #e1e5f7;
		cursor: pointer;
		transition: background-color var(--transition);
	}
	.lightbox-close:hover {
		background: rgba(225, 229, 247, 0.16);
	}
	.lightbox-close:focus-visible {
		outline: 2px solid #b9f58c;
		outline-offset: 3px;
	}
	.lightbox-close svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}

	@media (max-width: 599px) {
		.mosaic {
			column-count: 2;
			column-gap: 10px;
		}
		.photo {
			margin-bottom: 10px;
		}
		/* No hover on touch, and two columns leave no room: place and date live in the lightbox */
		.photo-overlay {
			display: none;
		}
		.lightbox {
			padding: 4rem 0.75rem 1rem;
		}
		.lightbox img {
			max-width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.photo img,
		.photo-overlay {
			transition: none;
		}
		.photo:hover img {
			transform: none;
		}
	}
</style>
