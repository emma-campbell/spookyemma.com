import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	smartypants: true
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
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
			}
		},
		alias: {
			$content: '../content'
		}
	}
};

export default config;
