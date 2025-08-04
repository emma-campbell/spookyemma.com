import { PostType } from "@/components/posts/post-type";
import { getPost, getAllPostSlugs } from "@/lib/keystatic";
import { MDXContent } from "@/components/mdx";
import { DateTime } from "luxon";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post?.title,
    description: post?.description,
    keywords: post?.tags || [],
    authors: {
      name: "Emma Campbell",
      url: "https://spookyemma.com",
    },
    referrer: "origin",
  };
}

type Params = Promise<{
  slug: string;
}>;

export default async function NotebookEntry({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const published = DateTime.fromISO(post.published || "");

  return (
    <>
      <section className={"pb-8"}>
        <div className={"flex uppercase space-x-2 font-serif text-highlighted items-center"}>
          <p>{published.toLocaleString(DateTime.DATE_MED)}</p>
          <p>•</p>
          <PostType type={post.entry} />
        </div>
        <h1 className={"font-sans uppercase text-4xl"}>
          {post.title}
        </h1>
      </section>
      <section className={"flex flex-col space-y-4 text-body pb-16"}>
        {post.content ? (
          <MDXContent
            content={typeof post.content === 'function' ? await post.content() : post.content}
          />
        ) : null}
      </section>
      <section>
        <h4
          className={"font-sans uppercase text-body text-3xl text-black pb-2"}
        >
          Metadata
        </h4>
        <div className={"flex flex-col text-body"}>
          <div className={"flex justify-between text-lg"}>
            <p>Published</p>
            <p>{published.toLocaleString(DateTime.DATE_MED)}</p>
          </div>
          {post.tags ? (
            <div className={"flex justify-between text-lg"}>
              <p>Tags</p>
              <p>{post.tags.map((t) => t.toLowerCase()).join(", ")}</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
