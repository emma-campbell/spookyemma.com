import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite-plus';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version)
	},
	// `vp fmt` (oxfmt). Matches the SvelteKit scaffold defaults the codebase already mostly follows.
	fmt: {
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100,
		proseWrap: 'preserve',
		svelte: true,
		ignorePatterns: ['CHANGELOG.md', 'src/lib/image-manifest.json', 'content/.obsidian'],
		overrides: [
			{
				files: ['*.md', '*.mdx', '*.yml', '*.yaml'],
				options: { useTabs: false, tabWidth: 2, singleQuote: false }
			}
		]
	}
});
