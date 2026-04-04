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
