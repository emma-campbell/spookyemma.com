import { renderMarkdown } from '$lib/content/markdown';
import type { PageServerLoad } from './$types';

// Sample markdown to demonstrate prose rendering
const sampleMarkdown = `
# Heading Level 2

## Heading Level 3

This is a body paragraph with **bold text**, *italic text*, and \`inline code\`. Links look [like this](https://example.com) and internal links go [to the notebook](/notebook).

> This is a blockquote. It should have a subtle left border and italic styling, appropriate for quotations or asides.

> [!note] This is a note callout. Use these for supplementary information that enriches the main content.

> [!warning] Be careful with this. Warning callouts highlight potential pitfalls.

> [!danger] This is a danger callout for critical information that must not be ignored.

Here's a code block:

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

And a table:

| Column A | Column B | Column C |
|----------|----------|----------|
| Cell 1   | Cell 2   | 42       |
| Cell 3   | Cell 4   | 108      |

---

- First unordered item
- Second unordered item
- Third unordered item

1. First ordered item
2. Second ordered item
3. Third ordered item

![An example figure caption](https://placehold.co/800x400/2b3339/8bbcba?text=Figure+Image)
`;

export const load: PageServerLoad = async () => {
	const proseHtml = await renderMarkdown(sampleMarkdown);
	return { proseHtml };
};
