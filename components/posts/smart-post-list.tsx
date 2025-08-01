"use client";

import { useEffect, useState, useRef } from "react";
import PostList from "./list";
import { PostListEntry } from "@/lib/keystatic";

interface Section {
  year: number;
  month: number;
  posts: PostListEntry[];
}

interface SmartPostListProps {
  sections: Section[];
}

export function SmartPostList({ sections }: SmartPostListProps) {
  const [pinnedYear, setPinnedYear] = useState<number | null>(
    sections.length > 0 ? sections[0].year : null
  );
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's intersecting at the top of the viewport
        const topIntersectingEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (topIntersectingEntry) {
          const sectionId = topIntersectingEntry.target.getAttribute('data-section-id');
          if (sectionId) {
            const [year] = sectionId.split('-').map(Number);
            setPinnedYear(year);
          }
        }
      },
      {
        threshold: 0,
        rootMargin: '-1px 0px -99% 0px', // Only trigger when at the very top
      }
    );

    // Observe all section headers
    sectionRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const setSectionRef = (sectionId: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(sectionId, element);
    } else {
      sectionRefs.current.delete(sectionId);
    }
  };

  return (
    <section className="flex flex-col space-y-8">
      {sections.map((section) => {
        const sectionId = `${section.year}-${section.month}`;
        const shouldShowYear = pinnedYear === null || section.year !== pinnedYear;

        return (
          <div key={sectionId} className="relative">
            <PostList
              month={section.month}
              posts={section.posts}
              year={section.year}
              showYear={shouldShowYear}
              onHeaderRef={(element) => setSectionRef(sectionId, element)}
              sectionId={sectionId}
            />
          </div>
        );
      })}
    </section>
  );
}