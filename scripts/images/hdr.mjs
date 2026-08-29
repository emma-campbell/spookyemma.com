// Bridge to hdr-resize.swift: compiles it once into node_modules/.cache and runs it.
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const SOURCE = path.resolve('scripts/images/hdr-resize.swift');
const BINARY = path.resolve('node_modules/.cache/hdr-resize/hdr-resize');

let ready = null;

async function ensureBinary() {
	if (process.platform !== 'darwin') {
		throw new Error(
			'HDR images can only be processed on macOS (CoreImage). Run `pnpm images` on a Mac and commit the results.'
		);
	}
	if (existsSync(BINARY)) {
		const [bin, src] = await Promise.all([stat(BINARY), stat(SOURCE)]);
		if (bin.mtimeMs >= src.mtimeMs) return;
	}
	await mkdir(path.dirname(BINARY), { recursive: true });
	console.log('compiling hdr-resize.swift (one-time)…');
	await run('swiftc', ['-O', '-o', BINARY, SOURCE]);
}

/** Resize `input` to `width` (no enlargement), keeping the gain map. Returns { width, height }. */
export async function hdrResize(input, output, width, quality) {
	ready ??= ensureBinary();
	await ready;
	const { stdout } = await run(BINARY, [input, output, String(width), String(quality)]);
	const [w, h] = stdout.trim().split(' ')[0].split('x').map(Number);
	return { width: w, height: h };
}
