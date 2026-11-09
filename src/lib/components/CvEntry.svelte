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
			<span class="cv-sep" aria-hidden="true">&middot;</span>
			<span>{location}</span>
		{/if}
		<span class="cv-sep" aria-hidden="true">&middot;</span>
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
	.cv-entry {
		padding-bottom: 2.25rem;
		margin-bottom: 2.25rem;
		border-bottom: 1px solid var(--line);
		position: relative;
	}
	.cv-entry:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.cv-entry::before {
		content: '';
		position: absolute;
		left: calc(-1.75rem - 5px);
		top: 0.55rem;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		border: 2px solid var(--fg-muted);
		background: var(--bg);
	}
	.cv-entry-active::before {
		background: var(--sticker);
		border-color: var(--sticker-edge);
		filter: var(--sticker-shadow);
	}

	.cv-role {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.35rem;
		letter-spacing: -0.015em;
		line-height: 1.25;
		color: var(--fg);
		margin-bottom: 0.2rem;
	}
	.cv-org-line {
		font-size: 0.98rem;
		color: var(--fg-muted);
		margin-bottom: 0.9rem;
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.cv-org {
		color: var(--fg);
		font-weight: 600;
	}
	.cv-sep {
		opacity: 0.5;
	}
	.cv-dates {
		font-variant-numeric: tabular-nums;
	}
	.cv-dates :global(.current) {
		color: var(--type-log);
		font-weight: 600;
	}

	.cv-bullets {
		max-width: 40rem;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.cv-bullets li {
		font-size: 1rem;
		color: var(--fg);
		line-height: 1.65;
		position: relative;
		padding-left: 1.1rem;
	}
	.cv-bullets li::before {
		content: '';
		position: absolute;
		left: 0.15rem;
		top: 0.72em;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--fg-muted);
	}

	.cv-bullets :global(.cv-tech) {
		display: inline-block;
		font-size: 0.8rem;
		color: var(--fg-muted);
		background: var(--bg-raised);
		border: 1px solid var(--line);
		padding: 0 6px;
		border-radius: var(--radius-sm);
		margin-left: 0.3rem;
		white-space: nowrap;
	}

	@media print {
		.cv-entry::before {
			filter: none;
			background: #1a1c2e;
			border-color: #1a1c2e;
		}
	}
</style>
