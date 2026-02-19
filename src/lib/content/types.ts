export type PostStatus = 'draft' | 'published';
export type PostEntry = 'note' | 'essay' | 'how-to' | 'micro' | 'experiment';

export interface Post {
  slug: string;
  title: string;
  published: string;
  updated: Date;
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

export interface Page {
  lastUpdatedAt: Date;
  content: string;
  title: string,
  description?: string;
}

export type ChangelogTag = 'added' | 'changed' | 'fixed' | 'meta';

export interface ChangelogEntry {
  date: string;
  tag: ChangelogTag;
  text: string;
}

export interface ChangelogMonth {
  label: string;
  entries: ChangelogEntry[];
}

export interface Changelog {
  title: string;
  subtitle: string;
  lastUpdatedAt: Date;
  months: ChangelogMonth[];
}
