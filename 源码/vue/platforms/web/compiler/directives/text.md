```
import { addProp } from 'compiler/helpers'
```
> 从 [shared/util](../../../shared/util.md)导入makeMap 

```
export default function text (el: ASTElement, dir: ASTDirective) {
  if (dir.value) {
    addProp(el, 'textContent', `_s(${dir.value})`, dir)
  }
}
```
> 给元素添加文本信息