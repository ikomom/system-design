import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const customCss = readFileSync('.vitepress/theme/custom.css', 'utf8');

test('dark theme overrides the body ambient glow', () => {
  const darkBodyRule = customCss.match(/\.dark\s+body\s*\{([^}]*)\}/s)?.[1] ?? '';

  assert.notEqual(darkBodyRule, '');
  assert.match(darkBodyRule, /background-image:/);
  assert.doesNotMatch(darkBodyRule, /rgba\(255,\s*255,\s*255/);
});

test('dark theme aligns sidebar and nav background tones', () => {
  const darkVarsRule = customCss.match(/\.dark\s*\{([^}]*)\}/s)?.[1] ?? '';

  assert.match(darkVarsRule, /--vp-sidebar-bg-color:\s*var\(--vp-c-bg\);/);
});

test('dark theme gives sidebar title area a solid nav background', () => {
  const desktopTitleRule = customCss.match(/@media \(min-width: 960px\)\s*\{([\s\S]*?\.dark\s+\.VPNavBar\.has-sidebar\s+\.title\s*\{[\s\S]*?\})[\s\S]*?\}/)?.[1] ?? '';

  assert.notEqual(desktopTitleRule, '');
  assert.match(desktopTitleRule, /background-color:\s*var\(--vp-nav-bg-color\);/);
});

test('dark theme defines dedicated homepage button colors', () => {
  const darkBrandRule = customCss.match(/\.dark\s+\.home-landing\s+\.VPButton\.brand\s*\{([^}]*)\}/s)?.[1] ?? '';
  const darkAltRule = customCss.match(/\.dark\s+\.home-landing\s+\.VPButton\.alt\s*\{([^}]*)\}/s)?.[1] ?? '';

  assert.notEqual(darkBrandRule, '');
  assert.match(darkBrandRule, /background:/);
  assert.match(darkBrandRule, /color:/);

  assert.notEqual(darkAltRule, '');
  assert.match(darkAltRule, /background:/);
  assert.match(darkAltRule, /border-color:/);
});
