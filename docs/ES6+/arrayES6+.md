---
title: 前言
author: 易函123
date: '2024-04-02'
---

## includes

> includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

```javascript
console.log([1, 2, 3].includes(2)) // true
console.log([1, 2, 3].includes(4)) // false
console.log([1, 2, NaN].includes(NaN)) // true

// 第二个参数表示搜索的起始位置，默认为0。如果为负数，则表示倒数的位置，如果这时大于数组的长度则会重置为从0开始
console.log([1, 2, 3].includes(2, -4)) // true
console.log([1, 2, 3].includes(2, -3)) // true
console.log([1, 2, 3].includes(2, -2)) // true
console.log([1, 2, 3].includes(2, -1)) // false
console.log([1, 2, 3].includes(2, 0)) // true
console.log([1, 2, 3].includes(2, 1)) // true
console.log([1, 2, 3].includes(2, 2)) // false
console.log([1, 2, 3].includes(2, 3)) // false
console.log([1, 2, 3].includes(2, 4)) // false
```

## flat

> flat() 方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。

### 语法

```javascript
flat()
flat(depth)
```

depth 可选
指定要提取嵌套数组的结构深度，默认值为 1。

### 案例

```javascript
const arr1 = [0, 1, 2, [3, 4]]

console.log(arr1.flat())
// [0, 1, 2, 3, 4]

const arr2 = [0, 1, [2, [3, [4, 5]]]]

console.log(arr2.flat())
// [0, 1, 2, [3, [4, 5]]]

console.log(arr2.flat(2))
// [0, 1, 2, 3, [4, 5]]

console.log(arr2.flat(Infinity))
// [0, 1, 2, 3, 4, 5]
console.log(arr2.flat(3))
// [0, 1, 2, 3, 4, 5]
```

## flatMap

> flatMap() 方法对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组。它等价于在调用 map() 方法后再调用深度为 1 的 flat() 方法（arr.map(...args).flat()），但比分别调用这两个方法稍微更高效一些。

```javascript
const arr1 = [1, 2, 1]
let result1 = arr1.flatMap((num) => num * 2)
console.log(arr1, result1) // [1, 2, 1] [2, 4, 2]

const arr2 = [1, 2, 1]
let result2 = arr2.flatMap((num) => [num * 2])
console.log(arr2, result2) // [1, 2, 1] [2, 4, 2]

const arr3 = [1, 2, 1]
let result3 = arr2.flatMap((num) => [[num * 2]])
console.log(arr3, result3) // [1, 2, 1] [[2], [4], [2]]
```
