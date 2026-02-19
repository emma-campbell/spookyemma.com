<script lang="ts">
	import {
		Breadcrumb,
		ArticleHeader,
		TableOfContents,
		Prose,
		MetaBlock,
		EpistemicStatus,
		TagList,
		FeaturesBar,
		PrevNext,
		Citations,
		ArticleFooter,
		Callout,
		Dropcap,
		Sidenote,
		Cite,
		Embed
	} from '$lib/components/article';
	import { PostType } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const sampleBacklinks = [
		{
			slug: 'arboretum',
			title: 'Arboretum',
			context: 'Projects, 2024–present',
			excerpt: '"…the legacy Spring Boot monolith that became the subject of § Haunted Infrastructure…"'
		},
		{
			slug: 'tombstone-pattern',
			title: 'The Tombstone Pattern',
			context: 'Blog · § Dead Code, 2026-01-20',
			excerpt: '"…the tombstone approach described in Haunted Infrastructure proved essential during…"'
		}
	];

	const sampleReferences = [
		{
			id: 'brand-1994',
			author: 'Brand, S.',
			title: 'How Buildings Learn: What Happens After They\'re Built',
			context: 'Viking Press, 1994. ISBN 0-670-83515-3.'
		},
		{
			id: 'spolsky-2000',
			author: 'Spolsky, J.',
			title: 'Things You Should Never Do, Part I',
			url: '#',
			context: 'Joel on Software, 2000-04-06.'
		}
	];
</script>

<svelte:head>
	<title>Component Library · Emma Campbell</title>
</svelte:head>

