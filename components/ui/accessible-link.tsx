"use client";

import { Link as AriaLink } from "react-aria-components";
import { forwardRef } from "react";
import { clsx } from "clsx";
import { UnderlineToBackground } from "./underline-to-background";

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
          className={linkClasses}
          isDisabled={disabled}
          onPress={onPress}
          {...props}
        >
          <UnderlineToBackground>
            {children}
          </UnderlineToBackground>
          <span className="sr-only"> (opens in new tab)</span>
        </AriaLink>
      );
    }

    return (
      <AriaLink
        ref={ref}
        href={href}
        className={linkClasses}
        isDisabled={disabled}
        onPress={onPress}
        rel="noopener noreferrer"
        {...props}
      >
        <UnderlineToBackground>
          {children}
        </UnderlineToBackground>
      </AriaLink>
    );
  }
);

AccessibleLink.displayName = "AccessibleLink";