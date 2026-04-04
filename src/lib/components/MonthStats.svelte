<script lang="ts">
	interface Props {
		added?: number;
		changed?: number;
		fixed?: number;
		meta?: number;
	}

	let { added = 0, changed = 0, fixed = 0, meta = 0 }: Props = $props();
</script>

<div class="month-stats">
	{#if added > 0}
		<div class="month-stat">
			<span class="month-stat-dot" style="background:var(--sage)"></span>
			<span class="month-stat-count">{added}</span> added
		</div>
	{/if}
	{#if changed > 0}
		<div class="month-stat">
			<span class="month-stat-dot" style="background:var(--amber)"></span>
			<span class="month-stat-count">{changed}</span> changed
		</div>
	{/if}
	{#if fixed > 0}
		<div class="month-stat">
			<span class="month-stat-dot" style="background:var(--coral)"></span>
			<span class="month-stat-count">{fixed}</span> fixed
		</div>
	{/if}
	{#if meta > 0}
		<div class="month-stat">
			<span class="month-stat-dot" style="background:var(--lavender)"></span>
			<span class="month-stat-count">{meta}</span> meta
		</div>
	{/if}
</div>