<div>
	<h1 class="page-title">Component Library</h1>
	<p class="page-subtitle" style="margin-top: var(--space-sm);">Every element a markdown page can render. 19 component groups.</p>

	<!-- ═══════════════════════════════════════════════════
	     1. TYPOGRAPHY
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">01 · Typography</div>
		<div class="lib-section-desc">Logo, headings, body text, dropcap. All set in Geist Mono except the logo (Jacques Francois Shadow).</div>

		<div class="lib-component">
			<div class="lib-component-label">Page Title + Subtitle</div>
			<div class="lib-component-body">
				<h1 class="page-title">Haunted Infrastructure: On Legacy Systems</h1>
				<p class="page-subtitle" style="margin-top: var(--space-sm);">Every codebase has ghosts. The question is whether you're living with them or being haunted by them.</p>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Section Header (index pages)</div>
			<div class="lib-component-body">
				<div class="section-header">
					<span>✦ Blog</span>
					<span class="section-count">12 entries</span>
				</div>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">H2 + H3 (prose headings)</div>
			<div class="lib-component-body">
				<h2 class="h2">Archaeology, Not Demolition <a href="#demo" class="anchor">§</a></h2>
				<h3 class="h3">Git Blame as Séance</h3>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Dropcap</div>
			<div class="lib-component-body">
				<p class="dropcap prose" style="max-width: 50ch;">There is a particular feeling you get when you open a codebase for the first time and realize that it is older than your career. Not old in the way that a well-maintained cathedral is old—dignified, intentional, load-bearing—but old in the way that a house is old.</p>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     2. NAVIGATION
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">02 · Navigation</div>
		<div class="lib-section-desc">Breadcrumbs, horizontal TOC, prev/next links.</div>

		<div class="lib-component">
			<div class="lib-component-label">Breadcrumb</div>
			<div class="lib-component-body">
				<Breadcrumb segments={[
					{ label: 'Index', href: '/' },
					{ label: 'Blog', href: '/notebook' },
					{ label: 'Haunted Infrastructure' }
				]} />
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Prev / Next</div>
			<div class="lib-component-body">
				<PrevNext
					prev={{ slug: 'on-naming-things', title: 'On Naming Things' }}
					next={{ slug: 'tombstone-pattern', title: 'The Tombstone Pattern' }}
				/>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     3. METADATA
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">03 · Metadata</div>
		<div class="lib-section-desc">Article metadata, epistemic status, tags, features bar.</div>

		<div class="lib-component">
			<div class="lib-component-label">Meta Block</div>
			<div class="lib-component-body">
				<MetaBlock
					published="2026-02-15"
					updated="2026-02-18"
					status="likely"
					tags={['software', 'architecture', 'legacy']}
					wordCount={2400}
					readingTime="~10 min"
				/>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Epistemic Status Badges</div>
			<div class="lib-component-body">
				<div class="lib-row">
					<EpistemicStatus level="certain" />
					<EpistemicStatus level="likely" />
					<EpistemicStatus level="speculative" />
					<EpistemicStatus level="uncertain" />
				</div>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Tags</div>
			<div class="lib-component-body">
				<TagList tags={['software', 'architecture', 'legacy', 'spring-boot', 'java']} />
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Features Bar</div>
			<div class="lib-component-body">
				<FeaturesBar features={['◐ dark mode', '⟨/⟩ markdown source', '⊘ no tracking', '◉ RSS', 'CC BY-SA']} />
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Post Type Badges</div>
			<div class="lib-component-body">
				<div class="lib-row">
					<PostType type="note" />
					<PostType type="essay" />
					<PostType type="how-to" />
					<PostType type="micro" />
					<PostType type="experiment" />
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     4. LINK LISTS
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">04 · Link Lists</div>
		<div class="lib-section-desc">Index-page directory entries with icons, dates, and new indicators.</div>

		<div class="lib-component">
			<div class="lib-component-label">Directory Link List</div>
			<div class="lib-component-body">
				<ul class="link-list">
					<li><span class="link-icon">✦</span> <a href="#">Haunted Infrastructure: On Legacy Systems</a> <span class="new-indicator">★ new</span> <span class="link-date">2026-02-15</span></li>
					<li><span class="link-icon">✦</span> <a href="#">On Naming Things (And Why Most Names Are Lies)</a> <span class="link-date">2026-01-28</span></li>
					<li><span class="link-icon">⚗</span> <a href="#">Speculative CSS: Generating Layouts with LLMs</a> <span class="link-date">2026-01-14</span></li>
					<li><span class="link-icon">◈</span> <a href="#">Arboretum</a> — the legacy Spring Boot monolith <span class="link-date">2024–present</span></li>
				</ul>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     5. PROSE ELEMENTS
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">05 · Prose Elements</div>
		<div class="lib-section-desc">Body text, blockquotes, inline code, code blocks — everything markdown renders into.</div>

		<div class="lib-component">
			<div class="lib-component-label">Body Paragraph</div>
			<div class="lib-component-body">
				<div class="prose">
					<p>The word "legacy" in software carries a particular valence. It does not mean <em>old</em>. Plenty of old systems are fine — <code class="code-inline">grep</code> is old, <code class="code-inline">make</code> is old, TCP is old. What makes a system "legacy" is not age but the accumulation of <strong>implicit knowledge</strong> that has been lost.</p>
				</div>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Blockquote</div>
			<div class="lib-component-body">
				<blockquote class="blockquote">
					The major difference between a thing that might go wrong and a thing that cannot possibly go wrong is that when a thing that cannot possibly go wrong goes wrong it usually turns out to be impossible to get at or repair.
					<cite>Douglas Adams, <em>Mostly Harmless</em></cite>
				</blockquote>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Rendered Prose (from markdown)</div>
			<div class="lib-component-body">
				<Prose html={data.proseHtml} />
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Ordered &amp; Unordered Lists</div>
			<div class="lib-component-body">
				<div class="lib-row">
					<div>
						<ul class="prose-list">
							<li>Patient archaeology over rewrites</li>
							<li>Document what you discover</li>
							<li>Leave better breadcrumbs</li>
						</ul>
					</div>
					<div>
						<ol class="prose-list">
							<li>Run <code class="code-inline">git log</code> on the file</li>
							<li>Read the surrounding Jira tickets</li>
							<li>Mark suspected dead code with a tombstone</li>
						</ol>
					</div>
				</div>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Horizontal Rule</div>
			<div class="lib-component-body">
				<hr class="hr">
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Keyboard Shortcuts</div>
			<div class="lib-component-body" style="font-size: 0.78rem; color: var(--text-secondary);">
				Toggle theme: <kbd class="kbd">⌘</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">D</kbd>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     6. TABLE
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">06 · Table</div>
		<div class="lib-section-desc">Markdown tables rendered as data grids with tabular-nums alignment.</div>

		<div class="lib-component">
			<div class="lib-component-label">Data Table</div>
			<div class="lib-component-body">
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Metric</th>
								<th class="num">Before</th>
								<th class="num">After</th>
								<th class="num">Change</th>
							</tr>
						</thead>
						<tbody>
							<tr><td>Bean count</td><td class="num">~400</td><td class="num">~240</td><td class="num highlight">−40%</td></tr>
							<tr><td>Startup time</td><td class="num">45s</td><td class="num">18s</td><td class="num highlight">−60%</td></tr>
							<tr><td>Test suite</td><td class="num">12 min</td><td class="num">4 min</td><td class="num highlight">−67%</td></tr>
							<tr><td>Dead code removed</td><td class="num">—</td><td class="num">~22k lines</td><td class="num">—</td></tr>
							<tr><td>Production incidents</td><td class="num">3/mo</td><td class="num">1/mo</td><td class="num highlight">−67%</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     7. SIDENOTES
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">07 · Sidenotes</div>
		<div class="lib-section-desc">Tufte-style margin notes. Superscript reference in flow, note content in the gutter.</div>

		<div class="lib-component">
			<div class="lib-component-label">Sidenote Reference + Note</div>
			<div class="lib-component-body">
				<div class="lib-row" style="gap: var(--space-xl);">
					<div class="prose" style="flex: 1; max-width: 40ch;">
						<p>I first encountered this metaphor in Stewart Brand's <em>How Buildings Learn</em><sup class="sidenote-ref"><a href="#sn-1">1</a></sup>, though he was talking about actual buildings.</p>
					</div>
					<aside class="sidenote" style="flex: 0 0 auto;">
						<span class="sidenote-number">1.</span> Brand's taxonomy of building layers — site, structure, skin, services, space plan, stuff — maps remarkably well onto software architecture.
					</aside>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     8. CITATIONS
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">08 · Citations</div>
		<div class="lib-section-desc">Academic-style backlinks ("Cited by") and outbound references. Backlinks are auto-generated at build time.</div>

		<div class="lib-component">
			<div class="lib-component-label">Inline Cite Reference</div>
			<div class="lib-component-body">
				<div class="prose">
					<p>…for reasons that have been well-documented elsewhere<Cite ref="spolsky-2000" />.</p>
				</div>
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Cited By (backlinks) + References (outbound)</div>
			<div class="lib-component-body">
				<Citations
					backlinks={sampleBacklinks}
					references={sampleReferences}
				/>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     9. COLLAPSIBLE
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">09 · Collapsible Sections</div>
		<div class="lib-section-desc">For TOC, long content sections, and homepage directory groups. All use native &lt;details&gt;.</div>

		<div class="lib-component">
			<div class="lib-component-label">Table of Contents</div>
			<div class="lib-component-body">
				<TableOfContents headings={[
					{ depth: 2, text: 'The Haunting', id: 'the-haunting' },
					{ depth: 2, text: 'Archaeology, Not Demolition', id: 'archaeology' },
					{ depth: 3, text: 'Git Blame as Séance', id: 'git-blame' },
					{ depth: 3, text: 'Dead Code, Living Fear', id: 'dead-code' },
					{ depth: 2, text: 'A Spring Boot Case Study', id: 'case-study' },
					{ depth: 2, text: 'Learning to Cohabitate', id: 'cohabitate' },
					{ depth: 2, text: 'Conclusion', id: 'conclusion' }
				]} />
			</div>
		</div>

		<div class="lib-component">
			<div class="lib-component-label">Collapsible Section (homepage)</div>
			<div class="lib-component-body">
				<details class="collapsible">
					<summary>Reading Log — 8 entries</summary>
					<div class="collapsible-body">
						<ul class="link-list">
							<li><span class="link-icon">📖</span> <a href="#">How Buildings Learn</a> — Stewart Brand <span class="link-date">★★★★★</span></li>
							<li><span class="link-icon">📖</span> <a href="#">A Pattern Language</a> — Christopher Alexander <span class="link-date">★★★★☆</span></li>
						</ul>
					</div>
				</details>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     10. FIGURE / IMAGE
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">10 · Figures &amp; Images</div>
		<div class="lib-section-desc">Images with captions. Uses native figure/figcaption for semantics.</div>

		<div class="lib-component">
			<div class="lib-component-label">Figure with Caption</div>
			<div class="lib-component-body">
				<figure class="figure" style="max-width: 500px;">
					<div class="img-placeholder">[ image: bean dependency graph — 400 nodes ]</div>
					<figcaption>Fig. 1 — The Spring application context as a directed graph. Red nodes indicate beans with no active consumers.</figcaption>
				</figure>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     11. CALLOUTS
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">11 · Callouts</div>
		<div class="lib-section-desc">Admonition blocks for notes, warnings, and danger notices.</div>

		<div class="lib-component">
			<div class="lib-component-label">Note / Warning / Danger</div>
			<div class="lib-component-body">
				{#snippet noteContent()}
					This section describes behavior specific to Spring Boot 2.x. Spring Boot 3 changed the classpath scanning defaults.
				{/snippet}
				{#snippet warningContent()}
					Removing beans from a Spring context can cause silent failures if other beans depend on them via <code class="code-inline">@Autowired</code> with <code class="code-inline">required = false</code>.
				{/snippet}
				{#snippet dangerContent()}
					Never remove a <code class="code-inline">@Scheduled</code> bean without first verifying it has no side effects in production. The tombstone pattern exists for a reason.
				{/snippet}
				<Callout type="note">{@render noteContent()}</Callout>
				<Callout type="warning">{@render warningContent()}</Callout>
				<Callout type="danger">{@render dangerContent()}</Callout>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     12. DEFINITION LIST
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">12 · Definition List</div>
		<div class="lib-section-desc">For glossaries, /uses page entries, and anywhere with term → definition pairs.</div>

		<div class="lib-component">
			<div class="lib-component-label">Definition List</div>
			<div class="lib-component-body">
				<dl class="def-list" style="max-width: 50ch;">
					<dt>Tombstone Pattern</dt>
					<dd>A practice of marking suspected dead code with a dated comment before removing it, allowing a grace period to detect breakage.</dd>
					<dt>Load-bearing sleep()</dt>
					<dd>A timing hack that masks a race condition. Removing it causes downstream failures days later in production.</dd>
					<dt>Ghost Bean</dt>
					<dd>A Spring bean that has no explicit consumers but is still instantiated via classpath scanning or reflection.</dd>
				</dl>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     13. FOOTNOTES
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">13 · Footnotes (fallback)</div>
		<div class="lib-section-desc">Bottom-of-page footnote list. Used as a mobile fallback when sidenotes can't render in the margin.</div>

		<div class="lib-component">
			<div class="lib-component-label">Footnote List</div>
			<div class="lib-component-body">
				<div class="footnote-list">
					<h4>Notes</h4>
					<ol>
						<li>Brand's taxonomy of building layers — site, structure, skin, services, space plan, stuff — maps remarkably well onto software architecture.</li>
						<li>The classic version of this is the "load-bearing <code class="code-inline">sleep(500)</code>" — a timing hack that masks a race condition.</li>
					</ol>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     14. THEME TOGGLE
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">14 · Theme Toggle</div>
		<div class="lib-section-desc">Light/dark mode switch. Uses data-theme attribute on &lt;html&gt;.</div>

		<div class="lib-component">
			<div class="lib-component-label">Toggle Button</div>
			<div class="lib-component-body">
				<button class="theme-toggle" onclick={() => {
					const html = document.documentElement;
					html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
				}}>◐ theme</button>
				<p class="lib-note">Swaps all CSS variables via [data-theme] selector. No flash on load with a &lt;script&gt; in &lt;head&gt;.</p>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     15. MATH BLOCK
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">15 · Math Block</div>
		<div class="lib-section-desc">For KaTeX-rendered equations. Placeholder styling before KaTeX loads.</div>

		<div class="lib-component">
			<div class="lib-component-label">Display Math</div>
			<div class="lib-component-body">
				<div class="math-block">
					P(haunt | code_age, author_departed) = 1 − e<sup>−λt</sup>
				</div>
				<p class="lib-note">In production this renders via KaTeX from $$ delimiters in markdown. The container styling stays the same.</p>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     16. EMBED
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">16 · Embed</div>
		<div class="lib-section-desc">For iframes, videos, CodePen embeds, etc. Responsive 16:9 container.</div>

		<div class="lib-component">
			<div class="lib-component-label">Embed Container</div>
			<div class="lib-component-body">
				<div class="embed" style="max-width: 500px;">
					[ iframe: interactive bean dependency visualizer ]
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     17. ARTICLE HEADER (composed)
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">17 · Article Header (composed)</div>
		<div class="lib-section-desc">The full article header composing page-title + subtitle + meta-block.</div>

		<div class="lib-component">
			<div class="lib-component-label">ArticleHeader</div>
			<div class="lib-component-body">
				<ArticleHeader
					title="Haunted Infrastructure: On Legacy Systems"
					description="Every codebase has ghosts. The question is whether you're living with them or being haunted by them."
					published="2026-02-15"
					updated="2026-02-18"
					status="likely"
					entry="essay"
					tags={['software', 'architecture', 'legacy']}
					wordCount={2400}
					readingTime="~10 min"
				/>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     18. ARTICLE FOOTER (composed)
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section">
		<div class="lib-section-title">18 · Article Footer (composed)</div>
		<div class="lib-section-desc">Citations + prev/next navigation composed together.</div>

		<div class="lib-component">
			<div class="lib-component-label">ArticleFooter</div>
			<div class="lib-component-body">
				<ArticleFooter
					prevPost={{ slug: 'on-naming-things', title: 'On Naming Things' }}
					nextPost={{ slug: 'tombstone-pattern', title: 'The Tombstone Pattern' }}
					backlinks={sampleBacklinks}
					references={sampleReferences}
				/>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════
	     COMPONENT INDEX
	     ═══════════════════════════════════════════════════ -->
	<div class="lib-section" style="padding-bottom: var(--space-2xl);">
		<div class="lib-section-title">Component Index</div>
		<div class="lib-section-desc">Quick reference for the mdsvex import map — which Svelte component renders which markdown pattern.</div>

		<div class="lib-component">
			<div class="lib-component-label">Svelte Component → Markdown Mapping</div>
			<div class="lib-component-body">
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Component</th>
								<th>Triggers From</th>
								<th>Props / Config</th>
							</tr>
						</thead>
						<tbody>
							<tr><td><code class="code-inline">Dropcap</code></td><td>Manual wrap on first &lt;p&gt;</td><td>—</td></tr>
							<tr><td><code class="code-inline">Sidenote</code></td><td><code class="code-inline">&lt;Sidenote id=&#123;n&#125;&gt;</code></td><td>id, side</td></tr>
							<tr><td><code class="code-inline">Cite</code></td><td><code class="code-inline">&lt;Cite ref="id" /&gt;</code></td><td>ref</td></tr>
							<tr><td><code class="code-inline">Citations</code></td><td>Auto via BlogPost layout</td><td>references, backlinks</td></tr>
							<tr><td><code class="code-inline">Callout</code></td><td><code class="code-inline">&gt; [!note]</code> blockquote syntax</td><td>type: note | warning | danger</td></tr>
							<tr><td><code class="code-inline">Figure</code></td><td><code class="code-inline">![alt](src "caption")</code></td><td>src, alt, caption</td></tr>
							<tr><td><code class="code-inline">CodeBlock</code></td><td>Fenced <code class="code-inline">```lang</code></td><td>lang, filename</td></tr>
							<tr><td><code class="code-inline">MathBlock</code></td><td><code class="code-inline">$$...$$</code></td><td>expression</td></tr>
							<tr><td><code class="code-inline">Embed</code></td><td><code class="code-inline">&lt;Embed url="..." /&gt;</code></td><td>url, aspect</td></tr>
							<tr><td><code class="code-inline">TableOfContents</code></td><td>Auto from headings</td><td>headings[], open</td></tr>
							<tr><td><code class="code-inline">MetaBlock</code></td><td>Auto from frontmatter</td><td>All frontmatter fields</td></tr>
							<tr><td><code class="code-inline">Breadcrumb</code></td><td>Auto from route</td><td>segments[]</td></tr>
							<tr><td><code class="code-inline">PrevNext</code></td><td>Auto from post order</td><td>prev, next</td></tr>
							<tr><td><code class="code-inline">ThemeToggle</code></td><td>Layout shell</td><td>—</td></tr>
							<tr><td><code class="code-inline">SidebarNav</code></td><td>Layout shell</td><td>items[], current</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
