
import { Timeline, type TimelineItemProps } from "@/components/now/timeline";
import { getNowEntries } from "@/lib/keystatic";
import { compareDesc } from "date-fns";
import { KeystaticContent } from "@/components/mdx/keystatic-content";

export default async function Now() {
  const nowEntries = await getNowEntries();

  // Transform the entries into timeline format
  const timelineItems: TimelineItemProps[] = await Promise.all(
    nowEntries.map(async (entry) => {
      const content = await entry.entry.content();
      console.log('Entry:', entry.slug, 'Content length:', content?.length || 0);
      return {
        month: entry.entry.month,
        year: entry.entry.year,
        children: [
          <div key={entry.slug} className="space-y-4 text-sm">
            <KeystaticContent content={content || ''} />
          </div>
        ],
      };
    })
  );

  return (
    <section className="flex flex-col space-y-10 text-body">
      <div>
        <h1 className="font-sans uppercase text-4xl font-medium text-body pb-2">
          What I&apos;m doing now
        </h1>
        <p className="text-md">
          This page is updated as I do things. No particular cadence. Just when I
          feel like it.
        </p>
      </div>
      <Timeline
        items={timelineItems.sort((a, b) =>
          compareDesc(new Date(a.year, a.month), new Date(b.year, b.month))
        )}
      />
    </section>
  );
}
