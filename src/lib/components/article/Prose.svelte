<script lang="ts">
	interface Props {
		html: string;
	}

	let { html }: Props = $props();
</script>

<div class="prose">
	{@html html}
</div>
