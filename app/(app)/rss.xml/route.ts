import { compareDesc } from "date-fns";
import { Feed } from "feed";
import { DateTime } from "luxon";
import { getPublishedPosts, getSiteSettings, PostListEntry } from "@/lib/keystatic";

const createFeed = async () => {
  const posts = await getPublishedPosts();
  const settings = await getSiteSettings();
  const feed = new Feed({
    title: settings?.siteName!,
    description: settings?.siteDescription!,
    id: process.env.NEXT_PUBLIC_SITE_URL!,
    link: process.env.NEXT_PUBLIC_SITE_URL!,
    language: "en",
    image:
      `${process.env.NEXT_PUBLIC_SITE_URL!}/ogImage.png`,
    favicon: "",
    copyright: `2022 - ${DateTime.now().year}, Emma Campbell`,
    author: {
      name: "Emma Campbell",
      link: process.env.NEXT_PUBLIC_SITE_URL!,
    },
  });

  posts
    .filter((p: PostListEntry) => p.entry.status !== "draft")
    .sort((a: PostListEntry, b: PostListEntry) =>
      compareDesc(new Date(a.entry.published!), new Date(b.entry.published!)),
    )
    .forEach((p: PostListEntry) => {
      const url = `${process.env.NEXT_PUBLIC_SITE_URL!}/notebook/${p.slug!}`;
      feed.addItem({
        id: p.slug,
        link: url,
        title: p.entry.title,
        description: p.entry.description,
        category: [
          {
            name: p.entry.tags.toString(),
          },
        ],
        date: DateTime.fromISO(p.entry.published!).toJSDate(),
        author: [
          {
            name: "Emma Campbell",
            link: process.env.NEXT_PUBLIC_SITE_URL!,
          },
        ],
      });
    });

  return feed.rss2();
};

export const GET = async () => {
  const feed = await createFeed();
  return new Response(feed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
