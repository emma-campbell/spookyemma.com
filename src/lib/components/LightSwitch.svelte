<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '#lib/theme.svelte.ts';

	// The prerendered HTML can't know the visitor's theme, so the pressed
	// state is only rendered once we're in the browser. The plate itself
	// reads [data-theme] from CSS, so it's right before hydration too.
	let mounted = $state(false);
	onMount(() => (mounted = true));

	const lightsOff = $derived(theme.current === 'dark');

	// Flipping the lights off charges the stickers up once; a page load in
	// the dark just shows them already glowing.
	let chargeTimer: ReturnType<typeof setTimeout> | undefined;
	function flip() {
		theme.toggle();
		const root = document.documentElement;
		clearTimeout(chargeTimer);
		root.classList.toggle('lights-charging', theme.current === 'dark');
		chargeTimer = setTimeout(() => root.classList.remove('lights-charging'), 1600);
	}
</script>

<button
	class="light-switch"
	type="button"
	onclick={flip}
	aria-pressed={mounted ? lightsOff : undefined}
	aria-label="Lights off"
>
	<span class="plate" aria-hidden="true">
		<span class="screw"></span>
		<span class="slot"><span class="toggle"></span></span>
		<span class="screw"></span>
	</span>
	<span class="label">lights</span>
</button>

<style>
	.light-switch {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		background: none;
		border: none;
		padding: 0.25rem;
		font: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--fg-muted);
		cursor: pointer;
		transition: color var(--transition);
	}
	.light-switch:hover {
		color: var(--fg);
	}

	.plate {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 30px;
		height: 46px;
		padding: 4px 0;
		background: #f4f5fb;
		border-radius: 5px;
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.8) inset,
			1px 3px 6px rgba(20, 24, 50, 0.25);
	}
	.screw {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: #c9ccdc;
	}
	.slot {
		position: relative;
		width: 10px;
		height: 20px;
		border-radius: 3px;
		background: #dfe2ee;
		box-shadow: 0 1px 2px rgba(20, 24, 50, 0.3) inset;
	}
	.toggle {
		position: absolute;
		left: 1px;
		right: 1px;
		top: 1px;
		height: 10px;
		border-radius: 2px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(20, 24, 50, 0.35);
		transition: transform 0.18s var(--ease-out);
	}
	:global(:root[data-theme='dark']) .toggle {
		transform: translateY(8px);
	}
	:global(:root[data-theme='dark']) .plate {
		background: #c8cad8;
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.25) inset,
			0 2px 6px rgba(0, 0, 0, 0.5);
	}

	@media (prefers-reduced-motion: reduce) {
		.toggle {
			transition: none;
		}
	}
</style>
