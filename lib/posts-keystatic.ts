import { getKeystaticPosts, getKeystaticPost } from './keystatic';

export interface KeystaticPost {
  slug: string;
  title: string;
  description?: string;
  published: string;
  status: 'draft' | 'published';
  entry: 'note' | 'micro' | 'essay' | 'how-to' | 'experiment';
  tags?: string[];
  content: any;
  path: string;
}

export async function getAllPosts(): Promise<KeystaticPost[]> {
  const keystaticPosts = await getKeystaticPosts();

  console.log(keystaticPosts);
  // Transform Keystatic posts
  const transformedPosts: KeystaticPost[] = keystaticPosts.map(post => ({
    slug: post.slug,
    title: post.entry.title,
    description: post.entry.description,
    published: post.entry.published,
    status: post.entry.status as 'draft' | 'published',
    entry: post.entry.entry as 'note' | 'micro' | 'essay' | 'how-to' | 'experiment',
    tags: post.entry.tags,
    content: post.entry.content,
    path: `/notebook/${post.slug}`
  }));

  // Sort by published date (newest first)
  return transformedPosts.sort((a, b) =>
    new Date(b.published).getTime() - new Date(a.published).getTime()
  );
}

export async function getPublishedPosts(): Promise<KeystaticPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post =>
    process.env.NODE_ENV !== "development" ? post.status === 'published' : true
  );
}

export async function getPostBySlug(slug: string): Promise<KeystaticPost | null> {
  try {
    const keystaticPost = await getKeystaticPost(slug);
    if (keystaticPost) {
      return {
        slug: slug,
        title: keystaticPost.title.name,
        description: keystaticPost.description,
        published: keystaticPost.published,
        status: keystaticPost.status as 'draft' | 'published',
        entry: keystaticPost.entry as 'note' | 'micro' | 'essay' | 'how-to' | 'experiment',
        tags: keystaticPost.tags,
        content: keystaticPost.content,
        path: `/notebook/${slug}`
      };
    }
  } catch (error) {
    console.warn(`Could not find Keystatic post with slug: ${slug}`);
  }

  return null;
}