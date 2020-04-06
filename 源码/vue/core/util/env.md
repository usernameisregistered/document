```
export const hasProto = '__proto__' in {}
```

```
export const inBrowser = typeof window !== 'undefined'
```

```
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
```

```
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
```

```
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
```

```
export const isIE = UA && /msie|trident/.test(UA)
```

```
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
```

```
export const isEdge = UA && UA.indexOf('edge/') > 0
```

```
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
```

```
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
```

```
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
```

```
export const isPhantomJS = UA && /phantomjs/.test(UA)
```

```
export const isFF = UA && UA.match(/firefox\/(\d+)/)
```

```
export const nativeWatch = ({}).watch
```
> 火狐浏览器对象有一个watch方法

```
export let supportsPassive = false
if (inBrowser) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', ({
      get () {
        /* istanbul ignore next */
        supportsPassive = true
      }
    }: Object)) // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts)
  } catch (e) {}
}
```
## 是不是服务端渲染
```
let _isServer
export const isServerRendering = () => {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}
```

```
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__
```

## isNative
```
export function isNative (Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
```
> 判断函数是原生的还是来自于库或者开发者写的

```
export const hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)
```

```
export interface SimpleSet {
  has(key: string | number): boolean;
  add(key: string | number): mixed;
  clear(): void;
}
```
> 导出SimpleSet的接口格式

```
let _Set
if (typeof Set !== 'undefined' && isNative(Set)) {
  _Set = Set
} else {
  _Set = class Set implements SimpleSet {
    set: Object;
    constructor () {
      this.set = Object.create(null)
    }
    has (key: string | number) {
      return this.set[key] === true
    }
    add (key: string | number) {
      this.set[key] = true
    }
    clear () {
      this.set = Object.create(null)
    }
  }
}
export { _Set }
```
> 导出Set的替代品 _Set