<script lang="ts">
	import { PageShell, QuickFacts, InterestsList, Stickers } from '#components';
</script>

<svelte:head>
	<title>About · Emma Campbell</title>
	<meta name="description" content="About Emma Campbell, a software engineer." />
</svelte:head>

<PageShell>
	<Stickers variant="margins" sides="right" top="24rem" />
	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">2026-04-03</span>
		</div>
		<div class="page-header-content">
			<h1 class="page-title">About Emma</h1>
			<p class="page-lede">
				You've made your way to the page about me. Nice. I feel weird writing this. Seems sorta
				conceited to write about yourself. Bleh, oh well.
			</p>
		</div>
		<div class="page-header-aside">
			<QuickFacts
				facts={[
					{ label: 'currently', value: 'Bloomington, IN' },
					{
						label: 'day job',
						value: 'Software Engineer<br>@ Arboretum Lifesciences'
					}
				]}
			/>
		</div>
	</div>

	<!-- Section: Who -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text">Who</span>
		</div>
		<div class="row-content">
			<div class="prose">
				<p>
					I am Emma. Originally from Columbus, OH and currently living in Bloomington, IN with my
					partner and dog. I had two pit-stops before this; one at the University of Rochester to
					get my Bachelor's in Computer Science, and the other in Washington D.C. for a few years
					after undergrad.
				</p>
				<p>
					During the day, I'm a software engineer at Arboretum Lifesciences. After the hours of 9–5
					I'm either brainrotting or working on one of my 7,000 hobbies. Tis' but the existence of
					the neurodivergent.
				</p>
			</div>
		</div>
	</div>

	<!-- Section: Where I've lived -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text">Where I've lived</span>
		</div>
		<div class="row-content">
			<ul class="path-list">
				<li class="path-item">
					<div class="path-place">Columbus, OH</div>
				</li>
				<li class="path-item">
					<div class="path-place">Rochester, NY</div>
					<div class="path-desc">University of Rochester, Bachelor's in Computer Science.</div>
				</li>
				<li class="path-item">
					<div class="path-place">Washington, D.C.</div>
					<div class="path-desc">A few years after undergrad.</div>
				</li>
				<li class="path-item now">
					<div class="path-place">Bloomington, IN</div>
					<div class="path-desc">Now, with my partner and dog.</div>
				</li>
			</ul>
		</div>
	</div>

	<!-- Section: Quirks -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text">Quirks</span>
		</div>
		<div class="row-content">
			<div class="prose">
				<p>
					I don't know my right from my left. Well, in concept I do but in practice it's a different
					story. I have considered getting <em>R</em> and <em>L</em> tattooed on the appropriate wrist
					to help me out with this, because when I hold up a hand in an L, they both look correct.
				</p>
				<p>
					In general, I am just odd and introverted. I hate small talk, and prefer to talk about
					things that matter. At social gatherings, I tend to befriend the dog.
				</p>
			</div>
		</div>
	</div>

	<!-- Section: Interests -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text">Interests</span>
		</div>
		<div class="row-content">
			<InterestsList
				items={[
					{ text: 'Columbus Crew (season ticket holder)' },
					{ text: '[NWSL2Columbus](https://nwsltocbus.com)' },
					{ text: 'Software engineering · TypeScript · Python' },
					{ text: 'Personal knowledge management · building in public' },
					{ text: 'The occult mundane' },
					{ text: 'Habit experiments · ADHD self-research' },
					{ text: 'Video games' },
					{ text: 'PC building' }
				]}
			/>
		</div>
	</div>

	<!-- Section: Find me -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text">Find me</span>
		</div>
		<div class="row-content">
			<div class="prose">
				<p>
					I'm not very loud online. The best way to find me is through the work — the notebook is
					the most honest version of me that exists on the internet.
				</p>
			</div>
			<div class="find-links">
				<a
					href="https://github.com/emma-campbell"
					target="_blank"
					rel="noopener noreferrer"
					class="accent-link">GitHub</a
				>
				<a href="/rss.xml" class="accent-link">RSS feed</a>
				<a href="/notebook" class="accent-link">The notebook</a>
			</div>
		</div>
	</div>
</PageShell>

<style>
	.find-links {
		margin-top: 1.25rem;
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		font-weight: 600;
	}
</style>
