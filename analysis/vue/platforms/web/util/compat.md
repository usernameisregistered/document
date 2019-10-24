```
import { inBrowser } from 'core/util/index'
```
从[core/util/index](../../../core/util/index.md) 导入inBrowser

```
let div
function getShouldDecode (href: boolean): boolean {
  div = div || document.createElement('div')
  div.innerHTML = href ? `<a href="\n"/>` : `<div a="\n"/>`
  return div.innerHTML.indexOf('&#10;') > 0
}
```

```
export const shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false
```

```
export const shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false
```