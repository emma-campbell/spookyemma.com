<script lang="ts">
	import {
		Topbar,
		Footer,
		Stickers,
		LightSwitch,
		SectionRow,
		ContentHeader,
		PageHeaderRow,
		QuickFacts,
		StatBlock,
		InterestsList,
		SimpleTimeline,
		MarginNote,
		PostTypePill,
		GearList,
		ChangelogEntry,
		MonthStats,
		CvEntry,
		SkillGroup,
		Quote,
		Aside
	} from '#components';
	import {
		Breadcrumb,
		PrevNext,
		MetaBlock,
		EpistemicStatus,
		TagList,
		FeaturesBar,
		ArticleHeader,
		TableOfContents,
		Prose,
		Citations,
		ArticleFooter,
		Sidenote,
		Cite,
		Callout,
		Dropcap,
		Embed,
		HrOrnament,
		CodeBlock
	} from '#components/article';

	// Swatches: daylight hex from DESIGN.md; the night panel re-reads the same
	// custom properties with the lights-off values set on its wrapper.
	const swatches = [
		{ token: '--bg', day: '#cfd6f0', night: '#14182b', name: 'Wall' },
		{ token: '--bg-raised', day: '#dbe0f5', night: '#1c2140', name: 'Raised' },
		{ token: '--fg', day: '#262b52', night: '#e1e5f7', name: 'Ink' },
		{ token: '--fg-muted', day: '#464c7d', night: '#a3aacd', name: 'Muted ink' },
		{ token: '--accent', day: '#4338a8', night: '#b9f58c', name: 'Accent' },
		{ token: '--sticker', day: '#e6f0d4', night: '#b9f58c', name: 'Sticker' },
		{ token: '--panel', day: '#262b52', night: '#0c0f1f', name: 'Code plate' },
		{ token: '--type-making', day: '#5b3a9e', night: '#cbb8ff', name: 'Making' },
		{ token: '--type-thinking', day: '#963866', night: '#ffb1d2', name: 'Thinking' },
		{ token: '--type-log', day: '#2b6844', night: '#9fdcb0', name: 'Log' },
		{ token: '--type-danger', day: '#8f400a', night: '#ffb07a', name: 'Fixed' }
	];

	const headings = [
		{ depth: 2, text: 'Installation', id: 'installation' },
		{ depth: 3, text: 'Install Contentlayer', id: 'install' },
		{ depth: 3, text: 'Wrap your Next config', id: 'wrap' },
		{ depth: 2, text: 'Defining Schemas', id: 'schemas' }
	];
</script>

<svelte:head>
	<title>Design system · SpookyEmma</title>
</svelte:head>

<Topbar />

