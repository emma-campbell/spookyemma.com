"use client";

import { PostListEntry } from "@/lib/keystatic";
import { formatDistance } from "date-fns";
import { useMemo } from "react";
import { DateTime } from "luxon";
import { AccessibleLink } from "../ui/accessible-link";

export function PostPreview({ post }: { post: PostListEntry }) {
  const elapsed = useMemo(
    () =>
      formatDistance(
        DateTime.fromISO(post.entry.published!).toJSDate(),
        DateTime.now().toJSDate()
      ),
    [post.entry.published]
  );

  return (
    <div className="grid auto-rows-auto md:grid-cols-6 justify-between md:space-y-0 md:space-x-2 transition-all font-serif text-highlighted sm:flex sm:flex-row">
      <AccessibleLink
        href={`/notebook/${post?.slug!}`}
        className="max-w-1/2 col-span-4 shrink-0 text-body hover:text-highlighted"
      >
        <h4 className="text-text font-serif! font-semibold hover:underline">{post.entry.title!}</h4>
      </AccessibleLink>
      <span className="hidden md:block relative -top-2 w-full border-b border-highlighted border-dotted"></span>
      <p className="col-span-2 shrink-0">{elapsed} ago</p>
    </div>
  );
}
