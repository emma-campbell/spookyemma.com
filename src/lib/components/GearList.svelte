<script lang="ts">
	interface GearItem {
		name: string;
		href?: string;
		note?: string;
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
			{#if item.note}
				<span class="gear-note">{item.note}</span>
			{/if}
			<span class="gear-category">{item.category}</span>
		</li>
	{/each}
</ul>

<style>
	.gear-list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}
	.gear-item {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto;
		gap: 0 1.5rem;
		padding: 0.9rem 0;
		border-bottom: 1px solid var(--line);
	}
	.gear-name {
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--fg);
		line-height: 1.4;
		grid-column: 1;
		grid-row: 1;
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.gear-name a {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--accent-soft);
		text-decoration-thickness: 2px;
		text-underline-offset: 0.18em;
		transition: text-decoration-color var(--transition);
	}
	.gear-name a:hover {
		text-decoration-color: var(--accent);
	}
	.gear-note {
		font-size: 0.95rem;
		color: var(--fg-muted);
		grid-column: 1;
		grid-row: 2;
		line-height: 1.5;
		margin-top: 0.15rem;
	}
	.gear-category {
		grid-column: 2;
		grid-row: 1 / 3;
		font-size: 0.88rem;
		color: var(--fg-muted);
		align-self: center;
		text-align: right;
		white-space: nowrap;
	}
	.gear-tag {
		font-size: 0.8rem;
		font-weight: 600;
		padding: 0 9px;
		border: 1.5px solid currentColor;
		border-radius: 999px;
		flex-shrink: 0;
		align-self: center;
	}
	.tag-new {
		color: var(--type-log);
	}
	.tag-fav {
		color: var(--type-thinking);
	}
	.tag-built {
		color: var(--type-making);
	}
	.tag-shared {
		color: var(--type-danger);
	}

	@media (max-width: 639px) {
		.gear-item {
			grid-template-columns: 1fr;
		}
		.gear-category {
			grid-column: 1;
			grid-row: 3;
			text-align: left;
			margin-top: 0.15rem;
		}
	}
</style>
