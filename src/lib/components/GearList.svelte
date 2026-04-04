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

<style>
.gear-list { list-style: none; display: flex; flex-direction: column; }
.gear-item {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: auto auto;
	gap: 0 1.5rem;
	padding: 0.85rem 0;
	border-bottom: 1px solid rgba(196,169,106,0.1);
	transition: background 0.15s, padding 0.1s;
}
.gear-item:first-child { border-top: 1px solid rgba(196,169,106,0.1); }
.gear-item:hover { background: rgba(232,168,48,0.04); padding-left: 0.5rem; margin-left: -0.5rem; }
.gear-name { font-size: 0.85rem; color: var(--parchment); line-height: 1.4; grid-column: 1; grid-row: 1; display: flex; align-items: baseline; gap: 0.5rem; }
.gear-name a { color: var(--amber); border-bottom: 1px solid rgba(232,168,48,0.35); }
.gear-note { font-size: 0.72rem; color: var(--muted); grid-column: 1; grid-row: 2; line-height: 1.5; margin-top: 0.2rem; }
.gear-category { grid-column: 2; grid-row: 1 / 3; font-size: 0.62rem; color: var(--muted); letter-spacing: 0.06em; align-self: center; text-align: right; white-space: nowrap; }
.gear-tag { font-size: 0.58rem; letter-spacing: 0.08em; padding: 2px 6px; border-radius: 2px; flex-shrink: 0; align-self: center; }
.tag-new    { background: rgba(122,158,126,0.15); color: var(--sage); }
.tag-fav    { background: rgba(232,168,48,0.12);  color: var(--amber); }
.tag-built  { background: rgba(155,142,196,0.15); color: var(--lavender); }
.tag-shared { background: rgba(212,101,74,0.12);  color: var(--coral); }
</style>
