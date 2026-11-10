<script lang="ts">
	interface Props {
		title: string;
		count?: string;
	}

	let { title, count }: Props = $props();
</script>

<div class="content-header">
	<span class="ch-title">{title}</span>
	{#if count}
		<span class="ch-count">{count}</span>
	{/if}
</div>
