<script lang="ts">
	interface TimelineEvent {
		date: string;
		title: string;
		body?: string;
		color?: 'amber' | 'coral' | 'sage';
	}

	interface Props {
		items: TimelineEvent[];
	}

	let { items }: Props = $props();
</script>

<ul class="timeline">
	{#each items as item}
		<li class="timeline-item" class:t-amber={item.color === 'amber'} class:t-coral={item.color === 'coral'} class:t-sage={item.color === 'sage'}>
			<div class="timeline-date">{item.date}</div>
			<div class="timeline-title">{item.title}</div>
			{#if item.body}
				<div class="timeline-body">{item.body}</div>
			{/if}
		</li>
	{/each}
</ul>
