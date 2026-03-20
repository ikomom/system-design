import test from 'node:test';
import assert from 'node:assert/strict';

import { summaryToSidebar } from '../.vitepress/support/sidebar.mjs';

test('summaryToSidebar parses nested SUMMARY.md entries into VitePress items', () => {
  const summary = `# 内容目录

* [分布式ID生成器](distributed-id-generator.md)
* [大数据](bigdata/README.md)
    * [数据流采样](bigdata/data-stream-sampling.md)
* 附录
    * [跳表(Skip List)](appendix/skip-list.md)
`;

  assert.deepEqual(summaryToSidebar(summary, '/cn/'), [
    {
      text: '内容目录',
      items: [
        {
          text: '分布式ID生成器',
          link: '/cn/distributed-id-generator'
        },
        {
          text: '大数据',
          link: '/cn/bigdata/',
          items: [
            {
              text: '数据流采样',
              link: '/cn/bigdata/data-stream-sampling'
            }
          ]
        },
        {
          text: '附录',
          items: [
            {
              text: '跳表(Skip List)',
              link: '/cn/appendix/skip-list'
            }
          ]
        }
      ]
    }
  ]);
});

test('summaryToSidebar ignores non-list lines and normalizes README.md links', () => {
  const summary = `# 内容目录

<!-- comment -->
* [首页](README.md)
`;

  assert.deepEqual(summaryToSidebar(summary, '/cn/'), [
    {
      text: '内容目录',
      items: [
        {
          text: '首页',
          link: '/cn/'
        }
      ]
    }
  ]);
});
