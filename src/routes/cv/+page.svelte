<script lang="ts">
	import { BgCanvas, QuickFacts, CvEntry, SkillGroup } from '$lib/components';
</script>

<svelte:head>
	<title>CV · Emma Campbell</title>
	<meta name="description" content="Curriculum vitae — Emma Campbell, software engineer." />
</svelte:head>

<BgCanvas />

<div class="page">
	<!-- Topbar -->
	<div class="topbar">
		<a class="site-title" href="/">Emma Campbell</a>
		<nav>
			<a href="/notebook">notebook</a>
			<a href="/about">about</a>
			<a href="/now">now</a>
			<a href="/uses">uses</a>
			<a href="/changelog">changelog</a>
		</nav>
	</div>

	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">2026-04-03</span>
		</div>
		<div class="page-header-content">
			<p class="page-eyebrow">∴ curriculum vitae ∴</p>
			<h1 class="page-title">Emma <em>Campbell</em></h1>
			<p class="page-lede">Software engineer and maker of things. This is likely more up to date than LinkedIn or anything else you might find out there.</p>
		</div>
		<div class="page-header-aside">
			<QuickFacts facts={[
				{ label: 'location', value: 'Bloomington, IN · Remote' },
				{ label: 'github', value: '<a href="https://github.com/emma-campbell" style="color:var(--amber)">emma-campbell ↗</a>' },
				{ label: 'site', value: '<a href="https://spookyemma.com" style="color:var(--amber)">spookyemma.com ↗</a>' }
			]} />
			<button class="cv-download" onclick={() => window.print()}>⎙ print / save pdf</button>
		</div>
	</div>

	<!-- Experience -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--amber)">experience<span class="row-label-num">§ 01</span></span>
		</div>
		<div class="row-content">
			<div class="cv-entries">
				<CvEntry
					role="Software Engineer"
					org="Arboretum Lifesciences"
					location="Remote"
					dates='Mar 2025 — <span class="current">Present</span>'
					current={true}
					bullets={[
						'Designed and implemented a FHIR-to-OMOP clinical data transformation pipeline deployed as a Databricks Asset Bundle (DAB) across distributed customer environments <span class="cv-tech">Python</span><span class="cv-tech">Databricks</span><span class="cv-tech">Terraform</span><span class="cv-tech">Azure</span>',
						'Collaborated cross-functionally with engineering, data science, and clinical teams to define architecture and requirements for a company-wide clinical data platform',
						'Architected a multi-environment reference data promotion workflow for clinical reference files (~6M+ Athena/OMOP concepts) <span class="cv-tech">Python</span><span class="cv-tech">Databricks</span><span class="cv-tech">Terraform</span>',
						'Engineered patient-authorized FHIR data ingestion from Epic, Cerner, and NexGen sources <span class="cv-tech">Java Spring Boot</span>',
						'Led post-acquisition maintenance and technical sunset of Hugo Health legacy applications'
					]}
				/>
				<CvEntry
					role="Software Engineer II"
					org="Hugo Health"
					location="Remote"
					dates="Mar 2023 — Mar 2025"
					bullets={[
						'Maintained robustness and scalability of containerized API services <span class="cv-tech">Docker</span><span class="cv-tech">Amazon ECS</span>',
						'Led maintenance and expansion of API integrations with Dexcom and Fitbit <span class="cv-tech">REST APIs</span>',
						'Acted as primary liaison between technical teams and customers — requirement gathering, technical support, issue resolution',
						'Maintained Hugo Connect, an embedded health widget <span class="cv-tech">Next.js</span><span class="cv-tech">React</span><span class="cv-tech">TailwindCSS</span>'
					]}
				/>
				<CvEntry
					role="Software Engineer"
					org="Hugo Health"
					location="Remote"
					dates="Jul 2021 — Mar 2023"
					bullets={[
						'Upheld responsibility for maintaining and enhancing existing software systems, ensuring ongoing stability and scalability <span class="cv-tech">TypeScript</span><span class="cv-tech">Node.js</span>',
						'Implemented additional HL7® FHIR integrations with Epic, Cerner, and Humana',
						'Enhanced stability of EHR integrations, increasing success rate from <strong style="color:var(--parchment)">72.8% → 83.4%</strong>, expanding reach to 300+ new hospital and clinic locations'
					]}
				/>
				<CvEntry
					role="Software Engineering Intern"
					org="Ares Sportswear"
					location="Hilliard, Ohio"
					dates="May 2018 — Nov 2020"
					bullets={[
						'Assisted senior engineers in design, development, and testing of a complex clothing artwork design application <span class="cv-tech">Node.js</span><span class="cv-tech">Express.js</span>'
					]}
				/>
			</div>
		</div>
		<div class="row-aside">
			<div class="annotation">
				<strong>current focus</strong>
				Clinical data engineering — FHIR pipelines, OMOP transformation, healthcare interoperability.
			</div>
			<div class="annotation">
				<strong>72.8% → 83.4%</strong>
				EHR integration success rate improvement. Concrete numbers are a gift in a CV.
			</div>
		</div>
	</div>

	<!-- Education -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--sage)">education<span class="row-label-num">§ 02</span></span>
		</div>
		<div class="row-content">
			<div class="edu-entry">
				<div class="edu-degree">B.A. Computer Science</div>
				<div class="edu-org-line">
					<span class="edu-org">University of Rochester</span>
					<span style="opacity:0.4">&middot;</span>
					<span>Rochester, NY</span>
					<span style="opacity:0.4">&middot;</span>
					<span style="color:var(--muted);font-size:0.65rem;">Aug 2017 — May 2021</span>
				</div>
				<div class="edu-focus">Focus in human-computer interaction</div>
				<div class="edu-courses">
					<strong>coursework</strong>
					Data Structures and Algorithms · Computer Organization · Intro to Human-Computer Interaction · Mobile App Development · Intro to Artificial Intelligence · Computer Models and Limitations · Advanced Web Development · Statistical Computing using R · Social Implications of Computer · Computation and Formal Systems
				</div>
				<div class="edu-courses">
					<strong>extracurriculars</strong>
					Player/Coach — Varsity Soccer · Director of Communications — Grassroots Soccer · Member — Girls Who Code · Volunteer — Quillen Robotics Lab
				</div>
			</div>
		</div>
		<div class="row-aside">
			<div class="annotation">
				<strong>HCI focus</strong>
				The human-computer interaction thread runs through everything — from the healthcare patient data work to the embedded widget at Hugo.
			</div>
		</div>
	</div>

	<!-- Skills -->
	<div class="section-row">
		<div class="row-label">
			<span class="row-label-text" style="color:var(--lavender)">skills<span class="row-label-num">§ 03</span></span>
		</div>
		<div class="row-content">
			<div class="skills-grid">
				<SkillGroup label="languages & frameworks" skills={[
					{ name: 'TypeScript', highlight: true },
					{ name: 'Python', highlight: true },
					{ name: 'Java Spring Boot', highlight: true },
					{ name: 'ExpressJS' },
					{ name: 'FastAPI' },
					{ name: 'Svelte', highlight: true },
					{ name: 'React' },
					{ name: 'SQL' },
					{ name: 'Databricks' }
				]} />
				<SkillGroup label="infrastructure & cloud" skills={[
					{ name: 'Azure', highlight: true },
					{ name: 'AWS' },
					{ name: 'Terraform / OpenTofu', highlight: true },
					{ name: 'Docker' },
					{ name: 'Databricks Asset Bundles', highlight: true },
					{ name: 'GitHub Actions' },
					{ name: 'Digital Ocean' }
				]} />
				<SkillGroup label="healthcare data & systems" skills={[
					{ name: 'HL7® FHIR', highlight: true },
					{ name: 'OMOP', highlight: true },
					{ name: 'Smart on FHIR (OAuth 2.0)' },
					{ name: 'Epic', highlight: true },
					{ name: 'Cerner' },
					{ name: 'NexGen' },
					{ name: 'eClinicalWorks' }
				]} />
			</div>
		</div>
		<div class="row-aside">
			<div class="annotation">
				<strong>highlighted</strong>
				Amber tags = primary/strongest skills. Plain = familiar and used in production.
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="cv-footer">
		<span>&copy; 2022&ndash;2026 Emma &middot; CC-BY-SA 4.0</span>
		<div class="footer-links">
			<a href="/rss.xml">rss</a>
			<a href="/changelog">changelog</a>
			<a href="https://github.com/emma-campbell" target="_blank" rel="noopener noreferrer">github</a>
		</div>
	</footer>
</div>

<style>
	.page { position: relative; z-index: 1; }
	.cv-footer {
		margin-left: calc(var(--col-label) - 2px);
		border-left: 2px solid var(--red-line);
		border-top: 1px solid var(--border);
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.68rem;
		color: var(--muted);
	}
	.cv-footer a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
	.cv-footer a:hover { color: var(--amber); }
</style>
