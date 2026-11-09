<script lang="ts">
	// Glow-in-the-dark stickers. Purely decorative: the hero variant is the
	// cluster beside the name on the home page; the margins variant pins a
	// few to the outer edges of a reading page and hides on narrow screens.
	interface Props {
		variant?: 'hero' | 'margins';
		/** margins only: which edges get stickers */
		sides?: 'both' | 'right';
		/** margins only: how far down the page the stickers start */
		top?: string;
	}

	let { variant = 'hero', sides = 'both', top = '1rem' }: Props = $props();

	// Five-point star drawn at its real size, so the cast shadow isn't scaled with it
	function star(cx: number, cy: number, r: number, rotate = 0): string {
		const points = Array.from({ length: 10 }, (_, i) => {
			const radius = i % 2 === 0 ? r : r * 0.48;
			const angle = ((rotate - 90 + i * 36) * Math.PI) / 180;
			return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`;
		});
		return `M${points.join(' L')} Z`;
	}

	const moon = 'M58,4 A56,56 0 1,0 108,86 A44,44 0 1,1 58,4 Z';
	const ghost =
		'M36,2 C17,2 4,16 4,36 L4,84 Q12,98 20,86 Q28,98 36,86 Q44,98 52,86 Q60,98 68,84 L68,36 C68,16 55,2 36,2 Z';
</script>

{#if variant === 'hero'}
	<svg class="stickers stickers-hero" viewBox="0 0 560 400" aria-hidden="true" focusable="false">
		<g transform="translate(70 30) rotate(-8 56 56)">
			<path class="sticker" d={moon} />
		</g>
		<g transform="translate(300 150) rotate(6 36 46)">
			<path class="sticker" d={ghost} />
			<circle class="sticker-eye" cx="25" cy="38" r="5" />
			<circle class="sticker-eye" cx="47" cy="38" r="5" />
		</g>
		<path class="sticker" d={star(230, 70, 17, 8)} stroke-linejoin="round" />
		<path class="sticker" d={star(40, 260, 24, -10)} stroke-linejoin="round" />
		<path class="sticker" d={star(470, 290, 18, 14)} stroke-linejoin="round" />
		<path class="sticker" d={star(500, 60, 11, -4)} stroke-linejoin="round" />
		<g transform="rotate(-14 470 150)">
			<circle class="sticker" cx="470" cy="150" r="24" />
			<path
				class="sticker"
				d="M418,158 C418,146 522,146 522,158 C522,170 418,170 418,158 Z M430,158 C432,162 508,162 510,158 C508,155 432,155 430,158 Z"
				fill-rule="evenodd"
			/>
		</g>
	</svg>
{:else}
	<div class="stickers stickers-margins" style:--stickers-top={top} aria-hidden="true">
		{#if sides === 'both'}
			<svg class="left" viewBox="0 0 140 480" focusable="false">
				<g transform="translate(10 20) rotate(-10 56 56) scale(0.75)">
					<path class="sticker" d={moon} />
				</g>
				<path class="sticker" d={star(110, 170, 14, 10)} stroke-linejoin="round" />
				<path class="sticker" d={star(40, 420, 10, -6)} stroke-linejoin="round" />
			</svg>
		{/if}
		<svg class="right" viewBox="0 0 140 480" focusable="false">
			<g transform="translate(40 30) rotate(5 36 46) scale(0.85)">
				<path class="sticker" d={ghost} />
				<circle class="sticker-eye" cx="25" cy="38" r="5" />
				<circle class="sticker-eye" cx="47" cy="38" r="5" />
			</g>
			<path class="sticker" d={star(95, 300, 15, -12)} stroke-linejoin="round" />
		</svg>
	</div>
{/if}

<style>
	.stickers-hero {
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.stickers-margins {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.stickers-margins svg {
		position: absolute;
		top: var(--stickers-top);
		width: 140px;
		height: auto;
		overflow: visible;
	}
	.stickers-margins .left {
		left: 0;
	}
	.stickers-margins .right {
		right: 0;
	}

	@media (max-width: 1199px) {
		.stickers-margins {
			display: none;
		}
	}
</style>
