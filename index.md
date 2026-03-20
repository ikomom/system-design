---
layout: home
pageClass: home-landing

hero:
  name: 系统设计
  text: 经典题目的现代文档站版本
  tagline: 从分布式 ID、短网址、信息流到搜索引擎，把常见系统设计题拆成可以连续阅读、快速检索、随时回顾的知识库。
  actions:
    - theme: brand
      text: 开始阅读
      link: /cn/
    - theme: alt
      text: GitHub
      link: https://github.com/soulmachine/system-design

features:
  - title: 书籍式结构，现代化体验
    details: 保留章节式阅读路径，同时接入 VitePress 的本地搜索、移动端适配与更清晰的目录导航。
  - title: 从题目到权衡
    details: 不只罗列方案，而是强调容量估算、瓶颈识别、组件边界与设计取舍。
  - title: 面向复习而不是只看一遍
    details: 文档按主题聚合，适合在准备系统设计面试、复盘线上架构或搭建知识库时反复查阅。
---

<div class="landing-grid">
  <div class="landing-card">
    <strong>先建立问题框架</strong>
    从容量、延迟、可用性、扩展性出发，先明确题目边界，再进入具体设计。
  </div>
  <div class="landing-card">
    <strong>再拆关键组件</strong>
    把存储、索引、缓存、调度、限流、分片和一致性问题拆开理解，组合出完整方案。
  </div>
  <div class="landing-card">
    <strong>最后回答为什么</strong>
    面试官真正想听的，往往不是你会不会背方案，而是你能不能说清楚取舍依据。
  </div>
</div>

## 从哪里开始

- 第一次阅读，建议先看 `阅读方法`，再进入具体题目。
- 已有工程经验，直接从 `信息流`、`搜索引擎`、`API 限速` 这类更接近真实系统权衡的题目切入会更顺。
- 如果你在补齐底层知识，可以从 `大数据` 与 `附录` 章节开始，先打数据结构和分布式基础。
