---
update: 2023-07-13 16:40
title: ECMAScript 新特性记录
description: ECMAScript 新特性记录
date: 2023-07-12 09:50
tags:
  - ECMAScript
head:
  - - meta
    - name: keywords
      content: ECMAScript 新特性 记录
---

## 目录

## 背景

TC39 是一个由各大浏览器厂商、JavaScript 引擎厂商、各大技术社区、各大技术公司、各大高校、各大研究机构等组成的委员会, 负责制定 ECMAScript 标准.

### 标准修订和日程安排

> [The TC39 Process](https://tc39.es/process-document/)

TC39 打算在每年 7 月向 ECMA 大会提交一份规范以供批准. 以下是制定新规范的大致时间表:

- 2月1日: 生成候选草案.
- 2月-3月: 60天免版税退出期.
- 3月 TC39 会议: 第 4 阶段提案被合并, 最终语义被批准, 新的规范版本从 master 分支出来. 从这时起, 只接受编辑更改.
- 4月-6月: ECMA CC 和 ECMA GA 审查期.
- 7月: ECMA 大会批准新标准.

### 已完成的提案

> [Finished Proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md)

已完成的提案是已经达到第 4 阶段的提案, 并包含在规范的[最新草案](https://tc39.es/ecma262/)中.

## ECMAScript 2015(ES6)

- `let` 和 `const`
- 解构赋值
- 模板字符串
- 扩展运算符
- 箭头函数
- 函数参数默认值
- 剩余参数
- 对象属性简写
- 对象方法简写
- ...

## ECMAScript 2016(ES7)

- `Array.prototype.includes`
  - `Array.prototype.includes`
  - `TypedArray.prototype.includes`
- 指数运算符: `**`

### `Array.prototype.includes`

> [提议](https://github.com/tc39/proposal-Array.prototype.includes) |

#### `Array.prototype.includes`

> [规范](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.includes) | 
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) |

#### `TypedArray.prototype.includes`

> [规范](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-%typedarray%.prototype.includes) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/includes) |

### 指数运算符

> [提议](https://github.com/tc39/proposal-exponentiation-operator) |
> [规范](https://tc39.es/ecma262/#sec-exp-operator) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation) |

## ECMAScript 2017(ES8)

- `Object.values`/`Object.entries`
- String padding
  - `String.prototype.padStart`
  - `String.prototype.padEnd`
- `Object.getOwnPropertyDescriptors`
- Trailing commas in function parameter lists and calls
- Async Functions
- Shared Memory and Atomics

### `Object.values`/`Object.entries`

#### `Object.values`

> [提议](https://github.com/tc39/proposal-object-values-entries) |
> [规范](https://tc39.es/ecma262/#sec-object.values) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) |

#### `Object.entries`

> [提议](https://github.com/tc39/proposal-object-values-entries) |
> [规范](https://tc39.es/ecma262/#sec-object.entries) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) |

### String padding

#### `String.prototype.padStart`

> [提议](https://github.com/tc39/proposal-string-pad-start-end) |
> [规范](https://tc39.es/ecma262/#sec-string.prototype.padstart) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) |

#### `String.prototype.padEnd`

> [提议](https://github.com/tc39/proposal-string-pad-start-end) |
> [规范](https://tc39.es/ecma262/#sec-string.prototype.padend) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd) |

### `Object.getOwnPropertyDescriptors`

> [提议](https://github.com/tc39/proposal>object>getownpropertydescriptors) |
> [规范](https://tc39.es/ecma262/#sec-object.getownpropertydescriptors) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors) |

### Trailing commas in function parameter lists and calls

> [提议](https://github.com/tc39/proposal-trailing-function-commas) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#prod-FormalParameters) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas#parameter_definitions) |

> 函数参数列表和调用中的尾随逗号

### Async Functions

> [提议](https://github.com/tc39/proposal-async-await) |
> [规范](https://tc39.es/ecma262/#sec-async-function-definitions) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) |

### Shared Memory and Atomics

> [提议](https://github.com/tc39/proposal-ecmascript-sharedmem) |
> [规范](https://tc39.es/ecma262/#sec-shared-memory-guidelines) |

> 共享内存和原子操作

## ECMAScript 2018(ES9)

- Lifting template literal restriction
- `s`(`dotAll`) flag for regular expressions
  - 修饰符: `s`
  - `RegExp.prototype.dotAll`
- RegExp named capture groups
- Rest/Spread Properties
- RegExp Lookbehind Assertions
  - `?<=`
  - `?<!`
- RegExp Unicode Property Escapes
- `Promise.prototype.finally`
- Asynchronous Iteration
  - `for await...of`
  - `async function*`

### Lifting template literal restriction

> [提议](https://tc39.es/proposal-template-literal-revision/) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-template-literals) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates_and_escape_sequences) |

> 解除模板字符串限制(`\`转义不再报错, **仅在作为标签函数的参数时生效**)

### `s`(`dotAll`) flag for regular expressions

> [提议](https://github.com/tc39/proposal-regexp-dotall-flag) |

使用 `s` 修饰符, `.` 可以匹配任意字符, 包括换行符(`\n`)

#### 修饰符: `s`

> [规范](https://tc39.es/ecma262/multipage/text-processing.html#sec-regexpinitialize) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp) |

#### `RegExp.prototype.dotAll`

> [规范](https://tc39.es/ecma262/#sec-get-regexp.prototype.dotAll) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) |

### RegExp named capture groups

> [提议](https://github.com/tc39/proposal-regexp-named-groups) |
> [规范](https://tc39.es/ecma262/multipage/text-processing.html#sec-static-semantics-capturinggroupname) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) |

### Rest/Spread Properties

剩余/扩展属性

#### Rest Properties

> [提议](https://github.com/tc39/proposal-object-rest-spread) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#prod-ObjectAssignmentPattern) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#rest_property) |

#### Spread Properties

> [提议](https://github.com/tc39/proposal-object-rest-spread) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#prod-PropertyDefinition) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) |

### RegExp Lookbehind Assertions

> [提议](https://github.com/tc39/proposal-regexp-lookbehind) |
> [规范](https://tc39.es/ecma262/multipage/text-processing.html#prod-Assertion) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) |

#### `?<=`

#### `?<!`

### RegExp Unicode Property Escapes

> [提议](https://github.com/tc39/proposal-regexp-unicode-property-escapes) |
> [规范](https://tc39.es/ecma262/multipage/text-processing.html#prod-CharacterClassEscape) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes) |

### `Promise.prototype.finally`

> [提议](https://github.com/tc39/proposal-promise-finally) |
> [规范](https://tc39.es/ecma262/#sec-promise.prototype.finally) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) |

### Asynchronous Iteration

> [提议](https://github.com/tc39/proposal-async-iteration) |
> [规范](https://tc39.es/ecma262/#sec-asynciteratorprototype) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator) |

#### `for await...of`

> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-for-in-and-for-of-statements) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)

#### Async generator functions

> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-async-generator-function-definitions) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*)

## ECMAScript 2019(ES10)

- Optional `catch` binding
- JSON superset (**TBC**)
- `Symbol.prototype.description`
- `Function.prototype.toString` revision
- `Object.fromEntries`
- Well-formed `JSON.stringify`
- `String.prototype.{trimStart,trimEnd}`
  - `String.prototype.trimStart`
  - `String.prototype.trimEnd`
- `Array.prototype.{flat,flatMap}`
  - `Array.prototype.flat`
  - `Array.prototype.flatMap`

### Optional `catch` binding

> [提议](https://github.com/tc39/proposal-optional-catch-binding) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#prod-Catch) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#catch_binding) |

`catch` 语句中的参数及括号可以省略

### JSON superset

> [提议](https://github.com/tc39/proposal-json-superset) |

### `Symbol.prototype.description`

> [提议](https://github.com/tc39/proposal-Symbol-description) |
> [规范](https://tc39.es/ecma262/#sec-symbol.prototype.description) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description) |

### `Function.prototype.toString` revision

> [提议](https://github.com/tc39/Function-prototype-toString-revision) |
> [规范](https://tc39.es/ecma262/#sec-function.prototype.tostring) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) |

### `Object.fromEntries`

> [提议](https://github.com/tc39/proposal-object-from-entries) |
> [规范](https://tc39.es/ecma262/#sec-object.fromentries) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) |

### Well-formed `JSON.stringify`

> [提议](https://github.com/tc39/proposal-well-formed-stringify) |
> [规范](https://tc39.es/ecma262/#sec-quotejsonstring) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#well-formed_json.stringify) |

### `String.prototype.{trimStart,trimEnd}`

> [提议](https://github.com/tc39/proposal-string-left-right-trim) |

#### `String.prototype.trimStart`

> [规范](https://tc39.es/ecma262/#sec-string.prototype.trimstart) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) |

#### `String.prototype.trimEnd`

> [规范](https://tc39.es/ecma262/#sec-string.prototype.trimend) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd) |

### `Array.prototype.{flat,flatMap}`

> [提议](https://github.com/tc39/proposal-flatMap) |

#### `Array.prototype.flat`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.flat) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) |

#### `Array.prototype.flatMap`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.flatmap) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) |

## ECMAScript 2020(ES11)

- `String.prototype.matchAll`
- `import()`
- `BigInt`
- `Promise.allSettled`
- `globalThis`
- `for-in` mechanics
- Optional chaining: 可选链运算符
- Nullish coalescing Operator: 空值合并运算符
- `import.meta`

### `String.prototype.matchAll`

> [提议](https://github.com/tc39/proposal-string-matchall) |
> [规范](https://tc39.es/ecma262/#sec-string.prototype.matchall) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) |

### `import()`

> [提议](https://github.com/tc39/proposal-dynamic-import) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-import-calls) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) |

### `BigInt`

> [提议](https://github.com/tc39/proposal-bigint) |
> [规范](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-bigint-objects) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) |

### `Promise.allSettled`

> [提议](https://github.com/tc39/proposal-promise-allSettled) |
> [规范](https://tc39.es/ecma262/#sec-promise.allsettled) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) |

### `globalThis`

> [提议](https://github.com/tc39/proposal-global) |
> [规范](https://tc39.es/ecma262/#sec-globalthis) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) |

### `for-in` mechanics

> [提议](https://github.com/tc39/proposal-for-in-order) |
> [规范](https://tc39.es/ecma262/#sec-enumerate-object-properties) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#enumeration_order) |

### Optional chaining

> [提议](https://github.com/tc39/proposal-optional-chaining) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#prod-OptionalExpression) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) |

### Nullish coalescing Operator

> [提议](https://github.com/tc39/proposal-nullish-coalescing) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#prod-CoalesceExpression) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) |

### `import.meta`

> [提议](https://github.com/tc39/proposal-import-meta) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#prod-ImportMeta) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta) |


## ECMAScript 2021(ES12)

- `String.prototype.replaceAll`
- `Promise.any`
- WeakRefs
- Logical Assignment Operators: 逻辑赋值操作符
  - `&&=`
  - `||=`
  - `??=`
- Numeric Separators: 数字分隔符

### `String.prototype.replaceAll`

> [提议](https://github.com/tc39/proposal-string-replaceall) |
> [规范](https://tc39.es/ecma262/#sec-string.prototype.replaceall) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) |

### `Promise.any`

> [提议](https://github.com/tc39/proposal-promise-any) |
> [规范](https://tc39.es/ecma262/#sec-promise.any) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) |

### WeakRefs

> [提议](https://github.com/tc39/proposal-weakrefs) |
> [规范](https://tc39.es/ecma262/#sec-weak-ref-objects) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) |

### Logical Assignment Operators

> [提议](https://github.com/tc39/proposal-logical-assignment) |
> [规范](https://tc39.es/ecma262/#sec-assignment-operators) |

#### `&&=`

> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)

#### `||=`

> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)

#### `??=`

> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator#logical_nullish_assignment)

### Numeric Separators

> [提议](https://github.com/tc39/proposal-numeric-separator) |
> [规范](https://tc39.es/ecma262/#sec-literals-numeric-literals) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_separators) |

## ECMAScript 2022(ES13)

- Class Fields
  - Field declarations(Public fields)
  - Private fields
- RegExp Match Indices
  - 修饰符 `d`
  - `RegExp.prototype.hasIndices`
- Top-level `await`
- Ergonomic brand checks for private fields
- `.at()`
  - `String.prototype.at`
  - `Array.prototype.at`
  - `TypedArray.prototype.at`
- Accessible `Object.prototype.hasOwnProperty`: `Object.hasOwn`
- Class Static Block
- Error Cause

### Class Fields

> [提议](https://github.com/tc39/proposal-class-fields) |

#### Field declarations(Public fields)

> [规范](https://tc39.es/ecma262/#prod-FieldDefinition) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) |

#### Private fields

> [规范](https://tc39.es/ecma262/#prod-PrivateIdentifier) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) |

### RegExp Match Indices

> [提议](https://github.com/tc39/proposal-regexp-match-indices) |

#### 修饰符 `d`

#### `RegExp.prototype.hasIndices`

> [规范](https://tc39.es/ecma262/multipage/text-processing.html#sec-get-regexp.prototype.hasIndices) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices) |

### Top-level `await`

> [提议](https://github.com/tc39/proposal-top-level-await) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#prod-AwaitExpression) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await) |

### Ergonomic brand checks for private fields

> [提议](https://github.com/tc39/proposal-private-fields-in-in) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-relational-operators) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in#using_the_in_operator_to_implement_branded_checks) |

使 `in` 操作符可以用于检查私有字段

### `.at()`

> [提议](https://github.com/tc39/proposal-relative-indexing-method) |

#### `String.prototype.at`

> [规范](https://tc39.es/ecma262/#sec-string.prototype.at) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at) |

#### `Array.prototype.at`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.at) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) |

#### `TypedArray.prototype.at`

> [规范](https://tc39.es/ecma262/#sec-%typedarray%.prototype.at) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/at) |

### Accessible `Object.prototype.hasOwnProperty`: `Object.hasOwn`

> [提议](https://github.com/tc39/proposal-accessible-object-hasownproperty) |
> [规范](https://tc39.es/ecma262/#sec-object.hasown) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn) |

### Class Static Block

> [提议](https://github.com/tc39/proposal-class-static-block) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#prod-ClassStaticBlock) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks) |

### Error Cause

> [提议](https://github.com/tc39/proposal-error-cause) |
> [规范](https://tc39.es/ecma262#sec-installerrorcause) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) |

## ECMAScript 2023(ES14) Coming

- Array find from last
  - `Array.prototype.findLast`
  - `Array.prototype.findLastIndex`
  - `TypedArray.prototype.findLast`
  - `TypedArray.prototype.findLastIndex`
- Hashbang Grammar
- Symbols as WeakMap keys
- Change Array by Copy
  - `Array.prototype.toReversed`
  - `Array.prototype.toSorted`
  - `Array.prototype.toSpliced`
  - `Array.prototype.with`
  - `TypedArray.prototype.toReversed`
  - `TypedArray.prototype.toSorted`
  - `TypedArray.prototype.with`

### Array find from last

> [提议](https://github.com/tc39/proposal-array-find-from-last) |

#### `Array.prototype.findLast`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.findlast) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast) |

#### `Array.prototype.findLastIndex`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.findlastindex) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex) |

#### `TypedArray.prototype.findLast`

> [规范](https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findLast) |

#### `TypedArray.prototype.findLastIndex`

> [规范](https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findLastIndex) |

### Hashbang Grammar

> [提议](https://github.com/tc39/proposal-hashbang) |
> [规范](https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html#sec-hashbang) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#hashbang_comments) |

### Symbols as WeakMap keys

> [提议](https://github.com/tc39/proposal-symbols-as-weakmap-keys) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols) |

### Change Array by Copy

> [提议](https://github.com/tc39/proposal-change-array-by-copy) |

#### `Array.prototype.toReversed`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.toreversed) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed) |

#### `Array.prototype.toSorted`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.tosorted) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) |

#### `Array.prototype.toSpliced`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.tospliced) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced) |

#### `Array.prototype.with`

> [规范](https://tc39.es/ecma262/#sec-array.prototype.with) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with) |

#### `TypedArray.prototype.toReversed`

> [规范](https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toReversed) |

#### `TypedArray.prototype.toSorted`

> [规范](https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toSorted) |

#### `TypedArray.prototype.with`

> [规范](https://tc39.es/ecma262/#sec-%typedarray%.prototype.with) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/with) |

## ECMAScript 2024(ES15) Coming

- Well-Formed Unicode Strings
- `Atomics.waitAsync`
- RegExp v flag with set notation + properties of strings

