---
update: 2023-07-12 18:01
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
- 指数运算符: `**`

### `Array.prototype.includes`

> [提议](https://github.com/tc39/proposal-Array.prototype.includes) |
> [规范](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.includes) | 
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) |


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

使用 `s` 修饰符, `.` 可以匹配任意字符, 包括换行符(`\n`)

#### 修饰符: `s`

> [提议](https://github.com/tc39/proposal-regexp-dotall-flag) |
> [规范](https://tc39.es/ecma262/multipage/text-processing.html#sec-regexpinitialize) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp) |

#### `RegExp.prototype.dotAll`

> [提议](https://github.com/tc39/proposal-regexp-dotall-flag) |
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
- Optional chaining
- Nullish coalescing Operator
- `import.meta`

### `String.prototype.matchAll`

> [提议](https://github.com/tc39/proposal-string-matchall) |
> [规范](https://tc39.es/ecma262/#sec-string.prototype.matchall) |
> [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) |


## ECMAScript 2021(ES12)

- `String.prototype.replaceAll`
- `Promise.any`
- WeakRefs
- Logical Assignment Operators
- Numeric Separators

## ECMAScript 2022(ES13)

- Class Fields
- RegExp Match Indices
- Top-level `await`
- Ergonomic brand checks for private fields
- `.at()`
- Accessible `Object.prototype.hasOwnProperty`
- Class Static Block
- Error Cause

## ECMAScript 2023(ES14)

- Array find from last
- Hashbang Grammar
- Symbols as WeakMap keys
- Change Array by Copy

## ECMAScript 2024(ES15)

- Well-Formed Unicode Strings
- `Atomics.waitAsync`
- RegExp v flag with set notation + properties of strings

