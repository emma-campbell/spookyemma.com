import React from "react";

interface QuoteProps {
  children: React.ReactNode;
  cite?: string;
}

export const Quote = ({ children, cite }: QuoteProps) => {
  return (
    <figure className="my-2 mb-4 border-l-4 border-accent bg-accent/10 pl-6 pr-4 py-4 rounded-md relative">
      <blockquote className="text-lg italic text-text/80">{children}</blockquote>
      {cite && (
        <figcaption className="mt-2 text-sm text-accent font-medium text-right">
          — {cite}
        </figcaption>
      )}
    </figure>
  );
};
