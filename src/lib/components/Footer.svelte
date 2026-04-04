<script lang="ts">
	import { DateTime } from 'luxon';
	import { format } from 'date-fns';

	const year = format(DateTime.now(), 'y');
</script>

<footer class="footer">
	<span>&copy; 2022&ndash;{year} Emma &middot; CC-BY-SA 4.0</span>
	<div class="footer-links">
		<a href="/rss.xml">rss</a>
		<a href="/changelog">changelog</a>
		<a href="https://github.com/emma-campbell" target="_blank" rel="noopener noreferrer">github</a>
	</div>
</footer>
