import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress';

import siteConfig from '../.vitepress/config.mts';

const rootDir = path.resolve('cn');
const excluded = new Set([
  'README.md',
  'SUMMARY.md'
]);

test('content markdown pages start with a level-1 heading', () => {
  const offenders = [];

  for (const filePath of walkMarkdownFiles(rootDir)) {
    const relativePath = path.relative(rootDir, filePath).replaceAll('\\', '/');
    if (excluded.has(relativePath)) {
      continue;
    }

    const content = stripFrontmatter(readFileSync(filePath, 'utf8'));
    const firstMeaningfulLine = content
      .split(/\r?\n/)
      .find((line) => line.trim().length > 0);

    if (!firstMeaningfulLine?.startsWith('# ')) {
      offenders.push(relativePath);
    }
  }

  assert.deepEqual(offenders, []);
});

test('method page emphasis renders only the intended keywords', async () => {
  disposeMdItInstance();
  const md = await createMarkdownRenderer(process.cwd());
  const content = readFileSync(path.join(rootDir, 'method.md'), 'utf8');
  const paragraph = content.split(/\r?\n/)[4];

  const rendered = await md.render(paragraph);

  assert.match(rendered, /<strong>系统\(System\)<\/strong>/);
  assert.match(rendered, /<strong>架构\(Architect\)<\/strong>/);
  assert.match(rendered, /<strong>沟通\(Communication\)<\/strong>/);
  assert.doesNotMatch(rendered, /\*\*/);
});

test('tinyurl page formulas render as math instead of raw dollar delimiters', async () => {
  disposeMdItInstance();
  const md = await createMarkdownRenderer(process.cwd(), siteConfig.markdown, siteConfig.base);
  const content = readFileSync(path.join(rootDir, 'tinyurl.md'), 'utf8');
  const formulaParagraph = content.split(/\r?\n/)[17];

  const rendered = await md.render(formulaParagraph);

  assert.doesNotMatch(rendered, /\$\$/);
  assert.match(rendered, /mjx-container|MathJax/);
});

test('content markdown does not use inline double-dollar math delimiters', () => {
  const offenders = [];

  for (const filePath of walkMarkdownFiles(rootDir)) {
    const relativePath = path.relative(rootDir, filePath).replaceAll('\\', '/');
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (!line.includes('$$')) {
        return;
      }

      const stripped = line.replace(/\$\$[^$]+\$\$/g, '').trim();
      if (stripped.length > 0) {
        offenders.push(`${relativePath}:${index + 1}`);
      }
    });
  }

  assert.deepEqual(offenders, []);
});

function walkMarkdownFiles(dirPath) {
  const entries = readdirSync(dirPath);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }

    if (entry.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function stripFrontmatter(content) {
  if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) {
    return content;
  }

  const lines = content.split(/\r?\n/);
  const closingIndex = lines.slice(1).findIndex((line) => line.trim() === '---');

  if (closingIndex === -1) {
    return content;
  }

  return lines.slice(closingIndex + 2).join('\n');
}
