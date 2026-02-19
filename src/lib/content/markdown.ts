import { createHighlighter, type Highlighter } from 'shiki';
import { Marked, type Tokens } from 'marked';

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

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/<[^>]*>/g, '')
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

export function extractHeadings(markdown: string): Array<{ depth: number; text: string; id: string }> {
	const headings: Array<{ depth: number; text: string; id: string }> = [];
	const lines = markdown.split('\n');

	for (const line of lines) {
		const match = line.match(/^(#{1,3})\s+(.+)$/);
		if (match) {
			const depth = match[1].length;
			const text = match[2].replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`(.+?)`/g, '$1');
			headings.push({ depth, text, id: slugify(text) });
		}
	}

	return headings;
}

export function countWords(markdown: string): number {
	const text = markdown
		.replace(/^---[\s\S]*?---\n*/m, '')
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`[^`]*`/g, '')
		.replace(/!\[.*?\]\(.*?\)/g, '')
		.replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
		.replace(/<[^>]*>/g, '')
		.replace(/[#*_~>\-|]/g, '')
		.trim();

	return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function preprocessSidenotes(content: string): string {
	return content.replace(
		/<Sidenote\s+id="(\d+)">\s*([\s\S]*?)\s*<\/Sidenote>/g,
		(_match, id, body) => {
			// Convert inner markdown bold/italic/code to HTML
			const rendered = body
				.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
				.replace(/\*(.+?)\*/g, '<em>$1</em>')
				.replace(/`(.+?)`/g, '<code class="code-inline">$1</code>')
				.replace(/\n/g, ' ')
				.trim();
			return `<sup class="sidenote-ref"><a href="#sn-${id}">${id}</a></sup><aside class="sidenote" id="sn-${id}"><span class="sidenote-number">${id}.</span> ${rendered}</aside>`;
		}
	);
}

export interface RenderOptions {
	citeLinks?: boolean;
}

export async function renderMarkdown(content: string, options: RenderOptions = {}): Promise<string> {
	const highlighter = await getHighlighter();
	content = preprocessSidenotes(content);

	const citeCounter = { n: 0, seen: new Map<string, number>() };

	const marked = new Marked({
		async: true,
		gfm: true
	});

	marked.use({
		renderer: {
			heading(token: Tokens.Heading) {
				const text = this.parser.parseInline(token.tokens);
				const depth = token.depth + 1;
				const id = slugify(text);

				if (depth === 2) {
					return `<h2 class="h2" id="${id}"><a href="#${id}" class="heading-link">${text} <span class="anchor">§</span></a></h2>`;
				}
				if (depth === 3) {
					return `<h3 class="h3" id="${id}"><a href="#${id}" class="heading-link">${text} <span class="anchor">§</span></a></h3>`;
				}
				return `<h${depth} class="h${depth}" id="${id}">${text}</h${depth}>`;
			},
			paragraph(token: Tokens.Paragraph) {
				const text = this.parser.parseInline(token.tokens);
				return `<p>${text}</p>`;
			},
			strong(token: Tokens.Strong) {
				const text = this.parser.parseInline(token.tokens);
				return `<strong>${text}</strong>`;
			},
			em(token: Tokens.Em) {
				const text = this.parser.parseInline(token.tokens);
				return `<em>${text}</em>`;
			},
			link(token: Tokens.Link) {
				const href = token.href;
				const text = this.parser.parseInline(token.tokens);
				const isExternal = href.startsWith('http') || href.startsWith('mailto:');
				if (isExternal) {
					let cite = '';
					if (options.citeLinks && href.startsWith('http')) {
						let num = citeCounter.seen.get(href);
						if (num == null) {
							num = ++citeCounter.n;
							citeCounter.seen.set(href, num);
						}
						cite = `<sup class="cite-ref"><a href="#ref-${num}">${num}</a></sup>`;
					}
					return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>${cite}`;
				}
				return `<a href="${href}">${text}</a>`;
			},
			list(token: Tokens.List) {
				const tag = token.ordered ? 'ol' : 'ul';
				const itemsHtml = token.items
					.map((item) => {
						const text = this.parser.parse(item.tokens);
						return `<li>${text}</li>`;
					})
					.join('\n');
				return `<${tag} class="prose-list">${itemsHtml}</${tag}>`;
			},
			listitem(token: Tokens.ListItem) {
				const text = this.parser.parse(token.tokens);
				return `<li>${text}</li>`;
			},
			blockquote(token: Tokens.Blockquote) {
				const inner = this.parser.parse(token.tokens);

				// Detect callout syntax: > [!note], > [!warning], > [!danger]
				const calloutMatch = inner.match(/^\s*<p>\[!(note|warning|danger)\]\s*/i);
				if (calloutMatch) {
					const type = calloutMatch[1].toLowerCase();
					const icons: Record<string, string> = {
						note: '✦ Note',
						warning: '⚠ Warning',
						danger: '⊘ Danger'
					};
					const body = inner.replace(/^\s*<p>\[!(note|warning|danger)\]\s*/i, '<p>');
					return `<div class="callout ${type}"><div class="callout-label">${icons[type]}</div>${body}</div>`;
				}

				return `<blockquote class="blockquote">${inner}</blockquote>`;
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
					return `<div class="code-block">${highlighted}</div>`;
				} catch {
					return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
				}
			},
			codespan(token: Tokens.Codespan) {
				return `<code class="code-inline">${escapeHtml(token.text)}</code>`;
			},
			table(token: Tokens.Table) {
				const headerHtml = token.header
					.map((cell) => {
						const text = this.parser.parseInline(cell.tokens);
						return `<th>${text}</th>`;
					})
					.join('');
				const rowsHtml = token.rows
					.map(
						(row) =>
							`<tr>${row.map((cell) => {
								const text = this.parser.parseInline(cell.tokens);
								return `<td>${text}</td>`;
							}).join('')}</tr>`
					)
					.join('');
				return `<div class="table-wrapper"><table><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
			},
			hr() {
				return '<hr class="hr" />';
			},
			image(token: Tokens.Image) {
				const href = token.href;
				const alt = token.text || '';
				const title = token.title || '';
				const captionHtml = alt ? `<figcaption>${alt}</figcaption>` : '';
				return `<figure class="figure"><img src="${href}" alt="${alt}" ${title ? `title="${title}"` : ''} loading="lazy" />${captionHtml}</figure>`;
			},
			del(token: Tokens.Del) {
				const text = this.parser.parseInline(token.tokens);
				return `<del>${text}</del>`;
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
	const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/, '');

	const allParagraphs = contentWithoutFrontmatter
		.split(/\n\n+/)
		.filter((p) => p.trim() && !p.startsWith('#') && !p.startsWith('```'));

	const preview = allParagraphs.slice(0, paragraphs).join('\n\n');
	const hasMore = allParagraphs.length > paragraphs;

	return { preview, hasMore };
}
