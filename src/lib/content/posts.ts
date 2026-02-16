import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostEntry, PostStatus } from './types';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export function getAllPostSlugs(): string[] {
	try {
		const files = fs.readdirSync(POSTS_DIR);
		return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
	} catch (error) {
		console.error('Error reading posts directory:', error);
		return [];
	}
}

export function getPost(slug: string): Post | null {
	try {
		const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const stats = fs.statSync(filePath);
		const { data, content } = matter(fileContent);

		// TODO: gray-matter converts date strings to Date objects, convert back to ISO string
    // while I don't hate the idea of just having them be dates, I'm too lazy to go find all
    // the references and fix them at the moment.
		let published = '';
		if (data.published instanceof Date) {
			published = data.published.toISOString().split('T')[0];
		} else if (typeof data.published === 'string') {
			published = data.published;
		}

		return {
			slug,
			title: data.title || '',
			published,
			updated: stats.mtime,
			status: (data.status as PostStatus) || 'draft',
			entry: (data.entry as PostEntry) || 'note',
			tags: data.tags || [],
			description: data.description,
			content
		};
	} catch (error) {
		console.error(`Error reading post ${slug}:`, error);
		return null;
	}
}

export function getPosts(): Post[] {
	const slugs = getAllPostSlugs();
	return slugs.map((slug) => getPost(slug)).filter((post): post is Post => post !== null);
}

export function getPublishedPosts(): Post[] {
	return getPosts()
		.filter((post) => post.status === 'published')
		.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
}
