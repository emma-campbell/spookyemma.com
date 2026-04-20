<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		filename?: string;
		lang?: string;
		children: Snippet;
	}

	let { filename, lang, children }: Props = $props();
	let copied = $state(false);

	function handleCopy(e: MouseEvent) {
		const btn = e.currentTarget as HTMLButtonElement;
		const pre = btn.closest('.code-block')?.querySelector('pre');
		if (pre) {
			navigator.clipboard.writeText(pre.textContent || '');
			copied = true;
			setTimeout(() => (copied = false), 1500);
		}
	}
</script>

<div class="code-block" class:has-filename={!!filename}>
	<button
		class="code-copy"
		onclick={handleCopy}
		aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
	>{copied ? 'copied' : 'copy'}</button>
	{#if filename}
		<div class="code-filename">
			{filename}
			{#if lang}
				<span class="lang-badge">{lang}</span>
			{/if}
		</div>
	{/if}
	{@render children()}
</div>
