<script lang="ts">
	interface Props {
		html: string;
	}

	let { html }: Props = $props();
</script>

<div class="prose prose-invert max-w-none">
	{@html html}
</div>
