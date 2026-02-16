import { getPage, getPages } from "$lib/content";
import { renderMarkdown } from '$lib/content/markdown';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
  const slugs = getPages();
  return slugs.map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  const page = getPage(params.page);

  if (!page) {
    throw error(404, 'Page not found');
  }

  // Render markdown to HTML at build time
  const contentHtml = await renderMarkdown(page.content);

  return {
    page: {
      ...page,
      contentHtml
    }
  };
};

