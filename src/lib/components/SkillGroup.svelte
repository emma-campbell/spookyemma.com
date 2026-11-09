<script lang="ts">
	interface Skill {
		name: string;
		highlight?: boolean;
	}

	interface Props {
		label: string;
		skills: Skill[];
	}

	let { label, skills }: Props = $props();
</script>

<div>
	<span class="skill-group-label">{label}</span>
	<div class="skill-tags">
		{#each skills as skill}
			<span class="skill-tag" class:highlight={skill.highlight}>{skill.name}</span>
		{/each}
	</div>
</div>

<style>
	.skill-group-label {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--fg);
		margin-bottom: 0.5rem;
		display: block;
	}
	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	.skill-tag {
		font-size: 0.9rem;
		color: var(--fg-muted);
		border: 1px solid var(--line-strong);
		padding: 1px 11px;
		border-radius: 999px;
	}
	.skill-tag.highlight {
		color: var(--fg);
		font-weight: 600;
		background: var(--bg-raised);
	}
</style>
