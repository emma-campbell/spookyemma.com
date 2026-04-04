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

<style>
.cv-entry { padding-bottom: 2.5rem; margin-bottom: 2.5rem; border-bottom: 1px solid rgba(196,169,106,0.12); position: relative; }
.cv-entry:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

.cv-entry-active::before {
	content: '';
	position: absolute;
	left: calc(-1.75rem - 4px);
	top: 0.35rem;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: var(--amber);
	box-shadow: 0 0 0 3px rgba(232,168,48,0.2);
}
.cv-entry-past::before {
	content: '';
	position: absolute;
	left: calc(-1.75rem - 4px);
	top: 0.35rem;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	border: 1px solid var(--muted);
	background: var(--ink);
}

.cv-role { font-family: var(--font-display); font-style: italic; font-weight: 700; font-size: 1rem; color: var(--parchment); margin-bottom: 0.25rem; }
.cv-org-line { font-size: 0.72rem; color: var(--muted); margin-bottom: 0.9rem; display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; }
.cv-org { color: var(--amber); }
.cv-dates { font-size: 0.65rem; color: var(--muted); font-variant-numeric: tabular-nums; letter-spacing: 0.04em; }
.cv-dates .current { color: var(--sage); }

.cv-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; padding-left: 0.75rem; }
.cv-bullets li { font-size: 0.82rem; color: var(--parchment); line-height: 1.75; position: relative; padding-left: 1rem; }
.cv-bullets li::before { content: '–'; position: absolute; left: 0; color: var(--amber); }

.cv-tech {
	display: inline-block;
	font-size: 0.62rem;
	letter-spacing: 0.06em;
	color: var(--muted);
	background: rgba(155,142,196,0.1);
	border: 1px solid rgba(155,142,196,0.2);
	padding: 1px 5px;
	border-radius: 2px;
	margin-left: 0.3rem;
	vertical-align: middle;
	white-space: nowrap;
}
</style>
