import clsx from "clsx";
import React from "react";

export const Aside = ({
  children,
  styled = false,
  title,
}: {
  children: React.ReactNode;
  styled?: boolean;
  title?: string;
}) => {
  return (
    <div className="relative my-6 rounded-lg border border-background bg-surface p-6 shadow-sm dark:border-blue-800 dark:bg-blue-950/30">
      {/* Content */}
      <div
        className={clsx("text-text/60 dark:text-blue-200", {
          "text-sm italic [&>span[data-rehype-pretty-code-fragment]]:text-xs!":
            styled,
        })}
      >
        {children}
      </div>
    </div>
  );
};
