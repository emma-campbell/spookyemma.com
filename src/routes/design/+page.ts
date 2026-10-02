import { dev } from '$app/env';
import { error } from '@sveltejs/kit';

export const prerender = dev;

export const load = () => {
	if (!dev) error(404);
};
