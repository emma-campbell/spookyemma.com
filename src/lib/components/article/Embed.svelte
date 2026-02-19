<script lang="ts">
	interface Props {
		url?: string;
		placeholder?: string;
	}

	let { url, placeholder }: Props = $props();
</script>

<div class="embed">
	{#if url}
		<iframe
			src={url}
			title="Embedded content"
			frameborder="0"
			allowfullscreen
			loading="lazy"
			style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
		></iframe>
	{:else if placeholder}
		{placeholder}
	{:else}
		[ embed placeholder ]
	{/if}
</div>
