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

		const S = 26;
		const REPEL_RADIUS = 120;
		const REPEL_STRENGTH = 45;
		const LERP_SPEED = 0.08;

		interface Dot {
			baseX: number;
			baseY: number;
			x: number;
			y: number;
			r: number;
			a: number;
			cr: number;
			cg: number;
			cb: number;
		}

		let dots: Dot[] = [];
		let mouseX = -9999;
		let mouseY = -9999;
		let animId: number;

		function noise(x: number, y: number) {
			return (
				(Math.sin(x * 0.8 + y * 0.3) * Math.cos(y * 0.6 - x * 0.4) +
					Math.sin(x * 0.3 - y * 0.7) * 0.5 +
					Math.cos(x * 1.1 + y * 0.9) * 0.3) /
				1.8
			);
		}

		function buildDots() {
			dots = [];
			const w = window.innerWidth;
			const h = window.innerHeight;
			canvasEl.width = w;
			canvasEl.height = h;

			for (let gx = 0; gx < w + S; gx += S) {
				for (let gy = 0; gy < h + S; gy += S) {
					const baseX = gx + noise(gx * 0.015, gy * 0.015) * 9;
					const baseY = gy + noise(gx * 0.015 + 100, gy * 0.015 + 100) * 9;
					const r = Math.max(0.4, 0.7 + (noise(gx * 0.02 + 50, gy * 0.02 + 50) + 1) * 0.85);
					const a = 0.06 + (noise(gx * 0.025 + 200, gy * 0.025 + 200) + 1) * 0.09;
					const ci = Math.abs(Math.floor(((noise(gx * 0.008, gy * 0.008) + 1) / 2) * 4)) % 4;
					const [cr, cg, cb] = COLORS[ci];
					dots.push({ baseX, baseY, x: baseX, y: baseY, r, a, cr, cg, cb });
				}
			}
		}

		function frame() {
			ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

			for (let i = 0; i < dots.length; i++) {
				const d = dots[i];

				// Repel from cursor
				const dx = d.baseX - mouseX;
				const dy = d.baseY - mouseY;
				const dist = Math.sqrt(dx * dx + dy * dy);

				let targetX = d.baseX;
				let targetY = d.baseY;

				if (dist < REPEL_RADIUS && dist > 0) {
					const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
					targetX = d.baseX + (dx / dist) * force;
					targetY = d.baseY + (dy / dist) * force;
				}

				// Lerp toward target
				d.x += (targetX - d.x) * LERP_SPEED;
				d.y += (targetY - d.y) * LERP_SPEED;

				ctx.beginPath();
				ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${d.cr},${d.cg},${d.cb},${d.a.toFixed(2)})`;
				ctx.fill();
			}

			animId = requestAnimationFrame(frame);
		}

		function onMouseMove(e: MouseEvent) {
			mouseX = e.clientX;
			mouseY = e.clientY;
		}

		function onMouseLeave() {
			mouseX = -9999;
			mouseY = -9999;
		}

		function onResize() {
			buildDots();
		}

		buildDots();
		animId = requestAnimationFrame(frame);

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseleave', onMouseLeave);
		window.addEventListener('resize', onResize);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseleave', onMouseLeave);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<canvas id="bg-canvas" bind:this={canvasEl}></canvas>
