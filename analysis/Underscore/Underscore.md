## Underscore一个JavaScript实用库，提供了一整套函数式编程的实用功能，但是没有扩展任何JavaScript内置对象

> 判断是不是对象
```
function isObject(obj){
    let type = typeof obj
    return type === "function" || type === "object" && !!obj
}
```

> 生成判断指定对象是否具有指定属性的函数并返回其指定键的值
```
function shallowProperty(attr){
    return function(obj){
        return obj == null ? void 0 : obj[key]
    }
}
```
### Function 的属性

| attr | desc |
| - | - | 
| length | 属性指明函数的形参个数 |
| name | 属性返回函数实例的名称 |
| caller | 获取调用函数的具体对象 |
| displayName | 属性返回函数实例的名称 |

> 剩余参数的实现方式
```
function restArguments(func, startIndex){
    // +startIndex 类型强转为数字
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
        var length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length),
            index = 0;
        for (; index < length; index++) {
            rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
            case 0: return func.call(this, rest);
            case 1: return func.call(this, arguments[0], rest);
            case 2: return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
    }
}
```
> Object.create的实现方式
```
function create(prototype){
    if (!isObject(prototype)) return {};
    if (Object.create) return Object.create(prototype);
    let ctor = function(){}
    ctor.prototype = prototype
    let result = new ctor;
    return result;
}

```

> 过渡函数
```
var optimizeCb = function(func, context, argCount) {
    // void 0 永远返回undefined
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
        case 1: return function(value) {
            return func.call(context, value);
        };
        case 3: return function(value, index, collection) {
            return func.call(context, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
      return func.apply(context, arguments);
    };
}
```

> 判断是不是类数组
```
function isArrayList(collection){
    let length = shallowProperty('length')(collection);
    return typeof length == 'number' && length >= 0 && length <= (Math.pow(2, 53) - 1)
}
```

> Object.keys的实现方法
```
function keys(obj){
    if (!isObject(obj)) return [];
    if (Object.keys) return Object.keys(obj);
    let keys = [];
    for (let key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) keys.push(key);
    return keys;
}
```

> foreach的实现
```
function each(obj, iteratee, context){
    iteratee = optimizeCb(iteratee, context)
    let i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      let key = keys(obj);
      for (i = 0, length = key.length; i < length; i++) {
        iteratee(obj[key[i]], key[i], obj);
      }
    }
    return obj;
}
```

> map的实现
```
function map(obj, iteratee, context){
    iteratee = optimizeCb(iteratee, context)
    let key = !isArrayLike(obj) && keys(obj),
        length = (key || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = key ? key[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
}
```