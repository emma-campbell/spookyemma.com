import { getPhotos } from '#lib/content/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return getPhotos();
};
