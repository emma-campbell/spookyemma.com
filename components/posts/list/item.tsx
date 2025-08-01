import Link from "next/link";
import { Post } from "@/lib/keystatic";
import { DateTime } from "luxon";
import { createMDXPreview } from "@/lib/preview";
import { UnderlineToBackground } from "@/components/ui/underline-to-background";
import { MDXRemote } from "next-mdx-remote/rsc";
import { defaultComponents } from "@/components/mdx";

export function PostListItem({
  post,
  slug,
  content
}: {
  post: Post,
  slug: string,
  content?: string
}) {
  // Create MDX preview from content - preserve formatting like actual post
  const preview = content ? createMDXPreview(content, 3) : { preview: "", hasMore: false };

  return (
    <article className="border-b border-muted-ink/10 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      {/* Desktop layout - date on the left */}
      <div className="hidden md:flex space-x-4 items-start">
        <p className="text-sm flex font-sans font-bold text-highlighted shrink-0 mt-1">
          {DateTime.fromISO(post?.published ?? "").toFormat("MM/dd/yy")}
        </p>
        <div className="flex-grow">
          <Link
            className="block group mb-2"
            href={`/notebook/${slug}`}
          >
            <h3 className="text-3xl font-medium text-text group-hover:text-highlighted">
              <UnderlineToBackground>
                {post?.title}
              </UnderlineToBackground>
            </h3>
          </Link>

          {preview.preview && (
            <div className="text-muted-ink text-md leading-relaxed mb-2 prose prose-sm max-w-none">
              <MDXRemote
                source={preview.preview}
                components={defaultComponents}
              />
            </div>
          )}

          {preview.hasMore && (
            <Link href={`/notebook/${slug}`}>
              <span className="text-sm text-accent uppercase tracking-wide font-medium hover:text-highlighted">
                Read more →
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile layout - date under title */}
      <div className="md:hidden">
        <Link
          className="block group mb-2"
          href={`/notebook/${slug}`}
        >
          <h3 className="text-3xl font-medium text-text group-hover:text-highlighted">
            <UnderlineToBackground>
              {post?.title}
            </UnderlineToBackground>
          </h3>
        </Link>

        <p className="text-sm font-sans font-bold text-highlighted mb-2">
          {DateTime.fromISO(post?.published ?? "").toFormat("MM/dd/yy")}
        </p>

        {preview.preview && (
          <div className="text-muted-ink text-md leading-relaxed mb-2 prose prose-sm max-w-none">
            <MDXRemote
              source={preview.preview}
              components={defaultComponents}
            />
          </div>
        )}

        {preview.hasMore && (
          <Link href={`/notebook/${slug}`}>
            <span className="text-sm text-accent uppercase tracking-wide font-medium hover:text-highlighted">
              Read more →
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
