---
title: 给微软拼音添加小鹤双拼方案
description: 给微软拼音添加小鹤双拼方案
tags: 
  - windows
date: 2022-10-17 10:00
---

## 目录

- 首先打开注册表，找到这个路径

`计算机\HKEY_CURRENT_USER\Software\Microsoft\InputMethod\Settings\CHS`

- 然后新建一个名为 `UserDefinedDoublePinyinScheme0` 的字符串值，数值数据为

`小鹤双拼*2*^*iuvdjhcwfg^xmlnpbksqszxkrltvyovt`
