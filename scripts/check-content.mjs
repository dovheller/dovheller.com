import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const invalid = [];
function scan(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) scan(path);
    else if (/\.(mdx|astro)$/.test(path) && readFileSync(path, 'utf8').includes('[חסר]')) invalid.push(path);
  }
}
scan('src/content');
scan('src/pages');
if (invalid.length) throw new Error('Missing content in: ' + invalid.join(', '));
