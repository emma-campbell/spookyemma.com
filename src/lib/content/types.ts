export type PostStatus = 'draft' | 'published';
export type PostEntry = 'log' | 'thinking' | 'making';

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

export interface CVEntry {
  role: string;
  organization?: string;
  location?: string;
  start?: string;
  end?: string;
  description?: string;
}

export interface CVSection {
  heading: string;
  order: number;
  entries: CVEntry[];
}

export interface CV {
  title: string;
  subtitle?: string;
  lastUpdatedAt: Date;
  sections: CVSection[];
}

export interface PhotoCollection {
  id: string;
  label: string;
  icon?: string;
  /** Number of photos tagged with this collection. Derived, not authored. */
  count: number;
}

export interface Photo {
  src: string;
  alt: string;
  /** Intrinsic pixel size of `src`, from the image manifest. Absent if the manifest lacks it. */
  width?: number;
  height?: number;
  /** Responsive `srcset` and the MIME type of its entries. Absent if the manifest lacks it. */
  srcset?: string;
  srcsetType?: 'image/webp' | 'image/jpeg';
  /** Shooting details for the lightbox, e.g. ["Fujifilm X-T50", "23mm", "f/11", …]. */
  exif?: string[];
  caption: string;
  collection: string;
  place: string;
  /** Authored as `YYYY-MM`; `dateLabel` holds the display form (e.g. "Mar 2026"). */
  date: string;
  dateLabel: string;
}

export interface PhotoAnnotation {
  title: string;
  body: string;
}

export interface PhotosContent {
  title: string;
  eyebrow: string;
  lede: string;
  lastUpdatedAt: Date;
  collections: PhotoCollection[];
  photos: Photo[];
  annotations: PhotoAnnotation[];
}
