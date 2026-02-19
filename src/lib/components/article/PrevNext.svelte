<script lang="ts">
	interface NavLink {
		slug: string;
		title: string;
	}

	interface Props {
		prev?: NavLink | null;
		next?: NavLink | null;
	}

	let { prev, next }: Props = $props();
</script>

{#if prev || next}
	<nav class="prev-next">
		{#if prev}
			<div class="prev">
				<span class="label">← Previous</span>
				<a href="/notebook/{prev.slug}">{prev.title}</a>
			</div>
		{:else}
			<div></div>
		{/if}
		{#if next}
			<div class="next">
				<span class="label">Next →</span>
				<a href="/notebook/{next.slug}">{next.title}</a>
			</div>
		{/if}
	</nav>
{/if}
