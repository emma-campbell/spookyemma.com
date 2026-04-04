<script lang="ts">
	import type { PostEntry } from '$lib/content/types';
	import { ENTRY_TYPES } from '$lib/content/entryTypes';

	interface Props {
		type: PostEntry;
	}

	let { type }: Props = $props();
	const c = $derived(ENTRY_TYPES[type]);
</script>

<span class="post-type" style:color={c.color}>{c.icon} {c.label}</span>
