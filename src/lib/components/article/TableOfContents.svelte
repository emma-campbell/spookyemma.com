<script lang="ts">
	interface Heading {
		depth: number;
		text: string;
		id: string;
	}

	interface Props {
		headings: Heading[];
	}

	let { headings }: Props = $props();

	// Group headings: h2 are top-level, h3 become sub-items of their preceding h2
	interface TocItem {
		text: string;
		id: string;
		children: Array<{ text: string; id: string }>;
	}

	const tocItems = $derived.by(() => {
		if (headings.length === 0) return [];
		const minDepth = Math.min(...headings.map((h) => h.depth));
		const items: TocItem[] = [];
		for (const h of headings) {
			if (h.depth === minDepth) {
				items.push({ text: h.text, id: h.id, children: [] });
			} else if (h.depth === minDepth + 1 && items.length > 0) {
				items[items.length - 1].children.push({ text: h.text, id: h.id });
			}
		}
		return items;
	});
</script>

{#if headings.length > 0}
	<details class="collapsible" open>
		<summary>Table of Contents</summary>
		<div class="collapsible-body">
			<ol class="toc-list">
				{#each tocItems as item}
					<li>
						<a href="#{item.id}">{item.text}</a>
						{#if item.children.length > 0}
							<ol class="toc-list sub">
								{#each item.children as child}
									<li><a href="#{child.id}">{child.text}</a></li>
								{/each}
							</ol>
						{/if}
					</li>
				{/each}
			</ol>
		</div>
	</details>
{/if}
