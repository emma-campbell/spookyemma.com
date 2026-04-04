<script lang="ts">
	interface Props {
		role: string;
		org: string;
		location?: string;
		dates: string;
		current?: boolean;
		bullets?: string[];
	}

	let { role, org, location, dates, current = false, bullets = [] }: Props = $props();
</script>

<div class="cv-entry" class:cv-entry-active={current} class:cv-entry-past={!current}>
	<div class="cv-role">{role}</div>
	<div class="cv-org-line">
		<span class="cv-org">{org}</span>
		{#if location}
			<span style="opacity:0.4">&middot;</span>
			<span>{location}</span>
		{/if}
		<span style="opacity:0.4">&middot;</span>
		<span class="cv-dates">{@html dates}</span>
	</div>
	{#if bullets.length > 0}
		<ul class="cv-bullets">
			{#each bullets as bullet}
				<li>{@html bullet}</li>
			{/each}
		</ul>
	{/if}
</div>
