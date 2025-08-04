import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

type ElementType<T> = T extends (infer U)[] ? U : never;

export const reader = createReader(process.cwd(), keystaticConfig);

// Define types for our collections
export type Post = Awaited<ReturnType<typeof reader.collections.posts.read>>;
export type PostListEntry = ElementType<Awaited<ReturnType<typeof reader.collections.posts.all>>>;
export type SiteSettings = Awaited<ReturnType<typeof reader.singletons.siteSettings.read>>;

/**
 * Fetches all posts from the collection.
 * @returns A promise that resolves to an array of post list entries.
 */
export async function getPosts(): Promise<PostListEntry[]> {
  try {
    const posts = await reader.collections.posts.all();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Fetches a single post by its slug.
 * @param slug - The slug of the post to fetch.
 * @returns A promise that resolves to the post or null if not found.
 */
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

/**
 * Fetches only the published posts from the collection.
 * @returns A promise that resolves to an array of published post list entries.
 */
export async function getPublishedPosts(): Promise<PostListEntry[]> {
  try {
    const allPosts = await getPosts();
    return allPosts.filter(post => post.entry.status === 'published');
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }
}

/**
 * Fetches all post slugs for static generation.
 * @returns A promise that resolves to an array of post slugs.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    return await reader.collections.posts.list();
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * Fetches all tags from the collection.
 * @returns A promise that resolves to an array of tags.
 */
export async function getTags() {
  const tags = await reader.collections.tags.all();
  return tags;
}

/**
 * Fetches a single tag by its slug.
 * @param slug - The slug of the tag to fetch.
 * @returns A promise that resolves to the tag.
 */
export async function getTag(slug: string) {
  const tag = await reader.collections.tags.read(slug);
  return tag;
}

/**
 * Fetches all notebooks from the collection.
 * @returns A promise that resolves to an array of notebooks.
 */
export async function getNotebooks() {
  const notebooks = await reader.collections.notebooks.all();
  return notebooks;
}

/**
 * Fetches a single notebook by its slug.
 * @param slug - The slug of the notebook to fetch.
 * @returns A promise that resolves to the notebook.
 */
export async function getNotebook(slug: string) {
  const notebook = await reader.collections.notebooks.read(slug);
  return notebook;
}

/**
 * Fetches the site settings.
 * @returns A promise that resolves to the site settings.
 */
export async function getSiteSettings() {
  const settings = await reader.singletons.siteSettings.read();
  return settings;
}

/**
 * Fetches all "now" entries from the collection.
 * @returns A promise that resolves to an array of "now" entries.
 */
export async function getNowEntries() {
  try {
    const entries = await reader.collections.now.all();
    return entries;
  } catch (error) {
    console.error('Error fetching now entries:', error);
    return [];
  }
}

/**
 * Fetches a single "now" entry by its slug.
 * @param slug - The slug of the "now" entry to fetch.
 * @returns A promise that resolves to the "now" entry.
 */
export async function getNowEntry(slug: string) {
  const entry = await reader.collections.now.read(slug, {
    resolveLinkedFiles: true
  });
  return entry;
}