import { defineConfig, envField } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://spookyemma.com',
	// The images pipeline, lint-staged and the deploy all expect these paths
	publicDir: './static',
	outDir: './build',
	integrations: [
		svelte(),
		{
			// The design page is a component showcase for local work, never deployed
			name: 'design-page',
			hooks: {
				'astro:config:setup': ({ command, injectRoute }) => {
					if (command === 'dev') {
						injectRoute({ pattern: '/design', entrypoint: './src/dev/design.astro' });
					}
				}
			}
		}
	],
	env: {
		schema: {
			PUBLIC_POSTHOG_KEY: envField.string({ context: 'client', access: 'public', default: '' })
		}
	},
	vite: {
		plugins: [tailwindcss()]
	}
});
