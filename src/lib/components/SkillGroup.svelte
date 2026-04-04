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
.skill-group-label { font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); margin-bottom: 0.5rem; display: block; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.skill-tag {
	font-size: 0.72rem;
	color: var(--parchment);
	background: rgba(255,255,255,0.04);
	border: 1px solid var(--border);
	padding: 3px 8px;
	border-radius: 2px;
	transition: color 0.15s, border-color 0.15s;
}
.skill-tag:hover { color: var(--amber); border-color: rgba(232,168,48,0.4); }
.skill-tag.highlight { border-color: rgba(232,168,48,0.3); color: var(--amber); background: rgba(232,168,48,0.06); }
</style>
