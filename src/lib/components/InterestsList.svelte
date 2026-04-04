<script lang="ts">
	interface Interest {
		text: string;
		fav?: boolean;
	}

	interface Props {
		items: Interest[];
	}

	let { items }: Props = $props();
</script>

<ul class="interests-list">
	{#each items as item}
		<li class:fav={item.fav}>{item.text}</li>
	{/each}
</ul>
