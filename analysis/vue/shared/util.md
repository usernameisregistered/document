## emptyObject
```
export const emptyObject = Object.freeze({})
```
> 导出一个空的被冻结的对象 emptyObject 
> 冻结一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值

## 
```
export function isUndef (v: any): boolean %checks {
  return v === undefined || v === null
}
```
> 判断被传入的是不是 **undefined**

## isTrue
```
export function isTrue (v: any): boolean %checks {
  return v === true
}
```
> 判断被传入的是不是 **true**‘

## isFalse
```
export function isFalse  (v: any): boolean %checks {
  return v === false
}
```
> 判断被传入的是不是 **false**

## isPrimitive
```
export function isPrimitive   (value: any): boolean %checks {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
```
> 判断被传入的是不是 **原始简单类型**

## isObject
```
export function isObject (obj: mixed): boolean %checks {
  return obj !== null && typeof obj === 'object'
}
```
> 判断被传入的是不是 **object**

## toRawType
```
export function toRawType (value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}
```
> 获取被传入值的类型

## isPlainObject
```
export function isPlainObject (obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
```
> 获取被传入值的类型是不是Object 

## isRegExp
```
export function isRegExp (v: any): boolean {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}
```
> 判断被传入的是不是 **RegExp**

## isValidArrayIndex
```
export function isValidArrayIndex (val: any): boolean {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}
```
> 判断被传入的是不是可以被强转为 **Number**

## isPromise
```
export function isPromise (val: any): boolean {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function'
}
```
> 判断被传入的是不是 **Promise**

## toString
```
export function toString (val: any): string {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}
```
> 将类型强转为 **String**

## toNumber
```
export function toNumber (val: string): number | string {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}
```
> 将类型强转为 **Number** 转换失败返回自身

## makeMap
```
export function makeMap (
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}
```
> 将一个由**,**连接的字符串转换为对象返回一个判断键是否在对象中的函数

## isBuiltInTag
```
export const isBuiltInTag = makeMap('slot,component', true)
```
> 导出一个内建标签对象

## isReservedAttribute
```
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')
```
> 导出一个保留的属性键对象

## remove
```
export function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```
> 从数组中移除指定的项

## hasOwn
```
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}
```
> 判断对象中是否含有指定的键

## cached
```
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}
```
> 导出一个纯函数的缓存函数

## camelize
```
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
```
> 将中划线命名修改为小驼峰

## capitalize
```
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})
```
> 将首字母大写

## hyphenate
```
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
```
> 将ADFAFAS转换为a-d-f-a-f-a-s

## bind
```
function polyfillBind (fn: Function, ctx: Object): Function {
  function boundFn (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length
  return boundFn
}

function nativeBind (fn: Function, ctx: Object): Function {
  return fn.bind(ctx)
}

export const bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind
```
>  导出函数bind bind的polyfill

## toArray
```
export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
```
> 数组的截取复制

## extend
```
export function extend (to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
```
> 对象属性的复制

## toObject
```
export function toObject (arr: Array<any>): Object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
```
> 将数组转换为对象

## noop
```
export function noop (a?: any, b?: any, c?: any) {}
```
> 死循环

## no
```
export const no = (a?: any, b?: any, c?: any) => false
```
## identity
```
export const identity = (_: any) => _
```
## genStaticKeys
```
export function genStaticKeys (modules: Array<ModuleOptions>): string {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}
```
> 从编译器模块生成包含静态键的字符串

## looseEqual
```
export function looseEqual (a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

```
> 判断2个对象是不是绝对相等

## looseIndexOf
```
export function looseIndexOf (arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}
```
> 返回深度数组和项目相等的层次数

## once
```
export function once (fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```
> 执行一次函数













