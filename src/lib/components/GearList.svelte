<script lang="ts">
	interface GearItem {
		name: string;
		href?: string;
		note: string;
		category: string;
		tag?: { label: string; type: 'new' | 'fav' | 'built' | 'shared' };
	}

	interface Props {
		items: GearItem[];
	}

	let { items }: Props = $props();
</script>

<ul class="gear-list">
	{#each items as item}
		<li class="gear-item">
			<span class="gear-name">
				{#if item.href}
					<a href={item.href}>{item.name}</a>
				{:else}
					{item.name}
				{/if}
				{#if item.tag}
					<span class="gear-tag tag-{item.tag.type}">{item.tag.label}</span>
				{/if}
			</span>
			<span class="gear-note">{item.note}</span>
			<span class="gear-category">{item.category}</span>
		</li>
	{/each}
</ul>
