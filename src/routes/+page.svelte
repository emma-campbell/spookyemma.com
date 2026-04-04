<script lang="ts">
	import { format } from 'date-fns';
	import { PageShell } from '$lib/components';
	import { ENTRY_TYPES, SECTION_ORDER } from '$lib/content';

	let { data } = $props();

	const tagPills = SECTION_ORDER.map((key) => {
		const cfg = ENTRY_TYPES[key];
		const colorName = cfg.color.replace('var(--', '').replace(')', '');
		return { label: `${cfg.icon} ${cfg.label}`, cls: `tag-${colorName}` };
	});
</script>

<svelte:head>
	<title>Emma Campbell</title>
	<meta name="description" content="Personal website of Emma Campbell. Software, experiments, notes, and the occult mundane." />
</svelte:head>

<PageShell>
	<!-- Hero -->
	<div class="section-row hero-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--muted)">&#8756; index &#8756;</span>
		</div>
		<div class="row-content" style="padding-top:3.5rem;padding-bottom:3rem;">
			<p class="hero-eyebrow">personal index &middot; est. 2022</p>
			<h1 class="hero-title">the<em>occult<br>mundane</em></h1>
			<p class="hero-desc">
				This is the personal website of <a href="/about">Emma</a>.
				I write about software, self-experiments, and things that haunt me.
			</p>
			<div class="tag-row">
				{#each tagPills as pill}
					<span class="tag {pill.cls}">{pill.label}</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Sections -->
	{#each data.sections as section}
		<div class="section-row">
			<div class="row-label">
				<span class="row-label-text" style:color={section.color}>
					{section.label.toLowerCase()}<span class="row-label-num">{section.sectionNum}</span>
				</span>
			</div>
			<div class="row-content">
				<div class="content-header">
					<span class="ch-glyph" style:color={section.color}>{section.icon}</span>
					<span class="ch-title">{section.label}</span>
					<span class="ch-count">{section.posts.length} {section.posts.length === 1 ? 'entry' : 'entries'}</span>
				</div>
				<ul class="post-list">
					{#each section.posts as post}
						<li class="post-item">
							<span class="post-icon" style:color={section.color}>{section.icon}</span>
							<a class="post-link" href="/notebook/{post.slug}">{post.title}</a>
							{#each post.tags as tag}
								<span class="post-badge badge-{section.badgeCls}">{tag}</span>
							{/each}
							<span class="post-meta">{format(new Date(post.published), 'yyyy-MM-dd')}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</PageShell>

<style>
	.hero-row .row-label {
		align-items: flex-end;
		padding-bottom: 3rem;
	}
</style>
