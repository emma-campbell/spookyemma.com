<script lang="ts">
	import PrevNext from './PrevNext.svelte';
	import Citations from './Citations.svelte';

	interface NavLink {
		slug: string;
		title: string;
	}

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
		prevPost?: NavLink | null;
		nextPost?: NavLink | null;
		backlinks?: Backlink[];
		references?: Reference[];
	}

	let { prevPost, nextPost, backlinks, references }: Props = $props();
</script>

<footer>
	<Citations {backlinks} {references} />
	<PrevNext prev={prevPost} next={nextPost} />
</footer>
