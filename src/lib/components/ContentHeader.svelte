<script lang="ts">
	interface Props {
		glyph: string;
		glyphColor?: string;
		title: string;
		count?: string;
	}

	let { glyph, glyphColor, title, count }: Props = $props();
</script>

<div class="content-header">
	<span class="ch-glyph" style:color={glyphColor}>{glyph}</span>
	<span class="ch-title">{title}</span>
	{#if count}
		<span class="ch-count">{count}</span>
	{/if}
</div>
