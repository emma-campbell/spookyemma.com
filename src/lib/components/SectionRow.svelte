<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label?: string;
		sectionNum?: string;
		labelColor?: string;
		children: Snippet;
		aside?: Snippet;
	}

	let { label, sectionNum, labelColor, children, aside }: Props = $props();
</script>

<div class="section-row">
	{#if label}
		<div class="row-label">
			<span class="row-label-text" style:color={labelColor}>
				{label}
				{#if sectionNum}
					<span class="row-label-num">{sectionNum}</span>
				{/if}
			</span>
		</div>
	{/if}
	<div class="row-content">
		{@render children()}
	</div>
	{#if aside}
		<div class="row-aside">
			{@render aside()}
		</div>
	{/if}
</div>
