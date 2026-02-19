import { getPublishedPosts } from '$lib/content';
import { createMDXPreview, renderMarkdown } from '$lib/content/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const posts = getPublishedPosts();

  // Render previews at build time
  const postsWithPreviews = await Promise.all(
    posts.map(async (post) => {
      const { preview, hasMore } = createMDXPreview(post.content, 3);
      const previewHtml = preview ? await renderMarkdown(preview) : '';
      return {
        ...post,
        previewHtml,
        hasMore
      };
    })
  );

  return { posts: postsWithPreviews };
};
