<script lang="ts">
	import { Breadcrumb } from '$lib/components/article';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDateRange(start?: string, end?: string): string | null {
		if (!start) return null;
		const fmt = (s: string) => {
			if (s === 'present') return 'Present';
			const [year, month] = s.split('-');
			const date = new Date(Number(year), Number(month) - 1);
			return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
		};
		return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`;
	}
</script>

<svelte:head>
	<title>CV · Emma Campbell</title>
	<meta name="description" content="Professional experience, education, and skills." />
</svelte:head>

<article>
	<Breadcrumb segments={[
		{ label: 'Index', href: '/' },
		{ label: 'CV' }
	]} />

	<header class="cv-header">
		<h1 class="page-title">{data.title}</h1>
		{#if data.subtitle}
			<p class="page-subtitle">{data.subtitle}</p>
		{/if}
		{#if data.lastUpdated}
			<p class="cv-updated">Last updated {data.lastUpdated}</p>
		{/if}
	</header>

	{#each data.sections as section}
		<section class="cv-section">
			<h2 class="cv-section-heading">{section.heading}</h2>

			{#if section.heading === 'Experience'}
				<ol class="cv-timeline">
					{#each section.entries as entry, index}
						{@const isFirst = index === 0}
						<li class="cv-timeline-item">
							<div class="cv-timeline-content">
								<div class="cv-timeline-line"></div>
								<div class="cv-timeline-dot" class:cv-timeline-dot--active={isFirst}>
									{#if isFirst}
										<span class="cv-timeline-ping"></span>
										<span class="cv-timeline-ping cv-timeline-ping--delayed"></span>
									{/if}
								</div>

								<h3 class="cv-entry-role">{entry.role}</h3>
								{#if entry.organization || entry.location || formatDateRange(entry.start, entry.end)}
									<p class="cv-entry-org">
										{#if entry.organization}{entry.organization}{/if}
										{#if entry.organization && entry.location} · {/if}
										{#if entry.location}{entry.location}{/if}
										{#if (entry.organization || entry.location) && formatDateRange(entry.start, entry.end)} · {/if}
										{#if formatDateRange(entry.start, entry.end)}
											<span class="cv-entry-dates">{formatDateRange(entry.start, entry.end)}</span>
										{/if}
									</p>
								{/if}
								{#if entry.descriptionHtml}
									<div class="prose cv-entry-body">
										{@html entry.descriptionHtml}
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</ol>
			{:else}
				{#each section.entries as entry}
					<div class="cv-entry">
						<div class="cv-entry-header">
							<h3 class="cv-entry-role">{entry.role}</h3>
							{#if entry.organization || entry.location}
								<p class="cv-entry-org">
									{#if entry.organization}{entry.organization}{/if}
									{#if entry.organization && entry.location} · {/if}
									{#if entry.location}{entry.location}{/if}
								</p>
							{/if}
							{#if formatDateRange(entry.start, entry.end)}
								<p class="cv-entry-dates">{formatDateRange(entry.start, entry.end)}</p>
							{/if}
						</div>
						{#if entry.descriptionHtml}
							<div class="prose cv-entry-body">
								{@html entry.descriptionHtml}
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</section>
	{/each}
</article>
