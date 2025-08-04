"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { UnderlineToBackground } from "@/components/ui/underline-to-background";
import { AccessibleLink } from "@/components/ui/accessible-link";
import { DateTime } from "luxon";
import { default as packageJson } from "package.json";

type NavItem = {
  href: string;
  text: string;
};

const navItems: NavItem[] = [
  { href: "/", text: "Notebook" },
  { href: "/bio", text: "About" },
  { href: "/now", text: "Now" },
];

export const Sidebar = () => {
  const pathname = usePathname() || "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 lg:hidden"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-48 bg-background px-6 py-12 overflow-y-auto z-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
      <div className="flex flex-col h-full">
        {/* Name */}
        <div className="mb-12">
          <h1 className="text-lg font-bold">Emma Campbell</h1>
          <p className="text-sm text-muted-ink italic">A collection of notes and thoughts</p>
        </div>

        {/* Navigation */}
        <nav className="flex-grow">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <AccessibleLink
                    href={item.href}
                    onPress={() => setIsMobileMenuOpen(false)}
                    className="block py-1 text-sm"
                  >
                    <UnderlineToBackground isActive={isActive}>
                      {item.text}
                    </UnderlineToBackground>
                  </AccessibleLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Links */}
        <div className="space-y-1 text-sm">
          <AccessibleLink
            href="https://github.com/spookyemma"
            className="block py-1"
          >
            <UnderlineToBackground isExternal>
              GitHub
            </UnderlineToBackground>
          </AccessibleLink>
          <AccessibleLink
            href="/rss.xml"
            className="block py-1"
          >
            RSS
          </AccessibleLink>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-muted-ink/20">
          <p className="text-xs text-muted-ink">
            © 2022–{DateTime.now().year} Emma Campbell
          </p>
          <AccessibleLink
            href="/changelog"
            className="text-xs text-muted-ink hover:text-accent transition-colors"
          >
            v{packageJson.version}
          </AccessibleLink>
        </div>
      </div>
    </aside>
    </>
  );
};