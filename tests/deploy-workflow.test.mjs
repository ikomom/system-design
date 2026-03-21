import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('github pages workflow builds and deploys the VitePress site', () => {
  const workflow = readFileSync('.github/workflows/deploy-gh-pages.yml', 'utf8');

  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /push:\s*[\s\S]*branches:\s*\[[^\]]*master[^\]]*\]/);
  assert.match(workflow, /VITEPRESS_BASE:\s*\/\$\{\{\s*github\.event\.repository\.name\s*\}\}\//);
  assert.match(workflow, /npm ci|npm install/);
  assert.match(workflow, /npm run docs:build/);
  assert.match(workflow, /path:\s*\.\/\.vitepress\/dist/);
  assert.match(workflow, /actions\/configure-pages@/);
  assert.match(workflow, /enablement:\s*true/);
  assert.match(workflow, /actions\/upload-pages-artifact@/);
  assert.match(workflow, /actions\/deploy-pages@/);
});
