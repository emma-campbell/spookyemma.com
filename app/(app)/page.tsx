import PostList from "@/components/posts/list";
import { getPublishedPosts } from "@/lib/keystatic";
import { DateTime } from "luxon";

export const experimental_ppr = true;

export default async function Home() {
  const posts = await getPublishedPosts();
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    DateTime.fromISO(b.entry.published ?? "").toMillis() - 
    DateTime.fromISO(a.entry.published ?? "").toMillis()
  );

  return <PostList posts={sortedPosts} />;
}