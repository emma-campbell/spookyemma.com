export type PostStatus = 'draft' | 'published';
export type PostEntry = 'note' | 'essay' | 'how-to' | 'micro' | 'experiment';

export interface Post {
	slug: string;
	title: string;
	published: string;
	status: PostStatus;
	entry: PostEntry;
	tags: string[];
	description?: string;
	content: string;
}

export interface NowEntry {
	slug: string;
	month: number;
	year: number;
	content: string;
}

export interface SiteSettings {
	siteName: string;
	seoDefaults: {
		ogImage: string;
	};
}
