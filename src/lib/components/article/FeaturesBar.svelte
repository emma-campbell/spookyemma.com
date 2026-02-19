<script lang="ts">
	interface Props {
		features: string[];
	}

	let { features }: Props = $props();
</script>

{#if features.length > 0}
	<div class="features-bar">
		{#each features as feature}
			<span>{feature}</span>
		{/each}
	</div>
{/if}
