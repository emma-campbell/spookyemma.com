import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createTheme() {
	let current = $state<Theme>('dark');

	if (browser) {
		current = (document.documentElement.getAttribute('data-theme') as Theme) || 'dark';
	}

	return {
		get current() {
			return current;
		},
		toggle() {
			current = current === 'dark' ? 'light' : 'dark';
			if (browser) {
				document.documentElement.setAttribute('data-theme', current);
				localStorage.setItem('theme', current);
			}
		}
	};
}

export const theme = createTheme();
