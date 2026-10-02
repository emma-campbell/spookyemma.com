import { getPhotos } from '#content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return getPhotos();
};
