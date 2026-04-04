<script lang="ts">
	interface Fact {
		label: string;
		value: string;
	}

	interface Props {
		facts: Fact[];
	}

	let { facts }: Props = $props();
</script>

<div class="quick-facts">
	{#each facts as fact}
		<div class="qf-item">
			<span class="qf-label">{fact.label}</span>
			<span class="qf-value">{@html fact.value}</span>
		</div>
	{/each}
</div>
