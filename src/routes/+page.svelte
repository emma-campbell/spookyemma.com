<script lang="ts">
	import { format } from 'date-fns';

	let { data } = $props();
</script>

<div class="intro">
	<p>
		This is the personal website of <a href="/about">Emma</a>.
		I write about software, the occult mundane, self-experiments, and things that haunt me.
		Content is organized below by topic; for recent additions see the
		<a href="/changelog">changelog</a>.
	</p>
</div>

<div class="toc">
	{#each data.sections as section, i}
		<a href="#{section.id}">{section.label}</a>
		{#if i < data.sections.length - 1}
			<span class="toc-sep">&middot;</span>
		{/if}
	{/each}
	<span class="toc-sep">&middot;</span>
	<a href="#pages">Pages</a>
</div>

{#each data.sections as section}
	<details class="section" id={section.id} open>
		<summary class="section-header">
			<h2>{section.label}</h2>
			<span class="section-count">{section.posts.length}</span>
			<span class="section-toggle"></span>
		</summary>
		<div class="section-body">
			<ul class="link-list">
				{#each section.posts as post}
					<li>
						<span class="link-icon">{section.icon}</span>
						<a href="/notebook/{post.slug}">{post.title}</a>
						{#if post.tags.length > 0}
							{#each post.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						{/if}
						<span class="link-date">{format(new Date(post.published), 'yyyy-MM-dd')}</span>
					</li>
				{/each}
			</ul>
		</div>
	</details>
{/each}

<details class="section" id="pages" open>
	<summary class="section-header">
		<h2>Pages</h2>
		<span class="section-count">{data.pages.length}</span>
		<span class="section-toggle"></span>
	</summary>
	<div class="section-body">
		<ul class="link-list">
			{#each data.pages as pg}
				<li>
					<span class="link-icon">○</span>
					<a href={pg.href}>{pg.label}</a>
				</li>
			{/each}
		</ul>
	</div>
</details>

<style>
	.intro {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border);
	}

	.intro p {
		color: var(--muted-ink);
		max-width: 55ch;
	}

	.intro p a {
		color: var(--text);
		text-decoration: underline;
		text-decoration-color: var(--border);
		text-underline-offset: 3px;
		transition: text-decoration-color 120ms ease;
	}

	.intro p a:hover {
		text-decoration-color: var(--text);
	}

	.toc {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
		margin-bottom: 3rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
		font-size: 0.75rem;
	}

	.toc a {
		color: var(--muted-ink);
		text-decoration: none;
		transition: color 120ms ease;
	}

	.toc a:hover {
		color: var(--text);
	}

	.toc-sep {
		color: var(--border);
		user-select: none;
	}

	.section {
		margin-bottom: 3rem;
	}

	.section-header {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.25rem;
		border-bottom: 1px solid var(--border-subtle);
		cursor: pointer;
		list-style: none;
		user-select: none;
	}

	.section-header::-webkit-details-marker {
		display: none;
	}

	.section-header h2 {
		font-family: 'Geist Mono Variable', ui-monospace, monospace;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text);
	}

	.section-count {
		font-size: 0.65rem;
		color: var(--muted-ink);
		font-weight: 400;
	}

	.section-toggle {
		margin-left: auto;
		font-size: 0.65rem;
		color: var(--muted-ink);
	}

	details[open] .section-toggle::after {
		content: '▾';
	}

	details:not([open]) .section-toggle::after {
		content: '▸';
	}

	.section-body {
		animation: fadeIn 200ms ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.link-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 0;
	}

	.link-list li {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 3px 0;
	}

	.link-list a {
		color: var(--link);
		text-decoration: none;
		transition: color 120ms ease;
		font-size: 0.8125rem;
	}

	.link-list a:hover {
		color: var(--link-hover);
	}

	.link-list a:visited {
		color: var(--link-visited);
	}

	.link-icon {
		font-size: 0.6rem;
		color: var(--muted-ink);
		opacity: 0.5;
		flex-shrink: 0;
		width: 1.2em;
		text-align: center;
	}

	.link-date {
		font-size: 0.65rem;
		color: var(--muted-ink);
		opacity: 0.6;
		margin-left: auto;
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
	}

	.tag {
		display: inline-block;
		font-size: 0.6rem;
		color: var(--tag-text);
		background: var(--tag-bg);
		padding: 1px 6px;
		border-radius: 2px;
		letter-spacing: 0.03em;
	}

	@media (max-width: 768px) {
		.link-date {
			display: none;
		}
	}
</style>
