import { defineConfig } from 'astro/config'
// import netlify from '@astrojs/netlify/functions'
import UnoCSS from '@unocss/astro'
import UnoCSSPresetUno from '@unocss/preset-uno'

// remark plugin
import remarkToc from 'remark-toc'

// https://astro.build/config
export default defineConfig({
  // 顶层配置项
  root: '.', // 项目根目录
  srcDir: './src', // 读取网站的目录（页面，样式，布局，etc）
  publicDir: './public', // 静态资源目录
  outDir: './dist', // 构建写入的目录
  site: 'https://liamrad.netlify.app', // 最终部署的链接
  base: '/', // 部署到的基本路径 **使用 base 选项后你须要更改所有的链接**
  trailingSlash: 'ignore', // 服务器的路由(尾部斜线)匹配行为 'always' | 'never' | 'ignore'
  output: 'static', // 构建输出目标 'static' | 'server'
  // adapter: netlify(), // ssr 构建适配器

  // 构建选项 --> 适用于 astro build
  build: {
    format: 'directory', // 'file' | 'directory'
    client: './client', // 构建服务端产物时，客户端源文件的输出目录，相对路径于 outDir
    server: './server', // ～～～～～～～～～服务端～～～～～～～～～～～～～～～～～～
    assets: '_astro', // 产物中资源文件的存放位置 --> Added in: astro@2.0.0
    // serverEntry: 'entry.mjs', // ssr构建时，入口文件文件名，通常由构建适配器指定
  },

  // 开发服务器选项 --> 适用于 astro dev 和 astro preview
  server: {
    host: false, // 服务运行地址
    port: 3000, // 运行端口 （如果给定的端口已经在使用，Astro 会自动尝试下一个可用的端口
    headers: {}, // http response headers --> Added in: astro@1.7.0
  },

  // markdown 选项
  markdown: {
    drafts: false, // 草稿页是否应该被包含在最终构建中
    syntaxHighlight: 'shiki', // 语法高亮器 'shiki' | 'prism' | false
    shikiConfig: {
      theme: 'dracula', //
      langs: [], // 自定义语言（.astro 已内置
      wrap: true, // 换行以阻止水平滚动条
    }, // shiki 语法高亮配配置
    remarkPlugins: [
      [remarkToc, {
        heading: 'toc|table[ -]of[ -]contents?|目录',
      }],
    ],
    // rehypePlugins: [],
    // extendDefaultPlugins: false, // 配置上面两个插件项时是否保留默认插件 astro@2.0.0 中舍弃并拆分为 gfm,smartypants
    gfw: true, // 显式定义内置插件启用与否，代替 extendDefaultPlugins --> Added in: astro@2.0.0 BETA
    smartypants: true, // 显式定义内置插件启用与否，代替 extendDefaultPlugins --> Added in: astro@2.0.0 BETA
    // remarkRehype: {},
  },

  // 集成
  integrations: [
    UnoCSS({
      presets: [
        UnoCSSPresetUno(),
      ],
    }),
  ], // 扩展 Astro 功能 添加框架支持（如 Solid.js）、新功能（如站点地图）和新库支持（如 Partytown 和 Turbolinks）

  // vite
  vite: {
    // ...
    plugins: [], // 直接在 Astro 项目中添加自定义 Vite 插件
  },
})
