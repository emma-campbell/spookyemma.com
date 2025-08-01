/**
 * Extract a portion of MDX content for preview while preserving formatting
 */
export function createMDXPreview(mdxContent: string, paragraphLimit: number = 3): { preview: string; hasMore: boolean } {
  if (!mdxContent) {
    return { preview: "", hasMore: false };
  }

  // Split content into logical blocks (paragraphs, headers, etc.)
  const blocks = mdxContent
    .split(/\n\s*\n/) // Split on double line breaks
    .map(block => block.trim())
    .filter(block => block.length > 0);

  const hasMore = blocks.length > paragraphLimit;
  const previewBlocks = blocks.slice(0, paragraphLimit);
  
  return {
    preview: previewBlocks.join('\n\n'),
    hasMore
  };
}

/**
 * Extract plain text from MDX content for fallback
 */
export function createPreview(mdxContent: string, wordLimit: number = 100): { preview: string; hasMore: boolean } {
  if (!mdxContent) {
    return { preview: "", hasMore: false };
  }

  // Clean MDX/Markdown syntax but preserve paragraph breaks
  let text = mdxContent
    // Remove JSX components and their props
    .replace(/<[^>]*>/g, '')
    // Remove markdown headers but keep the text
    .replace(/^#{1,6}\s+(.+)$/gm, '$1')
    // Remove markdown links but keep the link text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown emphasis but keep the text
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    // Remove inline code but keep the text
    .replace(/`([^`]+)`/g, '$1')
    // Remove code blocks entirely
    .replace(/```[\s\S]*?```/g, '')
    // Remove blockquotes but keep the text
    .replace(/^>\s+(.+)$/gm, '$1')
    // Remove list markers but keep the text
    .replace(/^[-*+]\s+(.+)$/gm, '$1')
    .replace(/^\d+\.\s+(.+)$/gm, '$1')
    // Clean up multiple spaces but preserve line breaks
    .replace(/[ \t]+/g, ' ')
    // Clean up multiple line breaks but preserve paragraph structure
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();

  // Split into words while preserving some structure
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const hasMore = words.length > wordLimit;
  
  if (hasMore) {
    // Find a good breaking point near the word limit
    let breakPoint = wordLimit;
    const preview = words.slice(0, breakPoint).join(' ');
    
    // Try to break at the end of a sentence if possible
    const sentences = preview.split(/[.!?]+/);
    if (sentences.length > 1 && sentences[sentences.length - 1].trim().split(' ').length < 10) {
      // If the last sentence fragment is short, remove it for a cleaner break
      return {
        preview: sentences.slice(0, -1).join('.') + '.',
        hasMore: true
      };
    }
    
    return {
      preview: preview + '...',
      hasMore: true
    };
  }
  
  return {
    preview: words.join(' '),
    hasMore: false
  };
}