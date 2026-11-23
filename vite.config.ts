import { defineConfig } from 'vite-plus';

// Astro owns the build (see astro.config.ts). This file only configures Vite+ tooling.
export default defineConfig({
	// `vp fmt` (oxfmt). Matches the formatting the codebase already follows.
	fmt: {
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100,
		proseWrap: 'preserve',
		svelte: true,
		astro: true,
		ignorePatterns: ['CHANGELOG.md', 'src/lib/image-manifest.json', 'content/.obsidian'],
		overrides: [
			{
				files: ['*.md', '*.mdx', '*.yml', '*.yaml'],
				options: { useTabs: false, tabWidth: 2, singleQuote: false }
			}
		]
	}
});
