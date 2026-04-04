<script lang="ts">
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		const COLORS: [number, number, number][] = [
			[232, 168, 48],
			[212, 101, 74],
			[122, 158, 126],
			[155, 142, 196]
		];

		function noise(x: number, y: number) {
			return (
				(Math.sin(x * 0.8 + y * 0.3) * Math.cos(y * 0.6 - x * 0.4) +
					Math.sin(x * 0.3 - y * 0.7) * 0.5 +
					Math.cos(x * 1.1 + y * 0.9) * 0.3) /
				1.8
			);
		}

		function draw() {
			canvasEl.width = window.innerWidth;
			canvasEl.height = window.innerHeight;
			const S = 26;
			for (let gx = 0; gx < canvasEl.width + S; gx += S) {
				for (let gy = 0; gy < canvasEl.height + S; gy += S) {
					const x = gx + noise(gx * 0.015, gy * 0.015) * 9;
					const y = gy + noise(gx * 0.015 + 100, gy * 0.015 + 100) * 9;
					const r = Math.max(0.4, 0.7 + (noise(gx * 0.02 + 50, gy * 0.02 + 50) + 1) * 0.85);
					const a = 0.06 + (noise(gx * 0.025 + 200, gy * 0.025 + 200) + 1) * 0.09;
					const ci = Math.abs(Math.floor(((noise(gx * 0.008, gy * 0.008) + 1) / 2) * 4)) % 4;
					const [cr, cg, cb] = COLORS[ci];
					ctx.beginPath();
					ctx.arc(x, y, r, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(2)})`;
					ctx.fill();
				}
			}
		}

		draw();
		window.addEventListener('resize', draw);
		return () => window.removeEventListener('resize', draw);
	});
</script>

<canvas id="bg-canvas" bind:this={canvasEl}></canvas>
