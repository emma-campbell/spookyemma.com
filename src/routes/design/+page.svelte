<script lang="ts">
	import {
		BgCanvas, Topbar, Footer, SectionRow, ContentHeader,
		PageHeaderRow, QuickFacts, StatBlock, InterestsList,
		SimpleTimeline, MarginNote, PostTypePill, GearList,
		ChangelogEntry, MonthStats, CvEntry, CvTechTag, SkillGroup,
		Quote, Aside
	} from '$lib/components';
	import {
		Callout, Sidenote, Dropcap, Prose, HrOrnament, CodeBlock,
		EpistemicStatus, FeaturesBar, Breadcrumb, PrevNext,
		TableOfContents, Embed, TagList, Citations
	} from '$lib/components/article';
</script>

<svelte:head>
	<title>Component Library · spookyemma</title>
</svelte:head>

<BgCanvas />

<div class="lib-page">
	<h1 class="lib-title">spookyemma · components</h1>
	<p class="lib-subtitle">design tokens + full component reference · spookyemma.com</p>

	<!-- ══ 01 TOKENS ══ -->
	<div class="lib-section">
		<p class="lib-section-title">01 · design tokens</p>

		<span class="lib-label">color palette</span>
		<div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:2rem">
			<div style="display:flex;flex-direction:column;gap:0.4rem;width:90px"><div style="height:40px;border-radius:3px;border:1px solid rgba(255,255,255,0.2);background:#181410"></div><span style="font-size:0.58rem;color:var(--muted)">--ink</span></div>
			<div style="display:flex;flex-direction:column;gap:0.4rem;width:90px"><div style="height:40px;border-radius:3px;background:#f0e8d8"></div><span style="font-size:0.58rem;color:var(--muted)">--parchment</span></div>
			<div style="display:flex;flex-direction:column;gap:0.4rem;width:90px"><div style="height:40px;border-radius:3px;background:#e8a830"></div><span style="font-size:0.58rem;color:var(--muted)">--amber</span></div>
			<div style="display:flex;flex-direction:column;gap:0.4rem;width:90px"><div style="height:40px;border-radius:3px;background:#d4654a"></div><span style="font-size:0.58rem;color:var(--muted)">--coral</span></div>
			<div style="display:flex;flex-direction:column;gap:0.4rem;width:90px"><div style="height:40px;border-radius:3px;background:#7a9e7e"></div><span style="font-size:0.58rem;color:var(--muted)">--sage</span></div>
			<div style="display:flex;flex-direction:column;gap:0.4rem;width:90px"><div style="height:40px;border-radius:3px;background:#9b8ec4"></div><span style="font-size:0.58rem;color:var(--muted)">--lavender</span></div>
			<div style="display:flex;flex-direction:column;gap:0.4rem;width:90px"><div style="height:40px;border-radius:3px;background:#9a8e7e"></div><span style="font-size:0.58rem;color:var(--muted)">--muted</span></div>
		</div>

		<span class="lib-label">section → color → glyph mapping</span>
		<div style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.78rem;margin-bottom:2rem">
			<span><span style="color:var(--amber)">✦</span> amber → blog &nbsp;&nbsp; <span style="color:var(--coral)">⚗</span> coral → experiments &nbsp;&nbsp; <span style="color:var(--sage)">◈</span> sage → notes &nbsp;&nbsp; <span style="color:var(--lavender)">⌘</span> lavender → guides &nbsp;&nbsp; <span style="color:var(--muted)">○</span> muted → micro</span>
		</div>

		<span class="lib-label">typography scale</span>
		<div style="display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1rem">
			<span style="font-family:var(--font-display);font-style:italic;font-weight:700;font-size:2rem;color:var(--parchment);line-height:1">Playfair Display 700 italic — hero title</span>
			<span style="font-family:var(--font-display);font-style:italic;font-size:1.1rem;color:var(--parchment)">Playfair Display 400 italic — site title, section labels</span>
			<span style="font-size:0.9rem;line-height:1.85">Courier Prime 0.9rem / 1.85lh — body prose</span>
			<span style="font-size:0.72rem;color:var(--muted)">Courier Prime 0.72rem muted — nav links, dates, meta</span>
			<span style="font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted)">0.62rem · 0.2em tracking · uppercase — eyebrows</span>
		</div>
	</div>

	<!-- ══ 02 TOPBAR ══ -->
	<div class="lib-section">
		<p class="lib-section-title">02 · topbar</p>
		<div class="lib-row full">
			<div class="lib-preview flush">
				<Topbar />
			</div>
		</div>
	</div>

	<!-- ══ 03 SECTION ROW + POST LIST ══ -->
	<div class="lib-section">
		<p class="lib-section-title">03 · section row + post list</p>
		<div class="lib-row full">
			<div class="lib-preview flush">
				<SectionRow label="blog" sectionNum="§ 01" labelColor="var(--amber)">
					<ContentHeader glyph="✦" glyphColor="var(--amber)" title="Blog" count="5 entries" />
					<ul class="post-list">
						<li class="post-item"><span class="post-icon icon-amber">✦</span><a class="post-link" href="#">Your AI Code Companion is Your Worst Practices on Steroids</a><span class="post-meta">2025-08-19</span></li>
						<li class="post-item"><span class="post-icon icon-sage">◈</span><a class="post-link" href="#">2026 Volume 3</a><span class="post-badge badge-sage">rewind</span><span class="post-meta">2026-04-02</span></li>
						<li class="post-item"><span class="post-icon icon-lavender">⌘</span><a class="post-link" href="#">Hosting a RSS Feed on your Next.Js Blog</a><span class="post-badge badge-lavender">guide</span><span class="post-meta">2024-02-26</span></li>
					</ul>
				</SectionRow>
			</div>
		</div>
	</div>

	<!-- ══ 04 FEATURES BAR ══ -->
	<div class="lib-section">
		<p class="lib-section-title">04 · features bar</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<div class="features-bar">
					<div class="features-bar-item"><span class="features-bar-label">created</span><span class="features-bar-value">2024-04-14</span></div>
					<div class="features-bar-item"><span class="features-bar-label">modified</span><span class="features-bar-value">2026-04-03</span></div>
					<div class="features-bar-item"><span class="features-bar-label">words</span><span class="features-bar-value">~1,877</span></div>
					<div class="features-bar-item"><span class="features-bar-label">reading</span><span class="features-bar-value">~10 min</span></div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 05 POST TYPE PILL ══ -->
	<div class="lib-section">
		<p class="lib-section-title">05 · post type pill</p>
		<div class="lib-row full">
			<div class="lib-preview" style="display:flex;gap:0.5rem;flex-wrap:wrap">
				<PostTypePill type="log" />
				<PostTypePill type="thinking" />
				<PostTypePill type="making" />
			</div>
		</div>
	</div>

	<!-- ══ 06 TABLE OF CONTENTS ══ -->
	<div class="lib-section">
		<p class="lib-section-title">06 · table of contents</p>
		<div class="lib-row">
			<div>
				<span class="lib-label">inline variant</span>
				<div class="lib-preview">
					<div class="toc">
						<p class="toc-title">table of contents</p>
						<ol>
							<li><a href={"#"}>External Cues</a>
								<ol>
									<li><a href={"#"}>Interrupters</a></li>
									<li><a href={"#"}>Hints</a></li>
								</ol>
							</li>
							<li><a href={"#"}>Do-Power</a></li>
							<li><a href={"#"}>Next Steps</a></li>
						</ol>
					</div>
				</div>
			</div>
			<div>
				<span class="lib-label">sidebar variant</span>
				<div class="lib-preview">
					<div class="toc-aside">
						<span class="toc-aside-title">on this page</span>
						<ol>
							<li><a href={"#"}>External Cues</a>
								<ol><li><a href={"#"}>Interrupters</a></li></ol>
							</li>
							<li><a href={"#"}>Do-Power</a></li>
							<li><a href={"#"}>Next Steps</a></li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 07 DROPCAP ══ -->
	<div class="lib-section">
		<p class="lib-section-title">07 · dropcap</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<Dropcap>Let me start this off by saying that I am not formally diagnosed with ADHD. I've had symptoms all my life, and my Dad and brother have both been formally diagnosed and medicated for it.</Dropcap>
			</div>
		</div>
	</div>

	<!-- ══ 08 CALLOUT ══ -->
	<div class="lib-section">
		<p class="lib-section-title">08 · callout</p>
		<div class="lib-row">
			<div class="lib-preview" style="display:flex;flex-direction:column;gap:1rem">
				<Callout type="note">The experiment below is based on tips that work for my flavor of ADHD.</Callout>
				<Callout type="warning">This approach may not work for all ADHD presentations.</Callout>
			</div>
			<div class="lib-preview" style="display:flex;flex-direction:column;gap:1rem">
				<Callout type="info">Decision fatigue is a well-documented psychology concept.</Callout>
				<Callout type="danger">Do not attempt to diagnose yourself without speaking to a professional.</Callout>
			</div>
		</div>
	</div>

	<!-- ══ 09 EPISTEMIC STATUS ══ -->
	<div class="lib-section">
		<p class="lib-section-title">09 · epistemic status</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<div class="epistemic-status">
					<span class="epistemic-status-label">epistemic<br>status</span>
					<span>Personal experience. I've been living with undiagnosed ADHD for 28 years and have found these strategies helpful — your mileage may vary.</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 10 SIDENOTE ══ -->
	<div class="lib-section">
		<p class="lib-section-title">10 · sidenote</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<p class="prose">I originally published this article on Kindred, my company's health network.<Sidenote id={1}>Originally published on Kindred, Hugo Health's patient network. All opinions are my own.</Sidenote> I've taken a lot of the "how" and added some of my own personal opinions.</p>
			</div>
		</div>
	</div>

	<!-- ══ 11 BLOCKQUOTE + PULL QUOTE ══ -->
	<div class="lib-section">
		<p class="lib-section-title">11 · blockquote + pull quote</p>
		<div class="lib-row">
			<div>
				<span class="lib-label">blockquote</span>
				<div class="lib-preview">
					<div class="blockquote">
						<p>Don't you know AI is going to take over your job?</p>
						<cite>— some rando, probably</cite>
					</div>
				</div>
			</div>
			<div>
				<span class="lib-label">pull quote</span>
				<div class="lib-preview">
					<div class="pull-quote">
						<p>My weaknesses as a developer have become amplified.</p>
						<cite>— from the AI companion post</cite>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 12 EMBED ══ -->
	<div class="lib-section">
		<p class="lib-section-title">12 · embed</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<div class="embed">
					<div class="embed-label">⌗ image · <span>A screen capture depicting an NFC triggered alarm</span></div>
					<div class="embed-body" style="font-style:italic;text-align:center;padding:2rem">[ image renders here ]</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 13 CITATIONS ══ -->
	<div class="lib-section">
		<p class="lib-section-title">13 · citations + cited-by</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<div class="citations">
					<p class="citations-title">references</p>
					<ol>
						<li><a href="#">Spoon Theory: What It Is and How I Use It — Washington Post</a></li>
						<li><a href="#">Decision Fatigue — Wikipedia</a></li>
						<li><a href="#">The Beginner Template — Barbell Medicine</a></li>
					</ol>
				</div>
				<div class="cited-by">
					<p class="cited-by-title">cited by</p>
					<div class="cited-by-item">◈ <a href="#">2024 Volume 4</a> · note, 2024-05-02</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 14 ASIDE ══ -->
	<div class="lib-section">
		<p class="lib-section-title">14 · aside (floated annotation)</p>
		<div class="lib-row full">
			<div class="lib-preview prose" style="overflow:hidden">
				<aside class="aside">
					<span class="aside-title">interoperability</span>
					The ability of various computer systems to exchange and make use of information.
				</aside>
				<p>One of the largest provisions passed within the Cures Act was related to <strong>interoperability</strong> and <strong>information blocking</strong>.</p>
			</div>
		</div>
	</div>

	<!-- ══ 15 TIMELINE ══ -->
	<div class="lib-section">
		<p class="lib-section-title">15 · timeline</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<SimpleTimeline items={[
					{ date: '2024-04-14', title: 'Started the habit experiment', body: 'Identified gym routine as the main area of breakdown.', color: 'amber' },
					{ date: '2024-05-02', title: 'Phase II — Iteration', body: 'Bought a workout template to reduce decision fatigue.', color: 'coral' },
					{ date: '2024-05-14', title: 'Check-in', body: 'Consistent for 6 weeks. Adding cue for travel days.', color: 'sage' }
				]} />
			</div>
		</div>
	</div>

	<!-- ══ 16 MARGIN NOTE ══ -->
	<div class="lib-section">
		<p class="lib-section-title">16 · margin note</p>
		<div class="lib-row full">
			<div class="lib-preview" style="display:flex;flex-direction:column;gap:1.25rem">
				<MarginNote label="context">Written after 6 months of daily claude code usage at arboretum lifesciences.</MarginNote>
				<MarginNote label="tags">software · adhd · ai tools · dev workflow</MarginNote>
			</div>
		</div>
	</div>

	<!-- ══ 17 TAG LIST ══ -->
	<div class="lib-section">
		<p class="lib-section-title">17 · tag list</p>
		<div class="lib-row">
			<div>
				<span class="lib-label">outline tags</span>
				<div class="lib-preview">
					<div class="tag-row">
						<span class="tag tag-amber">✦ software</span>
						<span class="tag tag-coral">⚗ experiments</span>
						<span class="tag tag-sage">◈ notes</span>
						<span class="tag tag-lavender">⌘ guides</span>
					</div>
				</div>
			</div>
			<div>
				<span class="lib-label">filled badges</span>
				<div class="lib-preview">
					<div style="display:flex;gap:0.5rem;flex-wrap:wrap">
						<span class="post-badge badge-sage">rewind</span>
						<span class="post-badge badge-lavender">indiana</span>
						<span class="post-badge badge-coral">experiment</span>
						<span class="post-badge badge-amber">featured</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 18 NAVIGATION ══ -->
	<div class="lib-section">
		<p class="lib-section-title">18 · navigation — breadcrumb + prev/next</p>
		<div class="lib-row full">
			<span class="lib-label">breadcrumb</span>
			<div class="lib-preview">
				<nav class="breadcrumb">
					<a href="/">index</a><span>/</span>
					<a href="/notebook">notebook</a><span>/</span>
					<span>your ai code companion...</span>
				</nav>
			</div>
		</div>
		<div class="lib-row full">
			<span class="lib-label">prev / next</span>
			<div class="lib-preview flush">
				<nav class="post-nav">
					<a class="post-nav-item prev" href={"#"}><span class="post-nav-dir">← previous</span><span class="post-nav-title">Reflecting on Indiana</span></a>
					<a class="post-nav-item next" href={"#"}><span class="post-nav-dir">next →</span><span class="post-nav-title">Building in Public: The Logbook Adventures</span></a>
				</nav>
			</div>
		</div>
	</div>

	<!-- ══ 19 UNDERLINE TO BACKGROUND ══ -->
	<div class="lib-section">
		<p class="lib-section-title">19 · underline-to-background link</p>
		<div class="lib-row full">
			<div class="lib-preview" style="font-family:var(--font-display);font-style:italic;font-size:1.5rem">
				<a class="utb" href={"#"}>the occult mundane</a>
			</div>
		</div>
	</div>

	<!-- ══ 20 FOOTER ══ -->
	<div class="lib-section">
		<p class="lib-section-title">20 · footer</p>
		<div class="lib-row full">
			<div class="lib-preview flush">
				<Footer />
			</div>
		</div>
	</div>

	<!-- ══ 25 PAGE HEADER ROW ══ -->
	<div class="lib-section">
		<p class="lib-section-title">25 · page header row</p>
		<div class="lib-row full">
			<div class="lib-preview flush">
				<PageHeaderRow
					eyebrow="∴ field notes · subject: self ∴"
					title="about"
					titleEmphasis="Emma"
					lede="You've made your way to the page about me. Nice. I feel weird writing this."
					labelKey="last updated"
					labelValue="2026-04-03"
				>
					{#snippet aside()}
						<QuickFacts facts={[
							{ label: 'currently', value: 'Bloomington, IN' },
							{ label: 'day job', value: 'Software Engineer @ Arboretum' }
						]} />
					{/snippet}
				</PageHeaderRow>
			</div>
		</div>
	</div>

	<!-- ══ 26 QUICK FACTS ══ -->
	<div class="lib-section">
		<p class="lib-section-title">26 · quick facts panel</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<QuickFacts facts={[
					{ label: 'currently', value: 'Bloomington, IN' },
					{ label: 'day job', value: 'Software Engineer<br>@ Arboretum Lifesciences' },
					{ label: 'origin', value: 'Columbus, OH' },
					{ label: 'household', value: '1 partner, 1 dog' }
				]} />
			</div>
		</div>
	</div>

	<!-- ══ 27 STAT BLOCK ══ -->
	<div class="lib-section">
		<p class="lib-section-title">27 · stat block</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<StatBlock stats={[
					{ num: '7,000', desc: 'approximate number of active hobbies at any given time' },
					{ num: '2', desc: 'pit-stops between Columbus and Bloomington' },
					{ num: '2–1', desc: 'Columbus Crew over LAFC, MLS Cup Final' }
				]} />
			</div>
		</div>
	</div>

	<!-- ══ 28 INTERESTS LIST ══ -->
	<div class="lib-section">
		<p class="lib-section-title">28 · interests list</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<InterestsList items={[
					{ text: 'Columbus Crew — 2026 season ticket holder', fav: true },
					{ text: 'Software engineering · TypeScript · Java Spring Boot', fav: true },
					{ text: 'Personal knowledge management', fav: true },
					{ text: 'The occult mundane' },
					{ text: 'Habit experiments · ADHD self-research' },
					{ text: 'PC building · first build February 2026' }
				]} />
			</div>
		</div>
	</div>

	<!-- ══ 29 GEAR LIST ══ -->
	<div class="lib-section">
		<p class="lib-section-title">29 · gear list</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<GearList items={[
					{ name: 'M4 MacBook Pro (64 GB)', note: 'The only machine that matters for work.', category: 'laptop', tag: { label: '✦ daily driver', type: 'fav' } },
					{ name: 'Zoom 75', href: '#', note: 'With Zooted keycaps. The keyboard that ended the keyboard search.', category: 'keyboard', tag: { label: 'shared', type: 'shared' } },
					{ name: 'Custom Built PC', note: 'Built February 2026. Gaming and big-screen work.', category: 'desktop', tag: { label: 'first build', type: 'built' } },
					{ name: 'Granola', href: '#', note: 'AI meeting notes. Still deciding if it earns a spot.', category: 'meetings', tag: { label: 'new', type: 'new' } }
				]} />
			</div>
		</div>
	</div>

	<!-- ══ 30 CHANGELOG ══ -->
	<div class="lib-section">
		<p class="lib-section-title">30 · changelog entry + month stats</p>
		<div class="lib-row">
			<div>
				<span class="lib-label">entry list</span>
				<div class="lib-preview">
					<ChangelogEntry entries={[
						{ date: 'Feb 18', type: 'added', desc: 'Sidenote component — margin notes on wide screens' },
						{ date: 'Feb 18', type: 'changed', desc: 'Redesign Now page with shared article components' },
						{ date: 'Feb 18', type: 'fixed', desc: 'TOC depth mismatch, heading anchor clickability' },
						{ date: 'Feb 15', type: 'meta', desc: 'Layout v4 begins — sidebar navigation, Gwern-inspired aesthetic' }
					]} />
				</div>
			</div>
			<div>
				<span class="lib-label">month stats</span>
				<div class="lib-preview">
					<MonthStats added={7} changed={1} fixed={3} meta={1} />
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 31 PROSE HEADINGS ══ -->
	<div class="lib-section">
		<p class="lib-section-title">31 · prose headings</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<h2 class="h2">General Framework <span class="anchor">§</span></h2>
				<p style="font-size:0.85rem;color:var(--muted);margin-bottom:1.25rem;line-height:1.8;">Paragraph of body text following an h2.</p>
				<h3 class="h3">Implementation detail</h3>
				<p style="font-size:0.85rem;color:var(--muted);margin-bottom:1.25rem;line-height:1.8;">Paragraph under an h3.</p>
				<h4 class="h4">A note on configuration</h4>
				<p style="font-size:0.85rem;color:var(--muted);line-height:1.8;">Paragraph under an h4.</p>
			</div>
		</div>
	</div>

	<!-- ══ 32 PROSE LISTS ══ -->
	<div class="lib-section">
		<p class="lib-section-title">32 · prose lists</p>
		<div class="lib-row">
			<div>
				<span class="lib-label">unordered</span>
				<div class="lib-preview prose">
					<ul>
						<li>Install the Prisma client</li>
						<li>Configure your database connection</li>
						<li>Run the initial migration</li>
					</ul>
				</div>
			</div>
			<div>
				<span class="lib-label">ordered</span>
				<div class="lib-preview prose">
					<ol>
						<li>Pre-Requisites</li>
						<li>General Framework</li>
						<li>Implementation</li>
					</ol>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 33 INLINE PROSE ══ -->
	<div class="lib-section">
		<p class="lib-section-title">33 · inline prose elements</p>
		<div class="lib-row full">
			<div class="lib-preview prose">
				<p>
					Press <kbd>shift</kbd>+<kbd>tab</kbd> to enter plan mode.
					The tool is <strong>not going to contradict you</strong> unless asked —
					that's the <em>whole point</em> of the issue.
					<del>Old approach abandoned</del> —
					use <mark>iterative prompting</mark> instead.
					The <abbr title="Large Language Model">LLM</abbr> amplifies your defaults.
				</p>
			</div>
		</div>
	</div>

	<!-- ══ 34 CODE BLOCK ══ -->
	<div class="lib-section">
		<p class="lib-section-title">34 · code block</p>
		<div class="lib-row full">
			<span class="lib-label">with filename header</span>
			<div class="lib-preview flush" style="padding:0 1.5rem;">
				<CodeBlock filename="app/api/rss/route.ts" lang="typescript">
					<pre style="background:#101010;border:1px solid rgba(196,169,106,0.15);border-top:none;border-radius:0 0 3px 3px;padding:1.25rem 1.5rem;overflow-x:auto;font-family:var(--font-mono);font-size:0.8rem;line-height:1.65;"><span class="line"><span style="color:#e8a830">export async function</span> <span style="color:#8ab494">GET</span><span style="color:#b8a888">() {'{'}</span></span>{'\n'}<span class="line"><span style="color:#b8a888">  </span><span style="color:#e8a830">return new</span> <span style="color:#a898cc">Response</span><span style="color:#b8a888">(</span><span style="color:#f0e8d8">feed</span><span style="color:#b8a888">);</span></span>{'\n'}<span class="line"><span style="color:#b8a888">{'}'}</span></span></pre>
				</CodeBlock>
			</div>
		</div>
	</div>

	<!-- ══ 36 PROSE WRAPPER ══ -->
	<div class="lib-section">
		<p class="lib-section-title">36 · prose wrapper (all elements in context)</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<div class="prose">
					<h2>General Framework <span style="font-size:0.65rem;color:var(--muted);opacity:0.6;">§</span></h2>
					<p>When I first downloaded Cursor, the most useful part was the tab completions. Since then, tools like <a href="#">Claude Code</a> have completely changed the way I go about development.</p>
					<h3>Implementation detail</h3>
					<p>Open your terminal and run <code>npx prisma init</code> to scaffold the config. The key insight: <strong>unless specifically asked, your coding agent isn't going to contradict you.</strong></p>
					<ul>
						<li>Install the Prisma client</li>
						<li>Configure your database connection</li>
						<li>Run the initial migration</li>
					</ul>
					<p>My <em>weaknesses as a developer</em> have become <mark>amplified</mark>. <del>Old approach abandoned</del> — use iterative prompting instead.</p>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 37 HR DIVIDER ══ -->
	<div class="lib-section">
		<p class="lib-section-title">37 · hr divider</p>
		<div class="lib-row">
			<div>
				<span class="lib-label">plain hr</span>
				<div class="lib-preview">
					<p style="font-size:0.85rem;color:var(--muted);margin-bottom:1rem;">End of a section...</p>
					<hr>
					<p style="font-size:0.85rem;color:var(--muted);">Start of the next section.</p>
				</div>
			</div>
			<div>
				<span class="lib-label">ornament variant</span>
				<div class="lib-preview">
					<p style="font-size:0.85rem;color:var(--muted);margin-bottom:1rem;">End of a section...</p>
					<HrOrnament />
					<p style="font-size:0.85rem;color:var(--muted);">Start of the next section.</p>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 38 FIGURE ══ -->
	<div class="lib-section">
		<p class="lib-section-title">38 · figure / image</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<figure class="figure">
					<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(196,169,106,0.2);border-radius:3px;height:120px;display:flex;align-items:center;justify-content:center;font-size:0.72rem;color:var(--muted);letter-spacing:0.06em;">[ image: pr_created.png ]</div>
					<figcaption>Fig. 1 — The PR comment created by the Azure Function on a new changeset.</figcaption>
				</figure>
			</div>
		</div>
	</div>

	<!-- ══ 39 TABLE ══ -->
	<div class="lib-section">
		<p class="lib-section-title">39 · table</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<div class="table-wrapper">
					<table>
						<thead><tr><th>Package</th><th>Version</th><th>Purpose</th></tr></thead>
						<tbody>
							<tr><td>prisma</td><td>5.x</td><td>ORM + schema definition</td></tr>
							<tr><td>@prisma/client</td><td>5.x</td><td>Generated type-safe client</td></tr>
							<tr><td>next</td><td>14.x</td><td>Framework + API routes</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 40 CV ENTRY ══ -->
	<div class="lib-section">
		<p class="lib-section-title">40 · cv entry</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<div class="cv-entries">
					<CvEntry
						role="Software Engineer"
						org="Arboretum Lifesciences"
						location="Remote"
						dates='Mar 2025 — <span class="current">Present</span>'
						current={true}
						bullets={[
							'Designed and implemented a FHIR-to-OMOP clinical data transformation pipeline <span class="cv-tech">Python</span><span class="cv-tech">Databricks</span>',
							'Engineered patient-authorized FHIR data ingestion from Epic, Cerner, and NexGen <span class="cv-tech">Java Spring Boot</span>'
						]}
					/>
					<CvEntry
						role="Software Engineer II"
						org="Hugo Health"
						location="Remote"
						dates="Mar 2023 — Mar 2025"
						bullets={['Maintained containerized API services <span class="cv-tech">Docker</span><span class="cv-tech">Amazon ECS</span>']}
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 42 SKILL TAGS ══ -->
	<div class="lib-section">
		<p class="lib-section-title">42 · skill tags + skill group</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<div class="skills-grid">
					<SkillGroup label="languages & frameworks" skills={[
						{ name: 'TypeScript', highlight: true },
						{ name: 'Python', highlight: true },
						{ name: 'Java Spring Boot', highlight: true },
						{ name: 'ExpressJS' },
						{ name: 'Svelte', highlight: true },
						{ name: 'React' },
						{ name: 'SQL' }
					]} />
					<SkillGroup label="infrastructure & cloud" skills={[
						{ name: 'Azure', highlight: true },
						{ name: 'AWS' },
						{ name: 'Terraform / OpenTofu', highlight: true },
						{ name: 'Docker' },
						{ name: 'GitHub Actions' }
					]} />
				</div>
			</div>
		</div>
	</div>

	<!-- ══ 43 CV DOWNLOAD ══ -->
	<div class="lib-section">
		<p class="lib-section-title">43 · cv download button</p>
		<div class="lib-row full">
			<div class="lib-preview">
				<button class="cv-download">⎙ print / save pdf</button>
			</div>
		</div>
	</div>

</div>
