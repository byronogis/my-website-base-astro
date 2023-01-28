---
title: 使 element-plus 在 vite 项目中自动导入
description: 组件, 图标
tags:
  - vue
  - vite
date: 2022-12-25 10:54
---

## 目录

## 安装依赖

```bash
npm i element-plus @element-plus/icons-vue 

npm i -D unplugin-auto-import unplugin-vue-components unplugin-icons @iconify-json/ep
```

## vite配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: './src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          // <!-- 自动导入必须遵循名称格式 {prefix：默认为i}-{collection：图标集合的名称}-{icon：图标名称}  -->
          prefix: 'i',
          enabledCollections: ['ep'],
        }),
      ],
      dts: './src/components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
  ],
})
```
## 使用

```vue
<script setup lang="ts">
//
</script>

<template>
  <el-row>
    <el-button circle>
      <!-- 目前图标按需导入需要使用插槽以组件方式传入才可使用 -->
      <template #default>
        <i-ep-search />
      </template>
    </el-button>

    <i-ep-search />
    <IEpSearch />
  </el-row>
</template>
```
