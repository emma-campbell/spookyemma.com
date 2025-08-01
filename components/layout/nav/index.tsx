"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { AccessibleLink } from "../../ui/accessible-link";

type HrefLink = {
  text: string;
  className?: string;
};

type LinkList = {
  [key: string]: HrefLink;
};

const links: LinkList = {
  "/notebook": {
    text: "notebook",
  },
  "/chronicling": {
    text: "chronicling",
  }
};

function LinkItem(props: NavigationMenu.Link.Props & { text: string }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        {...props}
        render={({ children }) => (
          <AccessibleLink href={props.href!}>
            <span>{props.text}</span>
          </AccessibleLink>
        )}
      />
    </NavigationMenu.Item>
  );
}

export const Nav = () => {
  const pathname = usePathname() || "/";
  const useBackButton = !(pathname == "/" || pathname == "/notebook");
  const router = useRouter();

  return !useBackButton ? (
    <NavigationMenu.Root>
      <NavigationMenu.List className={"flex flex-row gap-4"}>
        <AccessibleLink href="/" className={"text-accent font-bold uppercase hover:text-muted-ink font-display"}>Emma's Blog</AccessibleLink>
        {Object.entries(links).map(([href, { text }]) => (
          <LinkItem key={href} href={href} text={text} />
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ) : (
    <nav className={"w-full"}>
      <button
        className={"text-highlighted hover:text-muted-ink font-display"}
        onClick={() => router.back()}
      >
        ← BACK
      </button>
    </nav>
  );
};
