import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

import { buildSidebarFromSummaryFile } from './support/sidebar.mjs';

const summaryPath = fileURLToPath(new URL('../cn/SUMMARY.md', import.meta.url));
const base = process.env.VITEPRESS_BASE || '/';

const cnSidebar = [
  {
    text: '开始阅读',
    items: [
      { text: '总览', link: '/cn/' },
      { text: '阅读方法', link: '/cn/method' }
    ]
  },
  ...buildSidebarFromSummaryFile(summaryPath, '/cn/'),
  {
    text: '补充阅读',
    items: [{ text: '文件系统缓存', link: '/cn/filesystem-cache' }]
  }
];

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '系统设计',
  description: '系统设计面试题精选',
  srcExclude: ['docs/superpowers/**', '**/SUMMARY.md', 'README.md', 'cn/README.md', 'cn/bigdata/README.md'],
  lastUpdated: true,
  markdown: {
    math: true
  },
  head: [
    ['link', { rel: 'icon', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#a34a1f' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '系统设计' }],
    ['meta', { property: 'og:description', content: '系统设计面试题精选' }]
  ],
  themeConfig: {
    logo: {
      src: '/logo.svg',
      alt: '系统设计'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '中文文档', link: '/cn/' },
      { text: '阅读方法', link: '/cn/method' },
      { text: 'GitHub', link: 'https://github.com/soulmachine/system-design' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    sidebar: {
      '/cn/': cnSidebar
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一节',
      next: '下一节'
    },
    lastUpdatedText: '上次更新',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '主题切换',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/soulmachine/system-design' }
    ],
    editLink: {
      pattern: 'https://github.com/soulmachine/system-design/edit/master/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
      message: '基于 <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a> 发布',
      copyright: '内容维护：soulmachine 与贡献者'
    }
  }
});
