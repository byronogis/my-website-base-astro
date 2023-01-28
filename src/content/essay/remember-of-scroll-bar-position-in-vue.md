---
title: Vue Router 记住页面滚动位置的简单实现
description: 利用内置组件`<keep-alive>`在页面组件得以被缓存的基础上, 再加以`document.documentElement.scrollTop`获取滚动距离, 后返回页面时恢复滚动距离
date: 2021-11-02 22:00
update: 2021-11-02 22:00
tags:
  - vue
head:
  - - meta
    - name: keywords
      content: Vue Router 滚动位置记忆
---


## 目录

> 本质就是, 利用内置组件`<keep-alive>`在页面组件得以被缓存的基础上, 再加以`document.documentElement.scrollTop`获取滚动距离, 后返回页面时恢复滚动距离
> 实现效果, 打开A页面, 滚动至a处, 切换至B页面, 返回A页面, 此时页面位置为a点而非顶部


## 路由出口

```html
  <div class="main">
    <!-- 包裹`<keep-alive>` -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
```

## 页面组件

```js
export default {
  data() {
    return {
      // 储存滚动位置
      scrollTop: 0
    }
  },
  activated() {
    // 进入该组件后读取数据变量设置滚动位置
    // 注意, 此处由页面是否具有 DTD (如: `<!DOCTYPE html>`), 决定具体选择, 详见参考资料
    document.documentElement.scrollTop = this.scrollTop
    // document.body.scrollTop = this.scrollTop;
  },
  beforeRouteLeave(to, from, next) {
    // 离开组件时保存滚动位置
    // 注意, 此时需调用路由守卫`beforeRouterLeave`而非生命周期钩子`deactivated`
    // 因为, 此时利用`deactivated`获取的 DOM 信息已经是新页面得了
    this.scrollTop = document.documentElement.scrollTop
    next()
  },
}
```


## 参考资料

 [document.documentElement和document.body的区别](https://www.cnblogs.com/ckmouse/archive/2012/01/30/2332070.html)
