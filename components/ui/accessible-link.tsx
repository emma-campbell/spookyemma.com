"use client";

import { Link as AriaLink } from "react-aria-components";
import Link from "next/link";
import { forwardRef } from "react";
import { clsx } from "clsx";

export interface AccessibleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const AccessibleLink = forwardRef<HTMLAnchorElement, AccessibleLinkProps>(
  ({ href, children, className, external, disabled, onPress, ...props }, ref) => {
    const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");
    
    const linkClasses = clsx(
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      "transition-colors duration-200",
      disabled && "opacity-50 cursor-not-allowed",
      className
    );

    if (isExternal) {
      return (
        <AriaLink
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
          isDisabled={disabled}
          onPress={onPress}
          {...props}
        >
          {children}
          <span className="sr-only"> (opens in new tab)</span>
        </AriaLink>
      );
    }

    return (
      <AriaLink
        ref={ref}
        className={linkClasses}
        isDisabled={disabled}
        onPress={onPress}
        {...props}
        render={({ className: ariaClassName, ...ariaProps }) => (
          <Link
            href={href}
            className={clsx(ariaClassName, className)}
            {...ariaProps}
          >
            {children}
          </Link>
        )}
      />
    );
  }
);

AccessibleLink.displayName = "AccessibleLink";