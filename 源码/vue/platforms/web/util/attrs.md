```
import { makeMap } from 'shared/util'
```
> 从 [shared/util](../../../../shared/util.md)导入makeMap 


## isReservedAttr
```
export const isReservedAttr = makeMap('style,class')
```
> 导出保留属性isReservedAttr [style,class]

## mustUseProp
```
const acceptValue = makeMap('input,textarea,option,select,progress')
export const mustUseProp = (tag: string, type: ?string, attr: string): boolean => {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}
```
> 输入标签必须使用的属性

## isFalsyAttrValue
```
export const isFalsyAttrValue = (val: any): boolean => {
  return val == null || val === false
}
```
> 判断值是不是 **false** 和 **null**



## isEnumeratedAttr
```
export const isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck')
```
> 导出枚举属性 **contenteditable** **draggable** **spellcheck**

## convertEnumeratedValue
```
const isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only')

export const convertEnumeratedValue = (key: string, value: any) => {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
}
```
> 导出 转换枚举值的属性值

## isBooleanAttr
```
export const isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible'
)
```
> 导出 值为boolean的属性

## xlinkNS
```
export const xlinkNS = 'http://www.w3.org/1999/xlink'
```
> 导出 **xlinkNS**的值

## isXlink 
```
export const isXlink = (name: string): string => {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
}
```
> 导出 判断是不是Xlink标签

## getXlinkProp
```
export const getXlinkProp = (name: string): string => {
  return isXlink(name) ? name.slice(6, name.length) : ''
}
```
> 导出 获取**xlinkNS**的属性值
