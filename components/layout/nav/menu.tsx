"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { NavigationMenu } from '@base-ui-components/react/navigation-menu';

type MenuIconProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode[];
  className?: string;
};

type MenuLink = {
  name: string;
  url: string;
};

export const MenuItem = ({ name, url }: MenuLink) => {
  return (
    <Link href={url} className="font-serif">
      {name}
    </Link>
  );
};

export const Menu = ({ open, setOpen, children, className }: MenuIconProps) => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>

      </NavigationMenu.List>
    </NavigationMenu.Root>
    // <div className={["", className].join(" ")}>
    //   <button
    //     onClick={() => setOpen(!open)}
    //     className="flex flex-col space-y-1"
    //   >
    //     <span className="bg-body rounded-md w-8 h-1"></span>
    //     <span className="bg-body rounded-md w-8 h-1"></span>
    //     <span className="bg-body rounded-md w-8 h-1"></span>
    //   </button>
    //   <div
    //     className={[!open ? "invisible" : "visible", "flex flex-col"].join(" ")}
    //   >
    //     {children}
    //   </div>
    // </div>
  );
};
