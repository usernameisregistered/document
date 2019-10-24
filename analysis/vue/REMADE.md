## 阅读源码步骤

### 第一步 [shared/util](./shared/util.md)

### 第二步 platforms


### 备注
> **Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与处理器对象的方法相同。Reflect不是一个函数对象，因此它是不可构造的。所有的属性和方法均为静态的

| 方法 | 描述 | 
| - | - |
| apply | 对一个函数进行调用操作，同时可以传入一个数组作为调用参数 |
| constructor | 对构造函数进行 new 操作，相当于执行 new target(...args)。 |
| defineProperty | 和 Object.defineProperty() 类似。 |
| deleteProperty | 作为函数的delete操作符，相当于执行 delete target[name] |
| getOwnPorpertyDescriptor | 类似于 Object.getOwnPropertyDescriptor() |
| getPrototypeOf | 类似于 Object.getPrototypeOf() |
| has | 判断一个对象是否存在某个属性 |
| isExtensible | 类似于 Object.isExtensible() |
| pwnKeys | 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响 |
| preventExtensions | 类似于 Object.preventExtensions() |
| set | 将值分配给属性的函数 |
| setPrototypeOf | 类似于 Object.setPrototypeOf() |