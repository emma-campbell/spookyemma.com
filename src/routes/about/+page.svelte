<script lang="ts">
    import {
        PageShell,
        QuickFacts,
        StatBlock,
        InterestsList,
    } from "$lib/components";
</script>

<svelte:head>
    <title>About · Emma Campbell</title>
    <meta
        name="description"
        content="About Emma Campbell — software engineer, habit experimenter, dog befriender."
    />
</svelte:head>

<PageShell>
    <!-- Page header -->
    <div class="page-header-row">
        <div class="page-header-label">
            <span class="phl-key">last updated</span>
            <span class="phl-val">2026-04-03</span>
        </div>
        <div class="page-header-content">
            <p class="hero-eyebrow">∴ field notes · subject: self ∴</p>
            <h1 class="page-title">about <em>Emma</em></h1>
            <p class="page-lede">
                You've made your way to the page about me. Nice. I feel weird
                writing this. Seems sorta conceited to write about yourself.
                Bleh, oh well.
            </p>
        </div>
        <div class="page-header-aside">
            <QuickFacts
                facts={[
                    { label: "currently", value: "Bloomington, IN" },
                    {
                        label: "day job",
                        value: "Software Engineer<br>@ Arboretum Lifesciences",
                    },
                    { label: "origin", value: "Columbus, OH" },
                    { label: "household", value: "1 partner, 1 dog" },
                ]}
            />
        </div>
    </div>

    <!-- Section: Who -->
    <div class="section-row">
        <div class="row-label">
            <span class="row-label-text" style="color:var(--amber)"
                >who<span class="row-label-num">§ 01</span></span
            >
        </div>
        <div class="row-content">
            <div class="prose">
                <p class="dropcap">
                    I am Emma. Originally from Columbus, OH and currently living
                    in Bloomington, IN with my partner and dog. I had two
                    pit-stops before this; one at the University of Rochester to
                    get my Bachelor's in Computer Science, and the other in
                    Washington D.C. for a few years after undergrad.
                </p>
                <p>
                    During the day, I'm a software engineer at Arboretum
                    Lifesciences. After the hours of 9–5 I'm either brainrotting
                    or working on one of my 7,000 hobbies. Tis' but the
                    existence of the neurodivergent.
                </p>
            </div>
        </div>
        <div class="row-aside">
            <StatBlock
                stats={[
                    {
                        num: "7,000",
                        desc: "approximate number of active hobbies at any given time",
                    },
                    {
                        num: "2",
                        desc: "pit-stops between Columbus and Bloomington",
                    },
                ]}
            />
        </div>
    </div>

    <!-- Section: Path -->
    <div class="section-row">
        <div class="row-label">
            <span class="row-label-text" style="color:var(--sage)"
                >path<span class="row-label-num">§ 02</span></span
            >
        </div>
        <div class="row-content">
            <ul class="path-list">
                <li class="path-item">
                    <div class="path-place">Columbus, OH · origin</div>
                    <div class="path-desc">
                        Grew up here. Home of the Columbus Crew. Always home.
                    </div>
                </li>
                <li class="path-item">
                    <div class="path-place">
                        Rochester, NY · University of Rochester
                    </div>
                    <div class="path-desc">
                        B.A. in Computer Science. First time living somewhere
                        that actually got winter.
                    </div>
                </li>
                <li class="path-item">
                    <div class="path-place">Washington, D.C. · post-grad</div>
                    <div class="path-desc">
                        A few years after undergrad. Good food. Expensive rent.
                        Strong opinions about metro etiquette.
                    </div>
                </li>
                <li class="path-item now">
                    <div class="path-place">Bloomington, IN · now</div>
                    <div class="path-desc">
                        Living here with my partner and dog. Quieter. Good for
                        focusing. The dog loves it.
                    </div>
                </li>
            </ul>
        </div>
        <div class="row-aside">
            <div class="annotation">
                <strong>note</strong>
                The filled dot marks current location. The line is a life path, not
                a career ladder.
            </div>
        </div>
    </div>

    <!-- Section: Quirks -->
    <div class="section-row">
        <div class="row-label">
            <span class="row-label-text" style="color:var(--coral)"
                >quirks<span class="row-label-num">§ 03</span></span
            >
        </div>
        <div class="row-content">
            <div class="prose">
                <p>
                    I don't know my right from my left. Well, in concept I do
                    but in practice it's a different story. I have considered
                    getting <em>R</em> and <em>L</em> tattooed on the appropriate
                    wrist to help me out with this, because when I hold up a hand
                    in an L, they both look correct.
                </p>
                <p>
                    In general, I am just odd and introverted. I hate small
                    talk, and prefer to talk about things that matter. At social
                    gatherings, I tend to befriend the dog.
                </p>
            </div>
        </div>
        <div class="row-aside">
            <div class="annotation">
                <strong>observed behavior</strong>
                Will find and befriend your dog within 3 minutes of arriving at any
                social event. The dog will like her immediately.
            </div>
        </div>
    </div>

    <!-- Section: Interests -->
    <div class="section-row">
        <div class="row-label">
            <span class="row-label-text" style="color:var(--lavender)"
                >interests<span class="row-label-num">§ 04</span></span
            >
        </div>
        <div class="row-content">
            <InterestsList
                items={[
                    {
                        text: "Columbus Crew — season ticket holder",
                        fav: true,
                    },
                    {
                        text: "[NWSL2Columbus](https://nwsltocbus.com)",
                        fav: true,
                    },
                    {
                        text: "Software engineering · TypeScript · Python",
                    },
                    {
                        text: "Personal knowledge management · building in public",
                    },
                    {
                        text: "The occult mundane — things that haunt you in ordinary life",
                    },
                    { text: "Habit experiments · ADHD self-research" },
                    { text: "Video games" },
                    { text: "PC building — first build: February 2026" },
                    { text: "Whatever the 7,000th hobby is this week" },
                ]}
            />
        </div>
        <div class="row-aside">
            <div class="annotation">
                <strong>highlight</strong>
                Attended the MLS Cup Final with her mom. Columbus Crew won 2-1 over
                LAFC. One of her favorite moments ever.
            </div>
            <div class="annotation" style="margin-top:1rem;">
                <strong>✦ = current favorites</strong>
            </div>
        </div>
    </div>

    <!-- Section: Find me -->
    <div class="section-row">
        <div class="row-label">
            <span class="row-label-text" style="color:var(--muted)"
                >find me<span class="row-label-num">§ 05</span></span
            >
        </div>
        <div class="row-content">
            <div class="prose">
                <p>
                    I'm not very loud online. The best way to find me is through
                    the work — the notebook is the most honest version of me
                    that exists on the internet.
                </p>
            </div>
            <div
                style="margin-top:1.25rem;display:flex;gap:1.5rem;flex-wrap:wrap;"
            >
                <a
                    href="https://github.com/emma-campbell"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="accent-link">github ↗</a
                >
                <a href="/rss.xml" class="accent-link">rss feed ↗</a>
                <a href="/notebook" class="accent-link">the notebook ↗</a>
            </div>
        </div>
        <div class="row-aside">
            <div class="annotation">
                <strong>preferred contact</strong>
                Honestly? Just read the blog. It says more than any bio could.
            </div>
        </div>
    </div>
</PageShell>
