import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

type ElementType<T> = T extends (infer U)[] ? U : never;

export const reader = createReader(process.cwd(), keystaticConfig);

// Define types for our collections
export type Post = Awaited<ReturnType<typeof reader.collections.posts.read>>;
export type PostListEntry = ElementType<Awaited<ReturnType<typeof reader.collections.posts.all>>>;

export async function getPosts(): Promise<PostListEntry[]> {
  try {
    const posts = await reader.collections.posts.all();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await reader.collections.posts.read(slug, {
      resolveLinkedFiles: true
    });
    return post;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

// Get published posts only
export async function getPublishedPosts(): Promise<PostListEntry[]> {
  try {
    const allPosts = await getPosts();
    return allPosts.filter(post => post.entry.status === 'published');
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    return await reader.collections.posts.list();
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

export async function getTags() {
  const tags = await reader.collections.tags.all();
  return tags;
}

export async function getTag(slug: string) {
  const tag = await reader.collections.tags.read(slug);
  return tag;
}

export async function getNotebooks() {
  const notebooks = await reader.collections.notebooks.all();
  return notebooks;
}

export async function getNotebook(slug: string) {
  const notebook = await reader.collections.notebooks.read(slug);
  return notebook;
}

export async function getSiteSettings() {
  const settings = await reader.singletons.siteSettings.read();
  return settings;
}

export async function getNowEntries() {
  try {
    const entries = await reader.collections.now.all();
    return entries;
  } catch (error) {
    console.error('Error fetching now entries:', error);
    return [];
  }
}

export async function getNowEntry(slug: string) {
  const entry = await reader.collections.now.read(slug, {
    resolveLinkedFiles: true
  });
  return entry;
}