<div class="lib-page">
	<h1 class="lib-title">Design system</h1>
	<p class="lib-subtitle">
		Glow-in-the-dark stickers on a painted wall. Tokens and components as they ship; DESIGN.md is
		the written version. Dev only.
	</p>

	<!-- Colour -->
	<section class="lib-section">
		<h2 class="lib-section-title">Colour</h2>
		<p class="lib-section-desc">
			Every token has a daylight value and a lights-off value under the same custom property. The
			entry-type colours only mark small things: a word, a pill outline.
		</p>
		<div class="lib-row">
			{#each ['day', 'night'] as theme}
				<div
					class="lib-preview theme-panel"
					class:day={theme === 'day'}
					class:night={theme === 'night'}
				>
					<span class="lib-label">{theme === 'day' ? 'Daylight' : 'Lights off'}</span>
					<ul class="swatches">
						{#each swatches as s}
							<li>
								<span class="chip" style:background="var({s.token})"></span>
								<span class="swatch-name">{s.name}</span>
								<code>{s.token}</code>
								<span class="swatch-hex">{theme === 'day' ? s.day : s.night}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Type -->
	<section class="lib-section">
		<h2 class="lib-section-title">Type</h2>
		<p class="lib-section-desc">
			Bricolage Grotesque for display and headings, Figtree for everything you read, JetBrains Mono
			for code only.
		</p>
		<div class="type-ramp">
			<div>
				<span class="lib-label">Display, home hero</span>
				<p class="hero-title">Emma Campbell</p>
			</div>
			<div>
				<span class="lib-label">Page title</span>
				<p class="page-title">What I use</p>
			</div>
			<div>
				<span class="lib-label">Section heading</span>
				<p class="h2">Installation</p>
			</div>
			<div>
				<span class="lib-label">Subheading</span>
				<p class="h3">Defining Schemas</p>
			</div>
			<div>
				<span class="lib-label">Body, 1.0625rem / 1.75</span>
				<p class="prose">
					Previously, we talked through the choices behind the tech stack used to build my developer
					blog. The step towards building a functional blog is wiring up contentlayer.
				</p>
			</div>
			<div>
				<span class="lib-label">Small, dates and meta</span>
				<p class="post-meta">2022-11-22 · 3 min read</p>
			</div>
			<div>
				<span class="lib-label">Code</span>
				<p><code>yarn add contentlayer next-contentlayer</code></p>
			</div>
		</div>
	</section>

	<!-- Stickers + switch -->
	<section class="lib-section">
		<h2 class="lib-section-title">Stickers and the light switch</h2>
		<p class="lib-section-desc">
			The only things that glow. Flip the switch: the wall goes dark and the stickers charge up over
			about a second and a half, then hold. The margins variant pins a few stickers to the outer
			edges of reading pages and hides below 1200px.
		</p>
		<div class="lib-row">
			<div class="lib-preview">
				<span class="lib-label">Hero cluster</span>
				<Stickers variant="hero" />
			</div>
			<div class="lib-preview">
				<span class="lib-label">Light switch</span>
				<LightSwitch />
			</div>
		</div>
	</section>

	<!-- Code plate -->
	<section class="lib-section">
		<h2 class="lib-section-title">Code plate</h2>
		<p class="lib-section-desc">
			Tokyo Night on a dark plate with a rim and two screws. The dimmest Shiki colours are lifted so
			every token passes 4.5:1.
		</p>
		<CodeBlock filename="next.config.js" lang="js">
			<pre class="shiki"><code
					><span class="line"
						><span style="color:#BB9AF7">import</span><span
							style="color:#C0CAF5"> {'{'} </span><span style="color:#0DB9D7">withContentLayer</span
						><span style="color:#C0CAF5"> {'}'} </span><span style="color:#BB9AF7">from</span><span
							style="color:#9ECE6A"> "next-contentlayer"</span
						><span style="color:#89DDFF">;</span></span
					>
<span class="line"></span>
<span class="line"
						><span style="color:#51597D;font-style:italic"
							>/** @type {"{import('next').NextConfig}"} */</span
						></span
					>
<span class="line"
						><span style="color:#9D7CD8;font-style:italic">const</span><span
							style="color:#C0CAF5"> nextConfig </span><span style="color:#89DDFF">=</span><span
							style="color:#C0CAF5"> {'{'}</span
						></span
					>
<span class="line"
						><span style="color:#73DACA">  reactStrictMode</span><span style="color:#89DDFF">:</span
						><span style="color:#FF9E64"> true</span><span style="color:#89DDFF">,</span></span
					>
<span class="line"
						><span style="color:#C0CAF5">{'}'}</span><span style="color:#89DDFF">;</span></span
					></code
				></pre>
		</CodeBlock>
	</section>

	<!-- Prose -->
	<section class="lib-section">
		<h2 class="lib-section-title">Prose</h2>
		<p class="lib-section-desc">Text below comes from real posts except where marked as sample.</p>
		<div class="lib-preview">
			<div class="prose">
				<Dropcap>
					So, I finally built my first PC. And like any reasonable ADHD person starting a hobby, I
					went way overboard.
				</Dropcap>
				<p>
					Contentlayer is a breeze to use, but in case you're stuck, here is
					<a href="/notebook/blog-content-layer">how I set it up</a>. Inline code looks like
					<code>next-contentlayer</code>. A sample sidenote sits here.<Sidenote id={1}
						>Sample sidenote text.</Sidenote
					> A citation marker looks like this.<Cite ref="1" />
				</p>
				<ul>
					<li>Install Contentlayer</li>
					<li>Wrap your Next config</li>
					<li>Add the generated types to tsconfig.json</li>
				</ul>
				<ol>
					<li>Colors</li>
					<li>Typography</li>
				</ol>
				<blockquote>
					<p>I don't need it. I don't need it. I DON'T NEED IT.</p>
				</blockquote>
				<div class="pull-quote">
					<p>
						The experiment below is based on tips and tricks that have worked for <em>my</em> flavor of
						ADHD.
					</p>
				</div>
				<HrOrnament />
				<div class="table-wrapper">
					<table>
						<thead><tr><th>Entry type</th><th>Entries</th></tr></thead>
						<tbody>
							<tr><td>log</td><td>14</td></tr>
							<tr><td>making</td><td>11</td></tr>
							<tr><td>thinking</td><td>8</td></tr>
						</tbody>
					</table>
				</div>
				<Callout type="note">Sample callout text.</Callout>
				<Callout type="warning">Sample warning text.</Callout>
				<Aside title="Sample aside">Sample aside text.</Aside>
				<Quote cite="Configuring Contentlayer with a Next.js App">
					<p>Contentlayer is a breeze to use.</p>
				</Quote>
			</div>
		</div>
	</section>

	<!-- Layout rows -->
	<section class="lib-section">
		<h2 class="lib-section-title">Page rows</h2>
		<p class="lib-section-desc">
			Static pages are built from a header row and section rows: a quiet label at left, content in
			the middle, an optional aside at right.
		</p>
		<div class="lib-preview">
			<PageHeaderRow
				title="What I use"
				lede="The hardware and software I use daily."
				labelKey="last updated"
				labelValue="2026-04-03"
			>
				{#snippet aside()}
					<QuickFacts
						facts={[
							{ label: 'editor', value: 'Zed' },
							{ label: 'notes', value: 'Obsidian' }
						]}
					/>
				{/snippet}
			</PageHeaderRow>
			<SectionRow label="Workstation">
				<ContentHeader title="Workstation" count="3 items" />
				<GearList
					items={[
						{
							name: 'M4 MacBook Pro (64 GB)',
							category: 'laptop',
							tag: { label: 'daily driver', type: 'fav' }
						},
						{
							name: 'Apple Magic Trackpad',
							note: "Can't go back to a mouse for Mac work.",
							category: 'peripheral'
						},
						{ name: 'CalDigit TS3', note: 'Thunderbolt dock.', category: 'dock' }
					]}
				/>
				{#snippet aside()}
					<MarginNote label="Sample note">Sample margin note text.</MarginNote>
				{/snippet}
			</SectionRow>
			<SectionRow label="Site">
				<StatBlock
					stats={[
						{ num: '33', desc: 'notebook entries' },
						{ num: '17', desc: 'photos' }
					]}
				/>
			</SectionRow>
		</div>
	</section>

	<!-- About + CV -->
	<section class="lib-section">
		<h2 class="lib-section-title">About and CV pieces</h2>
		<div class="lib-row">
			<div class="lib-preview">
				<span class="lib-label">Interests</span>
				<InterestsList
					items={[
						{ text: 'Columbus Crew (season ticket holder)', fav: true },
						{ text: 'Habit experiments' },
						{ text: 'PC building' }
					]}
				/>
			</div>
			<div class="lib-preview">
				<span class="lib-label">Timeline</span>
				<SimpleTimeline
					items={[
						{ date: '2025-03', title: 'Arboretum Lifesciences', color: 'sage' },
						{ date: '2023-03', title: 'Software Engineer II, Hugo Health' },
						{ date: '2021-07', title: 'Software Engineer, Hugo Health' }
					]}
				/>
			</div>
		</div>
		<div class="lib-preview cv-preview">
			<CvEntry
				role="Software Engineer"
				org="Arboretum Lifesciences"
				location="Remote"
				dates="Mar 2025 — <span class='current'>Present</span>"
				current
				bullets={[
					'Led post-acquisition maintenance and technical sunset of Hugo Health legacy applications',
					"Engineered patient-authorized FHIR data ingestion <span class='cv-tech'>Java Spring Boot</span>"
				]}
			/>
			<SkillGroup
				label="Languages and frameworks"
				skills={[
					{ name: 'TypeScript', highlight: true },
					{ name: 'Python', highlight: true },
					{ name: 'ExpressJS' }
				]}
			/>
		</div>
	</section>

	<!-- Entry types + changelog -->
	<section class="lib-section">
		<h2 class="lib-section-title">Entry types and changelog</h2>
		<div class="lib-row">
			<div class="lib-preview">
				<span class="lib-label">Entry type pills</span>
				<div class="tag-row">
					<PostTypePill type="making" />
					<PostTypePill type="thinking" />
					<PostTypePill type="log" />
				</div>
			</div>
			<div class="lib-preview">
				<span class="lib-label">Month stats</span>
				<MonthStats added={2} changed={6} fixed={3} meta={1} />
			</div>
		</div>
		<div class="lib-preview">
			<ChangelogEntry
				entries={[
					{
						date: 'Nov 9',
						type: 'added',
						desc: 'Light switch in the top bar toggles the theme'
					},
					{
						date: 'Nov 9',
						type: 'fixed',
						desc: 'Dates no longer show a day early'
					},
					{
						date: 'Nov 9',
						type: 'meta',
						desc: 'Layout v6, glow-in-the-dark redesign'
					}
				]}
			/>
		</div>
	</section>

	<!-- Article parts -->
	<section class="lib-section">
		<h2 class="lib-section-title">Article parts</h2>
		<p class="lib-section-desc">
			Article components from <code>#components/article</code>. The live post page sets its own
			header; these remain for MDX content.
		</p>
		<div class="lib-preview">
			<Breadcrumb
				segments={[
					{ label: 'notebook', href: '/notebook' },
					{ label: 'Configuring Contentlayer with a Next.js App' }
				]}
			/>
			<ArticleHeader
				title="Configuring Contentlayer with a Next.js App"
				published="2022-11-22"
				status="likely"
				tags={['nextjs', 'contentlayer']}
				wordCount={640}
				readingTime="~3 min"
			/>
		</div>
		<div class="lib-row">
			<div class="lib-preview">
				<span class="lib-label">Meta block</span>
				<MetaBlock published="2022-11-22" status="certain" />
			</div>
			<div class="lib-preview">
				<span class="lib-label">Status, tags, features</span>
				<p><EpistemicStatus level="speculative" /></p>
				<TagList tags={['rewind', 'personal']} />
				<FeaturesBar features={['Sample feature', 'Sample feature']} />
			</div>
		</div>
		<div class="lib-preview">
			<TableOfContents {headings} />
			<Prose html="<p>Sample prose rendered from an HTML string.</p>" />
			<Embed placeholder="Sample embed" />
			<Citations
				references={[
					{
						id: '1',
						title: 'Contentlayer: Getting started',
						url: 'https://www.contentlayer.dev/docs/getting-started'
					}
				]}
			/>
			<PrevNext
				prev={{
					slug: 'blog-next-js',
					title: 'Building a Content Driven Blog with Next.js and Typescript'
				}}
				next={{ slug: 'blog-metrics', title: 'Adding Metrics to a Next.js Blog Post' }}
			/>
			<ArticleFooter />
		</div>
	</section>
</div>

<Footer />

<style>
	/* Each swatch panel pins its own theme's values, whatever the page theme is */
	.day {
		--bg: #cfd6f0;
		--bg-raised: #dbe0f5;
		--fg: #262b52;
		--fg-muted: #464c7d;
		--accent: #4338a8;
		--line: rgba(38, 43, 82, 0.16);
		--line-strong: rgba(38, 43, 82, 0.34);
		--sticker: #e6f0d4;
		--panel: #262b52;
		--type-making: #5b3a9e;
		--type-thinking: #963866;
		--type-log: #2b6844;
		--type-danger: #8f400a;
	}
	.night {
		--bg: #14182b;
		--bg-raised: #1c2140;
		--fg: #e1e5f7;
		--fg-muted: #a3aacd;
		--accent: #b9f58c;
		--line: rgba(225, 229, 247, 0.12);
		--line-strong: rgba(225, 229, 247, 0.26);
		--sticker: #b9f58c;
		--panel: #0c0f1f;
		--type-making: #cbb8ff;
		--type-thinking: #ffb1d2;
		--type-log: #9fdcb0;
		--type-danger: #ffb07a;
		background: var(--bg);
		color: var(--fg);
	}
	.theme-panel {
		background: var(--bg);
		color: var(--fg);
	}

	.swatches {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.swatches li {
		display: grid;
		grid-template-columns: 2.25rem 1fr auto;
		grid-template-rows: auto auto;
		column-gap: 0.75rem;
		align-items: center;
	}
	.chip {
		grid-row: 1 / 3;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--line-strong);
	}
	.swatch-name {
		font-weight: 650;
	}
	.swatches code {
		grid-column: 2;
		font-size: 0.8rem;
		justify-self: start;
	}
	.swatch-hex {
		grid-column: 3;
		grid-row: 1 / 3;
		font-size: 0.88rem;
		color: var(--fg-muted);
		font-variant-numeric: tabular-nums;
	}

	.lib-subtitle,
	.lib-section-desc {
		max-width: var(--measure);
	}

	.type-ramp {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.type-ramp p {
		margin: 0;
	}

	.cv-preview {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-left: 3rem;
	}
</style>
