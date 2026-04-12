<script lang="ts">
	import { Marked } from "marked";

	interface Interest {
		text: string;
		fav?: boolean;
	}

	interface Props {
		items: Interest[];
	}

	let { items }: Props = $props();

	const renderer = {
		link({ href, text }: { href: string; text: string }) {
			return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
		},
	};

	const md = new Marked({ renderer });

	function inlineMd(src: string): string {
		return md.parseInline(src) as string;
	}
</script>

<ul class="interests-list">
	{#each items as item}
		<li class:fav={item.fav}>{@html inlineMd(item.text)}</li>
	{/each}
</ul>
