import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, type MdsvexOptions } from 'mdsvex';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite-plus';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const mdsvexOptions: MdsvexOptions = {
	extensions: ['.md', '.svx'],
	smartypants: true
};

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.md', '.svx'],
			preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: false
			}),
			prerender: {
				entries: ['*'],
				handleHttpError: ({ path, referrer, message }) => {
					// Ignore missing favicon, images, and malformed links
					if (
						path === '/favicon.ico' ||
						path.startsWith('/images/') ||
						path.includes('>') ||
						path.includes('<') ||
						path.includes(' ')
					) {
						console.warn(`Warning: Skipping ${path}`);
						return;
					}
					// Otherwise, fail the build
					throw new Error(message);
				},
				handleMissingId: 'warn'
			}
		})
	],
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
