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
    <div className="relative my-6 rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-800 dark:bg-blue-950/30">
      {/* Icon and title */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
          <svg 
            className="h-4 w-4 text-blue-600 dark:text-blue-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        {title && (
          <h4 className="font-semibold text-blue-900 dark:text-blue-100">
            {title}
          </h4>
        )}
      </div>
      
      {/* Content */}
      <div
        className={clsx("text-blue-800 dark:text-blue-200", {
          "text-sm italic [&>span[data-rehype-pretty-code-fragment]]:text-xs!":
            styled,
        })}
      >
        {children}
      </div>
    </div>
  );
};
