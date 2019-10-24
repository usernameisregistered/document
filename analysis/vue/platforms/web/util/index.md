
```
import { warn } from 'core/util/index'
```
> 从[core/util/index](./../../../core/util/index.md) 导入inBrowser

```
export * from './attrs'
```
> 从[attrs](attrs.md) 导出所有
> 
```
export * from './class'
```
> 从[class](class.md) 导出所有
> 
```
export * from './element'
```
> 从[attrs](attrs.md) 导出所有

```
export function query (el: string | Element): Element {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      )
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
```
> 查询元素