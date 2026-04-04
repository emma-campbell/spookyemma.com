<script lang="ts">
	interface Props {
		type: 'log' | 'thinking' | 'making';
	}

	let { type }: Props = $props();

	const config: Record<string, { glyph: string; color: string }> = {
		log:      { glyph: '◈', color: 'var(--sage)' },
		thinking: { glyph: '✦', color: 'var(--amber)' },
		making:   { glyph: '⚗', color: 'var(--lavender)' }
	};

	const c = $derived(config[type]);
</script>

<span class="post-type" style:color={c.color}>{c.glyph} {type}</span>
