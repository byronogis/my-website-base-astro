---
title: Astro 配置文件参考
description: Astro 配置文件参考
tags:
  - configuration
  - astro
date: 2023-02-18 13:00
update: 2023-02-18 15:30
---

## 目录

## Astro 框架怎么样？

> **Answer by ChatGPT**

Astro 是一个静态站点生成器和 Web 开发框架，使用 JavaScript 编写，基于现代的 Web 标准和技术构建。它的设计目标是帮助开发者快速构建高性能的 Web 应用程序，并提供出色的开发体验。

Astro 框架具有以下特点：

- 静态站点生成器：Astro 允许您使用模板引擎、组件和数据源构建静态站点。生成的站点可以轻松地部署到各种托管服务或内容分发网络（CDN）中。

- 基于组件的开发：Astro 提供了一种基于组件的开发方式，可以帮助您更快地开发和维护 Web 应用程序。您可以使用 Astro 提供的内置组件或编写自己的组件，从而实现模块化和重用代码。

- 现代化的开发体验：Astro 基于现代的 Web 技术和标准构建，如 JavaScript、ES Modules、Web Components 等。它提供了一些实用的开发工具，如代码分割、HMR（热模块替换）、优化构建等，可以提高开发效率和代码质量。

- 跨平台支持：Astro 可以用于构建各种类型的应用程序，包括静态站点、单页面应用程序（SPA）、服务器端渲染（SSR）应用程序等。它还支持多种主流的 Web 框架和库，如 React、Vue、Angular 等。

总的来说，Astro 框架是一个功能强大、易于使用和灵活的 Web 开发框架，它可以帮助开发者快速构建高性能的 Web 应用程序。

## 配置文件

> [Astro 配置](https://docs.astro.build/en/reference/configuration-reference/)  
> [Astro SSR](https://docs.astro.build/en/guides/server-side-rendering/)  
> [Astro Shiki | MD 代码块高亮](https://docs.astro.build/en/guides/markdown-content/#shiki-configuration)  
> [remark](https://github.com/remarkjs/remark)  
> [rehype](https://github.com/remarkjs/remark-rehype)  
> [Astro Integrations | 集成](https://github.com/remarkjs/remark-rehype#api)

```js
// ~/astro.config.mjs
import { defineConfig } from 'astro/config'
// import netlify from '@astrojs/netlify/functions'
import UnoCSS from '@unocss/astro'
import UnoCSSPresetUno from '@unocss/preset-uno'

// remark plugin
import remarkToc from 'remark-toc'

// https://astro.build/config
// 描述; 参数类型 -> 默认值
export default defineConfig({
  // 顶层配置项
  root: '.', // 项目根目录; string -> '.'
  srcDir: './src', // 读取网站的目录（页面，样式，布局，etc）; string -> './src'
  publicDir: './public', // 静态资源目录; string -> './public'
  outDir: './dist', // 构建写入的目录; string -> ./dist
  site: 'https://liamrad.netlify.app', // 最终部署的链接; string
  base: '/', // 部署到的基本路径 **使用 base 选项后你须要更改所有的链接**; string
  trailingSlash: 'ignore', // 服务器的路由(尾部斜线)匹配行为; 'always' | 'never' | 'ignore' -> 'ignore'
  output: 'static', // 构建输出目标; 'static' | 'server' -> 'static'
  // adapter: netlify(), // ssr 构建适配器; AstroIntegration

  // 构建选项 --> 适用于 astro build
  build: {
    format: 'directory', // 生成的页面文件是 foo.html 还是 foo/index.html; 'file' | 'directory' -> 'directory'
    client: './client', // 构建 SSR 产物时，客户端源文件的输出目录，相对路径于 outDir; string -> './dist/client'
    server: './server', // ～～～～～～～～～服务端～～～～～～～～～～～～～～～～～～; string -> ''./dist/server'
    assets: '_astro', // 产物中资源文件的存放位置 --> Added in: astro@2.0.0; string -> '_astro'
    // serverEntry: 'entry.mjs', // ssr构建时，入口文件文件名，通常由构建适配器指定; string -> 'entry.mjs'
  },

  // 开发服务器选项 --> 适用于 astro dev 和 astro preview
  server: {
    host: false, // 服务运行地址; string | boolean -> false
    port: 3000, // 运行端口 （如果给定的端口已经在使用，Astro 会自动尝试下一个可用的端口); number -> 3000
    headers: {}, // http response headers --> Added in: astro@1.7.0; OutgoingHttpHeaders -> {}
  },

  // markdown 选项
  markdown: {
    drafts: false, // 草稿页是否应该被包含在最终构建中; boolean -> false
    syntaxHighlight: 'shiki', // 语法高亮器; 'shiki' | 'prism' | false -> 'shiki'
    shikiConfig: {
      theme: 'dracula', //
      langs: [], // 自定义语言（.astro 已内置
      wrap: true, // 换行以阻止水平滚动条
    }, // shiki 语法高亮配配置; Partial<ShikiConfig>
    remarkPlugins: [
      [remarkToc, {
        heading: 'toc|table[ -]of[ -]contents?|目录',
      }],
    ], // ; RemarkPlugins
    rehypePlugins: [], // ; RehypePlugins
    // extendDefaultPlugins: false, // 配置上面两个插件项时是否保留默认插件 astro@2.0.0 中舍弃并拆分为 gfm,smartypants
    gfw: true, // See https://github.com/remarkjs/remark-rehype#api; boolean -> true
    smartypants: true, // See https://github.com/remarkjs/remark-rehype#api; boolean -> true
    // remarkRehype: {}, // See https://github.com/remarkjs/remark-rehype#api; RemarkRehype
  },

  // 集成
  integrations: [
    UnoCSS({
      presets: [
        UnoCSSPresetUno(),
      ],
    }),
  ], // 扩展 Astro 功能 添加框架支持（如 Solid.js）、新功能（如站点地图）和新库支持（如 Partytown 和 Turbolinks）;

  // vite
  vite: {
    // ...
    plugins: [], // 直接在 Astro 项目中添加自定义 Vite 插件
  }, // See https://vitejs.dev/config/;
})
```

