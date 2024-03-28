---
title: 前言
author: 易函123
date: '2024-03-28'
---

## unicode 相关方法

> JavaScript 字符串使用 UTF-16 代码单元表示。每个代码单元可用于表示[U+0000， U+FFFF]范围内的代码点——也称为“基本多语言平面”（BMP）。您可以使用“”语法表示 BMP 平面中的单个代码点。您还可以使用\x00…\xff 表示法表示[U+0000，U+0255]中的代码单元。

例如：表情字符串

```javascript
'\ud83d\udc0e\ud83d\udc71\u2764'
// '🐎👱❤'
```

```javascript
'\ud83d\udc0e\ud83d\udc71\u2764'.length // 5
'🐎👱❤'.length //5
```

虽然该字符串由 5 个代码单元组成，但我们知道长度实际上应该是三个-因为只有三个表情符号。

以 Object. key 为例，仍然有五个代码单元长。

```javascript
console.log(Object.keys('🐎👱❤')) // ['0', '1', '2', '3', '4']
```

用 for 循环也得不到自己想要的

```javascript
const text = '🐎👱❤'
for (let i = 0; i < text.length; i++) {
  console.log(text[i])
  // <- '?'
  // <- '?'
  // <- '?'
  // <- '?'
  // <- '❤'
}
```

在 ES6 中，我们可以使用字符串迭代器来检查代码点。字符串可迭代对象生成的迭代器意识到代码单元循环的这种限制，因此它们会产生代码点。

```javascript
for (let codePoint of '🐎👱❤') {
  console.log(codePoint)
  // <- '🐎'
  // <- '👱'
  // <- '❤'
}
```

```javascript
;[...'🐎👱❤'].length // 3
```

### String.prototype.codePointAt

> ES6 提供了 codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```javascript
'\ud83d\udc0e\ud83d\udc71\u2764'.codePointAt(0)
// 128014
'\ud83d\udc0e\ud83d\udc71\u2764'.codePointAt(2)
// 128113
'\ud83d\udc0e\ud83d\udc71\u2764'.codePointAt(4)
// 10084

for (let codePoint of '\ud83d\udc0e\ud83d\udc71\u2764') {
  console.log(codePoint.codePointAt(0))
  // 128014
  // 128113
  // 10084
}
```

点运算+map

```javascript
;[...'\ud83d\udc0e\ud83d\udc71\u2764'].map((cp) => cp.codePointAt(0))
// [128014, 128113, 10084]
```

然后，您可以使用新的 unicode 代码点转义语法\u{codePoint}将这些以 10 为底的整数的十六进制（base-16）表示并将它们呈现在字符串上。此语法允许您表示超出“基本多语言平面”（BMP）的 unicode 代码点，即通常使用语法表示的[U+0000， U+FFFF]范围之外的代码点。

```javascript
for (let codePoint of '\ud83d\udc0e\ud83d\udc71\u2764') {
  let a = codePoint.codePointAt(0).toString(16)
  console.log(a)
  // '1f40e'
  // '1f471'
  // '2764'
}
console.log('\u{1f40e}') // 🐎
console.log('\u{1f471}') // 👱
console.log('\u{2764}') // ❤
```

### String.fromCodePoint

> ES5 提供 String.fromCharCode()方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于 0xFFFF 的字符。 ES6 提供了 String.fromCodePoint()方法，可以识别大于 0xFFFF 的字符，弥补了 String.fromCharCode()方法的不足。

请注意，我如何将 0x 前缀与我们刚才从. codePointAt 获得的简洁的以 16 为底的代码点一起使用。

```javascript
String.fromCodePoint(0x1f40e)
// '🐎'
String.fromCodePoint(0x1f471)
// '👱'
String.fromCodePoint(0x2764)
// '❤'
```

显然，你也可以使用他们的以 10 为底的对应物来达到同样的结果。

```javascript
String.fromCodePoint(128014)
// '🐎'
String.fromCodePoint(128113)
// '👱'
String.fromCodePoint(10084)
// '❤'

String.fromCodePoint(128014, 128113, 10084) // '🐎👱❤'
```

