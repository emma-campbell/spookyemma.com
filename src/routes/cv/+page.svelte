<script lang="ts">
	import { PageShell, QuickFacts, CvEntry, SkillGroup } from '#components';
</script>

<svelte:head>
	<title>CV · Emma Campbell</title>
	<meta name="description" content="Curriculum vitae — Emma Campbell, software engineer." />
</svelte:head>

<PageShell>
	<!-- Page header -->
	<div class="page-header-row">
		<div class="page-header-label">
			<span class="phl-key">last updated</span>
			<span class="phl-val">2026-04-03</span>
		</div>
		<div class="page-header-content">
			<h1 class="page-title">Emma Campbell</h1>
			<p class="page-lede">
				Software engineer and maker of things. This is likely more up to date than LinkedIn or
				anything else you might find out there.
			</p>
		</div>
		<div class="page-header-aside">
			<QuickFacts
				facts={[
					{ label: 'location', value: 'Bloomington, IN · Remote' },
					{
						label: 'github',
						value:
							'<a class="accent-link" href="https://github.com/emma-campbell">emma-campbell</a>'
					},
					{
						label: 'site',
						value: '<a class="accent-link" href="https://spookyemma.com">spookyemma.com</a>'
					}
				]}
			/>
			<button class="cv-download" type="button" onclick={() => window.print()}
				>Print or save as PDF</button
			>
		</div>
	</div>

	<!-- Experience -->
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Experience</h2>
		</div>
		<div class="row-content">
			<div class="cv-entries">
				<CvEntry
					role="Software Engineer"
					org="Arboretum Lifesciences"
					location="Remote"
					dates="Mar 2025 — <span class='current'>Present</span>"
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
						'Enhanced stability of EHR integrations, increasing success rate from <strong>72.8% → 83.4%</strong>, expanding reach to 300+ new hospital and clinic locations'
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
	</div>

	<!-- Education -->
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Education</h2>
		</div>
		<div class="row-content">
			<div class="edu-entry">
				<div class="edu-degree">B.A. Computer Science</div>
				<div class="edu-org-line">
					<span class="edu-org">University of Rochester</span>
					<span class="sep">&middot;</span>
					<span>Rochester, NY</span>
					<span class="sep">&middot;</span>
					<span class="edu-dates">Aug 2017 — May 2021</span>
				</div>
				<div class="edu-focus">Focus in human-computer interaction</div>
				<div class="edu-courses">
					<strong>Coursework</strong>
					Data Structures and Algorithms · Computer Organization · Intro to Human-Computer Interaction
					· Mobile App Development · Intro to Artificial Intelligence · Computer Models and Limitations
					· Advanced Web Development · Statistical Computing using R · Social Implications of Computer
					· Computation and Formal Systems
				</div>
				<div class="edu-courses">
					<strong>Extracurriculars</strong>
					Player/Coach — Varsity Soccer · Director of Communications — Grassroots Soccer · Member — Girls
					Who Code · Volunteer — Quillen Robotics Lab
				</div>
			</div>
		</div>
	</div>

	<!-- Skills -->
	<div class="section-row">
		<div class="row-label">
			<h2 class="row-label-text">Skills</h2>
		</div>
		<div class="row-content">
			<div class="skills-grid">
				<SkillGroup
					label="languages & frameworks"
					skills={[
						{ name: 'TypeScript', highlight: true },
						{ name: 'Python', highlight: true },
						{ name: 'Java Spring Boot', highlight: true },
						{ name: 'ExpressJS' },
						{ name: 'FastAPI' },
						{ name: 'Svelte', highlight: true },
						{ name: 'React' },
						{ name: 'SQL' },
						{ name: 'Databricks' }
					]}
				/>
				<SkillGroup
					label="infrastructure & cloud"
					skills={[
						{ name: 'Azure', highlight: true },
						{ name: 'AWS' },
						{ name: 'Terraform / OpenTofu', highlight: true },
						{ name: 'Docker' },
						{ name: 'Databricks Asset Bundles', highlight: true },
						{ name: 'GitHub Actions' },
						{ name: 'Digital Ocean' }
					]}
				/>
				<SkillGroup
					label="healthcare data & systems"
					skills={[
						{ name: 'HL7® FHIR', highlight: true },
						{ name: 'OMOP', highlight: true },
						{ name: 'Smart on FHIR (OAuth 2.0)' },
						{ name: 'Epic', highlight: true },
						{ name: 'Cerner' },
						{ name: 'NexGen' },
						{ name: 'eClinicalWorks' }
					]}
				/>
			</div>
		</div>
	</div>
</PageShell>

<style>
	.cv-entries {
		position: relative;
		padding-left: 1.75rem;
		margin-left: 0.35rem;
	}
	.cv-entries::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5rem;
		bottom: 0.5rem;
		border-left: 1.5px dashed var(--line-strong);
	}

	.cv-download {
		display: inline-flex;
		align-items: center;
		margin-top: 1.5rem;
		font: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--fg);
		background: var(--bg-raised);
		border: 1.5px solid var(--line-strong);
		padding: 0.45rem 0.9rem;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition:
			background-color var(--transition),
			border-color var(--transition);
	}
	.cv-download:hover {
		border-color: var(--fg-muted);
		background: var(--bg);
	}

	.edu-degree {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.35rem;
		letter-spacing: -0.015em;
		color: var(--fg);
		margin-bottom: 0.2rem;
	}
	.edu-org-line {
		font-size: 0.98rem;
		color: var(--fg-muted);
		margin-bottom: 0.75rem;
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.edu-org {
		color: var(--fg);
		font-weight: 600;
	}
	.edu-org-line .sep {
		opacity: 0.6;
	}
	.edu-dates {
		font-variant-numeric: tabular-nums;
	}
	.edu-focus {
		color: var(--fg-muted);
		margin-bottom: 1.25rem;
	}
	.edu-courses {
		max-width: var(--measure);
		font-size: 0.98rem;
		color: var(--fg);
		line-height: 1.65;
		margin-bottom: 1rem;
	}
	.edu-courses strong {
		display: block;
		font-weight: 700;
		margin-bottom: 0.2rem;
	}

	@media (max-width: 639px) {
		.cv-entries {
			padding-left: 1.25rem;
		}
	}

	@media print {
		.cv-download {
			display: none;
		}
		.cv-entries::before {
			border-left-color: #999;
		}
		:global(.section-row),
		:global(.page-header-row) {
			display: block;
			border-top: none;
			padding: 1rem 0;
		}
		:global(.row-label) {
			align-items: flex-start;
			text-align: left;
			padding-bottom: 0.5rem;
		}
	}
</style>
