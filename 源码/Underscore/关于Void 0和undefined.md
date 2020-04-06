# undefined

## 全局属性undefined表示原始值undefined。它是一个JavaScript的 原始数据类型

| undefined 属性的属性特性 | |
| - | - | 
| writable | false |
| enumerable | false |
| configurable | false |

undefined是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined的最初值就是原始数据类型undefined

在现代浏览器（JavaScript 1.8.5/Firefox 4+），自ECMAscript5标准以来undefined是一个不能被配置（non-configurable），不能被重写（non-writable）的属性。即便事实并非如此，也要避免去重写它

一个没有被赋值的变量的类型是undefined。如果方法或者是语句中操作的变量没有被赋值，则会返回undefined（对于这句话持疑惑态度，请查看英文原文来理解）

## 注意 但是它有可能在非全局作用域中被当作标识符（变量名）来使用(因为undefined不是一个保留字))  *虽然大多数不会这么去做*

```
(function(undefined) {
console.log(undefined, typeof undefined) // 'foo' string
})('foo')
```


## Typeof 操作符和undefined

```
if(typeof y === 'undefined') {       // 没有错误，执行结果为true
   console.log("y is " + typeof y )  // y is undefined
}

if(y === undefined) {                // ReferenceError: y is not defined

}
```

## Void操作符和undefined

```
var x;
if(x === void 0) {
    // 执行这些语句
}

// 没有声明y
if(y === void 0) {
    // 抛出一个RenferenceError错误(与`typeof`相比)
}
```