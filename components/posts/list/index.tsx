import { DateTime } from "luxon";
import { PostListItem } from "./item";
import { Suspense } from "react";
import { PostListEntry, getPost } from "@/lib/keystatic";

async function PostListItems({ posts }: { posts: PostListEntry[] }) {
  const sortedPosts = posts.sort(
    (a, b) =>
      DateTime.fromISO(b?.entry?.published ?? "").toMillis() -
      DateTime.fromISO(a?.entry?.published ?? "").toMillis()
  );

  const postsWithContent = await Promise.all(
    sortedPosts.map(async (post) => {
      const fullPost = await getPost(post.slug);
      // Ensure content is resolved as a string, not a function
      const contentString = typeof fullPost?.content === 'function' 
        ? await fullPost.content() 
        : fullPost?.content || '';
      
      return {
        ...post,
        contentString
      };
    })
  );

  return (
    <div className="flex flex-col space-y-4">
      {postsWithContent.map((post) => (
        <PostListItem 
          key={post?.entry?.title} 
          post={post?.entry} 
          slug={post?.slug}
          content={post.contentString}
        />
      ))}
    </div>
  );
}

export default function PostList({
  posts,
  month,
  year,
  showYear,
  onHeaderRef,
  sectionId,
}: {
  posts: PostListEntry[];
  month?: number;
  year?: number;
  showYear?: boolean;
  onHeaderRef?: (element: HTMLElement | null) => void;
  sectionId?: string;
}) {
  return (
    <Suspense>
      <PostListItems posts={posts} />
    </Suspense>
  );
}
