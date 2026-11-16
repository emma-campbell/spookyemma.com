import { createHighlighter, type Highlighter } from 'shiki';
import { Marked, type Tokens } from 'marked';
import { getImageInfo, srcset, PROSE_SIZES } from './images';

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['tokyo-night'],
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
		theme: 'tokyo-night'
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

export function extractHeadings(
	markdown: string
): Array<{ depth: number; text: string; id: string }> {
	const headings: Array<{ depth: number; text: string; id: string }> = [];
	const lines = markdown.split('\n');

	for (const line of lines) {
		const match = line.match(/^(#{1,3})\s+(.+)$/);
		if (match) {
			const depth = match[1].length;
			const text = match[2]
				.replace(/\*\*(.+?)\*\*/g, '$1')
				.replace(/\*(.+?)\*/g, '$1')
				.replace(/`(.+?)`/g, '$1');
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

interface GitHubRepo {
	full_name: string;
	html_url: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	license: { spdx_id: string } | null;
}

// Rendering runs at prerender, so each repo is fetched once per build however many
// pages mention it.
const repoCache = new Map<string, Promise<GitHubRepo | null>>();

function fetchRepo(repo: string): Promise<GitHubRepo | null> {
	let cached = repoCache.get(repo);
	if (!cached) {
		const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
		if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
		cached = fetch(`https://api.github.com/repos/${repo}`, { headers })
			.then((res) => (res.ok ? (res.json() as Promise<GitHubRepo>) : null))
			.catch(() => null);
		repoCache.set(repo, cached);
	}
	return cached;
}

const GITHUB_MARK = `<svg class="github-card-mark" viewBox="0 0 16 16" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;

// <GitHubCard repo="owner/name" /> → a link card with the repo's description and stats.
// If GitHub can't be reached the card still renders, with just the name. The <div> wrapper
// makes marked treat it as an HTML block instead of wrapping it in a <p>.
async function preprocessGitHubCards(content: string): Promise<string> {
	const pattern = /<GitHubCard\s+repo="([\w.-]+\/[\w.-]+)"\s*\/>/g;
	const repos = [...new Set([...content.matchAll(pattern)].map((m) => m[1]))];
	if (repos.length === 0) return content;

	const data = new Map(await Promise.all(repos.map(async (r) => [r, await fetchRepo(r)] as const)));

	return content.replace(pattern, (_match, repo: string) => {
		const info = data.get(repo);
		const [owner, name] = repo.split('/');
		const href = info?.html_url ?? `https://github.com/${repo}`;
		const meta = info
			? [
					info.language,
					`★ ${info.stargazers_count}`,
					info.forks_count ? `${info.forks_count} forks` : null,
					info.license && info.license.spdx_id !== 'NOASSERTION' ? info.license.spdx_id : null
				]
					.filter(Boolean)
					.map((m) => `<span>${escapeHtml(String(m))}</span>`)
					.join('')
			: '';
		const description = info?.description
			? `<span class="github-card-description">${escapeHtml(info.description)}</span>`
			: '';
		return `<div class="github-card-wrap"><a class="github-card" href="${href}" target="_blank" rel="noopener noreferrer">${GITHUB_MARK}<span class="github-card-body"><span class="github-card-name"><span class="github-card-owner">${escapeHtml(owner)}/</span>${escapeHtml(name)}</span>${description}${meta ? `<span class="github-card-meta">${meta}</span>` : ''}</span></a></div>`;
	});
}

export interface RenderOptions {
	citeLinks?: boolean;
}

export async function renderMarkdown(
	content: string,
	options: RenderOptions = {}
): Promise<string> {
	const highlighter = await getHighlighter();
	content = preprocessSidenotes(content);
	content = await preprocessGitHubCards(content);

	const citeCounter = { n: 0, seen: new Map<string, number>() };
	let imageIndex = 0;

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

				return `<div class="pull-quote">${inner}</div>`;
			},
			code(token: Tokens.Code) {
				const language = token.lang || 'text';
				const code = token.text;
				try {
					const supportedLangs = highlighter.getLoadedLanguages();
					const effectiveLang = supportedLangs.includes(language as any) ? language : 'text';
					const highlighted = highlighter.codeToHtml(code, {
						lang: effectiveLang,
						theme: 'tokyo-night'
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
							`<tr>${row
								.map((cell) => {
									const text = this.parser.parseInline(cell.tokens);
									return `<td>${text}</td>`;
								})
								.join('')}</tr>`
					)
					.join('');
				return `<div class="table-wrapper"><table><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
			},
			hr() {
				return '<hr class="hr" />';
			},
			image(token: Tokens.Image) {
				const href = token.href;
				const alt = escapeHtml(token.text || '');
				const title = token.title ? ` title="${escapeHtml(token.title)}"` : '';
				const captionHtml = alt ? `<figcaption>${alt}</figcaption>` : '';
				// The first image in a document is the likely LCP element: fetch it eagerly
				// and at high priority. Everything below the fold stays lazy.
				const loading =
					imageIndex++ === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';

				const info = getImageInfo(href);
				if (!info) {
					return `<figure class="figure"><img src="${href}" alt="${alt}"${title} ${loading} decoding="async" />${captionHtml}</figure>`;
				}
				// Intrinsic width/height reserve the box before the bytes arrive (no layout
				// shift); the srcset lets the browser pick the smallest fitting variant, with
				// the original as the fallback src. WebP variants need a <source> so browsers
				// can fall through by type; JPEG variants (HDR sources) go straight on the img.
				const size = `width="${info.width}" height="${info.height}"`;
				if (info.type === 'image/jpeg') {
					return `<figure class="figure"><img src="${href}" srcset="${srcset(info)}" sizes="${PROSE_SIZES}" alt="${alt}"${title} ${size} ${loading} decoding="async" />${captionHtml}</figure>`;
				}
				const img = `<img src="${href}" alt="${alt}"${title} ${size} ${loading} decoding="async" />`;
				return `<figure class="figure"><picture><source type="${info.type}" srcset="${srcset(info)}" sizes="${PROSE_SIZES}" />${img}</picture>${captionHtml}</figure>`;
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
		.map((p) => p.trim())
		.filter((p) => p && !p.startsWith('#') && !p.startsWith('```') && !p.startsWith('<GitHubCard'));

	const preview = allParagraphs.slice(0, paragraphs).join('\n\n');
	const hasMore = allParagraphs.length > paragraphs;

	return { preview, hasMore };
}
