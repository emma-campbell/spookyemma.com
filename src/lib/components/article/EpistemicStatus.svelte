<script lang="ts">
	interface Props {
		level: 'certain' | 'likely' | 'speculative' | 'uncertain';
	}

	let { level }: Props = $props();

	const levelClass: Record<string, string> = {
		certain: 'high',
		likely: 'high',
		speculative: 'medium',
		uncertain: 'low'
	};
</script>

<span class="epistemic {levelClass[level]}"><span class="dot"></span> {level}</span>
