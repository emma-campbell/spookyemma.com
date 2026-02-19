
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Page } from './types';

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages');

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getAllPageSlugs(): string[] {
  try {
    const files = fs.readdirSync(PAGES_DIR);
    return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading pages directory:', error);
    return [];
  }
}

export function getPage(slug: string): Page | null {
  try {
    const filePath = path.join(PAGES_DIR, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);
    const { data, content } = matter(fileContent);

    return {
      title: slugToTitle(slug),
      content,
      lastUpdatedAt: stats.mtime
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getPages(): Page[] {
  const slugs = getAllPageSlugs();
  return slugs.map((slug) => getPage(slug)).filter((page): page is Page => page !== null);
}

