<script lang="ts">
	interface Entry {
		date: string;
		type: 'added' | 'changed' | 'fixed' | 'meta';
		desc: string;
	}

	interface Props {
		entries: Entry[];
	}

	let { entries }: Props = $props();
</script>

<ul class="entry-list">
	{#each entries as entry}
		<li class="cl-entry">
			<span class="cl-date">{entry.date}</span>
			<span class="cl-type cl-{entry.type}">{entry.type}</span>
			<span class="cl-desc" class:is-meta={entry.type === 'meta'}>{entry.desc}</span>
		</li>
	{/each}
</ul>
