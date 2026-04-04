<script lang="ts">
	interface Stat {
		num: string;
		desc: string;
	}

	interface Props {
		stats: Stat[];
	}

	let { stats }: Props = $props();
</script>

<div class="stat-block">
	{#each stats as stat}
		<div class="stat-item">
			<span class="stat-num">{stat.num}</span>
			<span class="stat-desc">{stat.desc}</span>
		</div>
	{/each}
</div>
