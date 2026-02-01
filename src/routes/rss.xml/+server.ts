import { getPublishedPosts, getSiteSettings } from '$lib/content';
import { Feed } from 'feed';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = getPublishedPosts();
	const settings = getSiteSettings();

	const feed = new Feed({
		title: settings.siteName || 'Emma Campbell',
		description: "Emma's Digital Presence",
		id: 'https://spookyemma.com/',
		link: 'https://spookyemma.com/',
		language: 'en',
		image: `https://spookyemma.com${settings.seoDefaults?.ogImage || '/og-image.png'}`,
		favicon: 'https://spookyemma.com/favicon.ico',
		copyright: `All rights reserved ${new Date().getFullYear()}, Emma Campbell`,
		author: {
			name: 'Emma Campbell',
			link: 'https://spookyemma.com'
		}
	});

	for (const post of posts) {
		feed.addItem({
			title: post.title,
			id: `https://spookyemma.com/notebook/${post.slug}`,
			link: `https://spookyemma.com/notebook/${post.slug}`,
			description: post.description || post.title,
			date: new Date(post.published),
			author: [
				{
					name: 'Emma Campbell',
					link: 'https://spookyemma.com'
				}
			]
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
