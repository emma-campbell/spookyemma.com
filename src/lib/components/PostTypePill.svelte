<script lang="ts">
	interface Props {
		type: 'blog' | 'experiment' | 'note' | 'guide' | 'micro';
	}

	let { type }: Props = $props();

	const config: Record<string, { glyph: string; color: string }> = {
		blog:       { glyph: '✦', color: 'var(--amber)' },
		experiment: { glyph: '⚗', color: 'var(--coral)' },
		note:       { glyph: '◈', color: 'var(--sage)' },
		guide:      { glyph: '⌘', color: 'var(--lavender)' },
		micro:      { glyph: '○', color: 'var(--muted)' }
	};

	const c = $derived(config[type]);
</script>

<span class="post-type" style:color={c.color}>{c.glyph} {type}</span>