fromCodePoint + codePointAt

```javascript
String.fromCodePoint(
  ...[...'\ud83d\udc0e\ud83d\udc71\u2764'].map((cp) => cp.codePointAt(0))
) // '🐎👱❤'
```

### String.prototype.normalize

> ES6 提供字符串实例的 normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

```javascript
'mañana' === 'mañana' // false

'mañana'.length
// 6
'mañana'.length
// 7
```

normalize 操作这两个字符串后：

```javascript
'mañana'.normalize() === 'mañana'.normalize()

function compare(left, right) {
  return left.normalize() === right.normalize()
}

console.log(compare('mañana', 'mañana')) // true
compare('\x6d\x61\xf1\x61\x6e\x61', '\x6d\x61\x6e\u0303\x61\x6e\x61') // true
```

我们可以在两个字符串上使用`.normalize()`来查看它们是否真的相等。

```javascript
function compare(left, right) {
  return left.normalize() === right.normalize()
}
compare('\x6d\x61\xf1\x61\x6e\x61', '\x6d\x61\x6e\u0303\x61\x6e\x61') // true
compare('123', '123') // true
```

## 原型方法

传统上，JavaScript 只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

## 1.String.prototype.startsWith

一个非常常见的问题是“这个字符串是否以第一个字符串开头？”

在 ES5 中，我们一般使用 indexOf：

```javascript
const foo = 'foo'
console.log(foo.indexOf('fo')) // 0
```

ES6 的话，我们可以 startsWidth 来判断是否是第一个字符

```javascript
const foo = 'foo'
console.log(foo.startsWith('fo')) // true
```

不仅可以判断是否第一个字符，我们还可以判断该字符在其他位置出现是否正确。例如

```javascript
const foo = 'foofoofoo'
console.log(foo.startsWith('foo', 0)) // true
console.log(foo.startsWith('foo', 3)) // true
console.log(foo.startsWith('foo', 6)) // true
console.log(foo.startsWith('foo', 5)) // false
```

## 2.String.prototype.endsWith

endsWith 判断字符串是否以某段字符结尾。

```javascript
'ponyfoo'.endsWith('foo') // true
'ponyfoo'.endsWith('pony') // false
```

就像. startsWith 一样，我们有一个位置索引来指示查找应该在哪里结束。它默认为字符串的长度。

```javascript
'ponyfoo'.endsWith('foo', 7)
// true
'ponyfoo'.endsWith('pony', 0)
// false
'ponyfoo'.endsWith('pony', 4)
// true
```

## 3.String.prototype.includes

您可以使用.include 来确定一个字符串是否包含另一个字符串。

```javascript
'foofoo'.includes('foo')
// true
'foofoo'.includes('sf')
// false
```

让我们来对比下.indexOf 和.includes 的使用。

```javascript
'foofoo'.indexOf('foo') !== -1 // true
'foofoo'.indexOf('zas') !== -1 // false

'foofoo'.includes('oo', 1) // true
'foofoo'.includes('oo', 4) // true
'foofoo'.includes('oo', 2) // true
'foofoo'.includes('oo', 5) // false
```

## 3.String.prototype.repeat

> repeat 方法返回一个新字符串，表示将原字符串重复 n 次。

```javascript
'na'.repeat(0)
// ''
'na'.repeat(1)
// 'na'
'na'.repeat(2)
// 'nana'
'na'.repeat(5)
// 'nanananana'
```

提供的计数应该是一个正的有限数。

```javascript
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError
```

但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat 视同为 0。

```javascript
'na'.repeat(-0.9) // ""
```

如果 repeat 的参数是字符串，则会先转换成数字。

```javascript
'na'.repeat('na')
// ''
'na'.repeat('3')
// 'nanana'
```

参数 NaN 等同于 0。

```javascript
'na'.repeat(NaN) // ""
```

小数会向下取整。

```javascript
'na'.repeat(3.9) // 'nanana'
```
