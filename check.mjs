// Run before publishing: fails while a [[PLACEHOLDER]] is still in any page, and checks that
// both languages carry the same sections and that local links point to files that exist.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => (f === '.git' ? [] : statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(root).filter((f) => /\.(html|txt|md)$/.test(f) && !f.endsWith('README.md'));
const problems = [];
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  for (const m of new Set(text.match(/\[\[[A-Z_]+\]\]/g) ?? [])) problems.push(`${f.replace(root, '')}: still has ${m}`);
  if (f.endsWith('.html')) for (const [, href] of text.matchAll(/(?:href|src)="([^"#?:]+)"/g)) {
    const target = resolve(dirname(f), href);
    if (!existsSync(target) && !existsSync(join(target, 'index.html'))) problems.push(`${f.replace(root, '')}: broken link ${href}`);
  }
}
const h2 = (p) => (readFileSync(join(root, p), 'utf8').match(/<h2>/g) ?? []).length;
const [en, pt] = [h2('privacy/pizzaria/index.html'), h2('privacy/pizzaria/pt-BR/index.html')];
if (en !== pt) problems.push(`the English policy has ${en} sections and the Portuguese one ${pt}`);
if (problems.length) { console.error('check FAILED:\n - ' + problems.join('\n - ')); process.exit(1); }
console.log(`check passed (${files.length} files, ${en} sections in each language)`);
