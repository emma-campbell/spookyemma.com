import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

export const prerender = dev;

export const load = () => {
	if (!dev) error(404);
};
