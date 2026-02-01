import { createHighlighter, type Highlighter } from 'shiki';
import { Marked, type Token, type Tokens } from 'marked';

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['everforest-dark'],
			langs: [
				'javascript',
				'typescript',
				'json',
				'bash',
				'css',
				'html',
				'markdown',
				'tsx',
				'jsx',
				'yaml',
				'python',
				'rust',
				'go',
				'shell',
				'text',
				'ts',
				'js'
			]
		});
	}
	return highlighterPromise;
}

export async function highlightCode(code: string, lang: string): Promise<string> {
	const highlighter = await getHighlighter();
	const supportedLangs = highlighter.getLoadedLanguages();

	if (!supportedLangs.includes(lang as any)) {
		lang = 'text';
	}

	return highlighter.codeToHtml(code, {
		lang,
		theme: 'everforest-dark'
	});
}

export async function renderMarkdown(content: string): Promise<string> {
	const highlighter = await getHighlighter();

	const marked = new Marked({
		async: true,
		gfm: true
	});

	// Custom renderer
	marked.use({
		renderer: {
			heading(token: Tokens.Heading) {
				const sizes: Record<number, string> = {
					1: 'text-3xl mt-8 mb-4',
					2: 'text-2xl mt-6 mb-3',
					3: 'text-xl mt-4 mb-2',
					4: 'text-lg mt-3 mb-2',
					5: 'text-base mt-2 mb-1',
					6: 'text-sm mt-2 mb-1'
				};
				const sizeClass = sizes[token.depth] || sizes[1];
				// Parse inline tokens
				const text = this.parser.parseInline(token.tokens);
				return `<h${token.depth + 1} class="font-sans uppercase text-inherit ${sizeClass}">${text}</h${token.depth + 1}>`;
			},
			paragraph(token: Tokens.Paragraph) {
				const text = this.parser.parseInline(token.tokens);
				return `<p class="mb-4">${text}</p>`;
			},
			strong(token: Tokens.Strong) {
				const text = this.parser.parseInline(token.tokens);
				return `<strong class="font-bold">${text}</strong>`;
			},
			em(token: Tokens.Em) {
				const text = this.parser.parseInline(token.tokens);
				return `<em class="italic">${text}</em>`;
			},
			link(token: Tokens.Link) {
				const href = token.href;
				const text = this.parser.parseInline(token.tokens);
				const isExternal = href.startsWith('http') || href.startsWith('mailto:');
				if (isExternal) {
					return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">${text}</a>`;
				}
				return `<a href="${href}" class="text-accent hover:underline">${text}</a>`;
			},
			list(token: Tokens.List) {
				const tag = token.ordered ? 'ol' : 'ul';
				const listClass = token.ordered
					? 'list-inside list-decimal my-4'
					: 'list-inside list-disc my-4';
				const itemsHtml = token.items
					.map((item) => {
						const text = this.parser.parse(item.tokens);
						return `<li class="mb-1">${text}</li>`;
					})
					.join('\n');
				return `<${tag} class="${listClass}">${itemsHtml}</${tag}>`;
			},
			listitem(token: Tokens.ListItem) {
				const text = this.parser.parse(token.tokens);
				return `<li class="mb-1">${text}</li>`;
			},
			blockquote(token: Tokens.Blockquote) {
				const text = this.parser.parse(token.tokens);
				return `<figure class="my-4 mb-4 border-l-4 border-accent bg-accent/10 pl-6 pr-4 py-4 rounded-md">
					<blockquote class="text-lg italic text-text/80">${text}</blockquote>
				</figure>`;
			},
			code(token: Tokens.Code) {
				const language = token.lang || 'text';
				const code = token.text;
				try {
					const supportedLangs = highlighter.getLoadedLanguages();
					const effectiveLang = supportedLangs.includes(language as any) ? language : 'text';
					const highlighted = highlighter.codeToHtml(code, {
						lang: effectiveLang,
						theme: 'everforest-dark'
					});
					return `<div class="code-block-wrapper my-6">${highlighted}</div>`;
				} catch {
					return `<pre class="shiki overflow-x-auto rounded-lg my-6 p-4 bg-[#2b3339]"><code>${escapeHtml(code)}</code></pre>`;
				}
			},
			codespan(token: Tokens.Codespan) {
				return `<code class="bg-surface rounded px-1.5 py-0.5 text-sm">${escapeHtml(token.text)}</code>`;
			},
			table(token: Tokens.Table) {
				const headerHtml = token.header
					.map((cell) => {
						const text = this.parser.parseInline(cell.tokens);
						return `<th class="px-4 py-2 text-left font-semibold border border-gray-600">${text}</th>`;
					})
					.join('');
				const rowsHtml = token.rows
					.map(
						(row) =>
							`<tr class="border-b border-gray-700">${row.map((cell) => {
								const text = this.parser.parseInline(cell.tokens);
								return `<td class="px-4 py-2 border border-gray-600">${text}</td>`;
							}).join('')}</tr>`
					)
					.join('');
				return `<div class="overflow-x-auto my-6">
					<table class="min-w-full border-collapse border border-gray-600">
						<thead class="bg-surface"><tr>${headerHtml}</tr></thead>
						<tbody class="divide-y divide-gray-700">${rowsHtml}</tbody>
					</table>
				</div>`;
			},
			hr() {
				return '<hr class="border-t border-muted-ink/30 my-8" />';
			},
			image(token: Tokens.Image) {
				const href = token.href;
				const alt = token.text || '';
				const title = token.title || '';
				return `<img src="${href}" alt="${alt}" ${title ? `title="${title}"` : ''} class="rounded-lg my-6 max-w-full" loading="lazy" />`;
			},
			del(token: Tokens.Del) {
				const text = this.parser.parseInline(token.tokens);
				return `<del class="line-through opacity-75">${text}</del>`;
			}
		}
	});

	const html = await marked.parse(content);
	return html;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export function createMDXPreview(
	content: string,
	paragraphs: number = 3
): { preview: string; hasMore: boolean } {
	// Remove frontmatter if present
	const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/, '');

	// Split into paragraphs (separated by blank lines)
	const allParagraphs = contentWithoutFrontmatter
		.split(/\n\n+/)
		.filter((p) => p.trim() && !p.startsWith('#') && !p.startsWith('```'));

	const preview = allParagraphs.slice(0, paragraphs).join('\n\n');
	const hasMore = allParagraphs.length > paragraphs;

	return { preview, hasMore };
}
