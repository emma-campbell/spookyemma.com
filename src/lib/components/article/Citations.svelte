<script lang="ts">
	interface Backlink {
		slug: string;
		title: string;
		context: string;
		excerpt: string;
	}

	interface Reference {
		id: string;
		author?: string;
		title: string;
		url?: string;
		context?: string;
	}

	interface Props {
		backlinks?: Backlink[];
		references?: Reference[];
	}

	let { backlinks, references }: Props = $props();
</script>

{#if (backlinks && backlinks.length > 0) || (references && references.length > 0)}
	{#if backlinks && backlinks.length > 0}
		<section class="citations">
			<h3>Cited by</h3>
			<ol class="citation-list">
				{#each backlinks as bl, i}
					<li class="citation-item">
						<span class="citation-marker">[{i + 1}]</span>
						<span class="citation-body">
							<a href="/notebook/{bl.slug}" class="citation-title">{bl.title}</a>
							<span class="citation-context">{bl.context}</span>
							{#if bl.excerpt}
								<span class="citation-excerpt">{bl.excerpt}</span>
							{/if}
						</span>
					</li>
				{/each}
			</ol>
		</section>
	{/if}

	{#if references && references.length > 0}
		<section class="citations">
			<h3>References</h3>
			<ol class="citation-list">
				{#each references as ref}
					<li class="citation-item" id="ref-{ref.id}">
						<span class="citation-marker">[{ref.id}]</span>
						<span class="citation-body">
							{#if ref.author}<span class="citation-author">{ref.author}</span>{/if}
							{#if ref.url}
								<a href={ref.url} target="_blank" rel="noopener noreferrer" class="citation-title">{ref.title}</a>
							{:else}
								<span class="citation-title" style="font-weight:600; color: var(--text);">{ref.title}</span>
							{/if}
							{#if ref.context}
								<span class="citation-context">{ref.context}</span>
							{/if}
						</span>
					</li>
				{/each}
			</ol>
		</section>
	{/if}
{/if}
