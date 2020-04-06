### 样式处理

```
import { cached, extend, toObject } from 'shared/util'
```
> 从[shared/util](./../../../shared/util.md) 导入inBrowser

* border:1px solid #ddd;height:20px;overflow:hidden*
```
export const parseStyleText = cached(function (cssText) {
  const res = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return res
})
```
> 将传入的css文本属性解析为对象

```
function normalizeStyleData (data: VNodeData): ?Object {
  const style = normalizeStyleBinding(data.style)
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}
```
> 将样式追加到虚拟节点

```
export function normalizeStyleBinding (bindingStyle: any): ?Object {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}
```
> 将传入的其他类型的通过v-style的样式转化为对象

```
export function getStyle (vnode: VNodeWithData, checkChild: boolean): Object {
  const res = {}
  let styleData

  if (checkChild) {
    let childNode = vnode
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData)
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData)
  }

  let parentNode = vnode
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData)
    }
  }
  return res
}
```
> 获取虚拟节点的样式
