import { readFileSync } from 'node:fs';
import path from 'node:path';

const LIST_ITEM_RE = /^(\s*)\*\s+(.*)$/;
const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)$/;

export function buildSidebarFromSummaryFile(summaryPath, base = '/cn/') {
  const summary = readFileSync(summaryPath, 'utf8');
  return summaryToSidebar(summary, base);
}

export function summaryToSidebar(summary, base = '/cn/') {
  const lines = summary.split(/\r?\n/);
  const title = lines.find((line) => line.startsWith('# '))?.replace(/^#\s+/, '').trim() || '目录';
  const root = { text: title, items: [] };
  const stack = [root];

  for (const line of lines) {
    const match = line.match(LIST_ITEM_RE);
    if (!match) {
      continue;
    }

    const [, indent, rawContent] = match;
    const depth = Math.floor(normalizeIndent(indent) / 4) + 1;
    const item = createItem(rawContent.trim(), base);

    stack.length = depth;
    const parent = stack[stack.length - 1] || root;
    parent.items ??= [];
    parent.items.push(item);
    stack.push(item);
  }

  return [root];
}

function createItem(rawContent, base) {
  const linkMatch = rawContent.match(LINK_RE);

  if (!linkMatch) {
    return { text: rawContent };
  }

  const [, text, target] = linkMatch;
  return {
    text,
    link: normalizeLink(base, target)
  };
}

function normalizeIndent(indent) {
  return indent.replace(/\t/g, '    ').length;
}

function normalizeLink(base, target) {
  if (/^https?:\/\//.test(target)) {
    return target;
  }

  const joined = path.posix.join(base, target.replace(/^\.\//, ''));

  if (joined.endsWith('/README.md')) {
    return `${joined.slice(0, -'README.md'.length)}`;
  }

  if (joined.endsWith('README.md')) {
    return `${joined.slice(0, -'README.md'.length)}`;
  }

  return joined.replace(/\.md$/, '');
}
