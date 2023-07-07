---
update: 2023-07-07 11:23
title: 在你的 Astro 静态站点中添加搜索功能(译)
description: 在你的 Astro 静态站点中添加搜索功能
date: 2023-03-26 22:00
tags: [astro, pagefind]
head:
  - - meta
    - name: keywords
      content: astro pagefind 搜索
---

## 目录

## 原文

[Add Searching To Your Astro Static Site](https://blog.otterlord.dev/post/astro-search/)

## 中文翻译

Astro 是一个很棒的静态站点生成器，但它并没有内置任何搜索工具。虽然有些人可能会使用第三方工具，比如 Algolia，但我想避免依赖第三方服务。

这就是 Pagefind 登场的时候了，它是一个用于索引内容并在静态站点上呈现搜索结果的静态搜索库。Pagefind 是框架无关的，但设置可能会有点棘手。

### 安装 Pagefind

将 Pagefind 安装为开发依赖项。该包包含一个 CLI 工具，用于生成实际在你的网站上运行的 JavaScript。

`npm install --save-dev pagefind`


### 添加 postbuild 脚本

Pagefind 需要在你的网站构建之后运行，因为它需要分析 HTML 文件来生成搜索索引。在 `package.json` 中添加一个 postbuild 脚本，以在你的网站构建之后运行 Pagefind。源目录将是 Astro 的构建输出（dist），并且 bundle 目录（总是放在源目录内）将是 pagefind。

```json
{
  // ...
  "scripts": {
    // ...
    "postbuild": "pagefind --source dist --bundle-dir pagefind"
  }
  // ...
}
```

### 添加一个 dev 端点

我在第一次解决这个问题时遇到了一个大问题，就是在开发时没有办法将 pagefind 捆绑包注入到你的站点中，因为站点只存在于内存中。我通过向站点添加一个 dev 端点来解决了这个问题，该端点将提供一个“假”的 Pagefile 脚本，其中填充了 0 个结果。这样，该脚本将始终可用，并且搜索结果始终为空。这有点 hacky，但它能起作用。在 `src/pages/pagefind/pagefind.js.ts` 中创建一个新文件，并将其内容设置如下：

```ts
import type { APIContext } from 'astro'

export async function get({}: APIContext) {
  return {
    body: 'export const search = () => {return {results: []}}'
  }
}
```

这可能不是最好的方法，但它可以防止在开发时尝试访问 pagefind 脚本时站点抛出异常。在构建时，由于 Pagefind 在站点构建完成后运行，实际的 Pagefind 脚本将替换掉 dev 端点。

### 添加一个搜索栏

为了保持简单，我将只使用一个 `<input>` 元素作为搜索栏，以展示如何集成 Pagefind 库。你可以选择将其放置在站点上的任何位置。如果使用默认的 Astro 模板，可以将其添加到 `src/pages/index.astro` 中。

这里我们要做的是，监听搜索栏的 `input` 事件，然后加载 Pagefind 脚本（如果尚未加载）。一旦脚本加载完成，我们就可以使用 `search` 函数来搜索索引。`search` 函数返回结果。每个结果都有一个 `data` 函数，它返回该结果的数据。在这种情况下，我们将使用 `data` 函数来获取结果的标题和链接。

```astro
<input id="search" type="text" placeholder="Search...">

<div id="results" />

<script is:inline>
  document.querySelector('#search')?.addEventListener('input', async e => {
    // only load the pagefind script once
    if (e.target.dataset.loaded !== 'true') {
      e.target.dataset.loaded = 'true'
      // load the pagefind script
      window.pagefind = await import('/pagefind/pagefind.js')
    }

    // search the index using the input value
    const search = await window.pagefind.search(e.target.value)

    // clear the old results
    document.querySelector('#results').innerHTML = ''

    // add the new results
    for (const result of search.results) {
      const data = await result.data()
      document.querySelector('#results').innerHTML += `
        <a href="${data.url}">
          <h3>${data.meta.title}</h3>
          <p>${data.excerpt}</p>
        </a>`
    }
  })
</script>
```

Pagefind 的优点是它不会影响你的网站的性能。只有当用户开始在搜索栏中输入时，脚本才会被加载。这样你就可以保持所有 100s 的 Lighthouse 分数 😎


### 从索引中排除元素

默认情况下，Pagefind 将索引 `body` 元素中的所有文本，但是会排除诸如 `nav`、`script` 和 `form` 之类的元素。如果你想从索引中排除其他元素，可以向元素添加 `data-pagefind-ignore` 属性。我建议在任何列表或存档页面上执行此操作，以防止索引因重复内容而膨胀。

### 总结

现在你可以向你的用户提供一个好的搜索体验，而不需要第三方提供商。我花了几个小时才弄好这个，所以希望这能节省你一些调试时间。你无法在开发时搜索你的网站，但是你可以随时构建你的网站来测试它。

如果你想看看它的实际效果，你可以查看这篇文章的源代码。

## 本站实现

[github: Search.vue](https://github.com/byronogis/my-website-base-astro/blob/main/src/components/Search.vue)
