```
const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/
const fnInvokeRE = /\([^)]*?\);*$/
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/
```

```
const keyCodes: { [key: string]: number | Array<number> } = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    'delete': [8, 46]
}

const keyNames: { [key: string]: string | Array<string> } = {
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  space: [' ', 'Spacebar'],
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete', 'Del']
}
```

```
const genGuard = condition => `if(${condition})return null;`
const modifierCode: { [key: string]: string } = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard(`$event.target !== $event.currentTarget`),
  ctrl: genGuard(`!$event.ctrlKey`),
  shift: genGuard(`!$event.shiftKey`),
  alt: genGuard(`!$event.altKey`),
  meta: genGuard(`!$event.metaKey`),
  left: genGuard(`'button' in $event && $event.button !== 0`),
  middle: genGuard(`'button' in $event && $event.button !== 1`),
  right: genGuard(`'button' in $event && $event.button !== 2`)
}
```

```
 function genHandlers (events: ASTElementHandlers,isNative: boolean): string {
    const prefix = isNative ? 'nativeOn:' : 'on:'
    let staticHandlers = ``
    let dynamicHandlers = ``
    for (const name in events) {
        const handlerCode = genHandler(events[name])
        if (events[name] && events[name].dynamic) {
        dynamicHandlers += `${name},${handlerCode},`
        } else {
        staticHandlers += `"${name}":${handlerCode},`
        }
    }
    staticHandlers = `{${staticHandlers.slice(0, -1)}}`
    if (dynamicHandlers) {
        return prefix + `_d(${staticHandlers},[${dynamicHandlers.slice(0, -1)}])`
    } else {
        return prefix + staticHandlers
    }
}

```


```
function genKeyFilter (keys: Array<string>): string {
  return (
    `if(!$event.type.indexOf('key')&&` +
    `${keys.map(genFilterCode).join('&&')})return null;`
  )
}
```

```
function genFilterCode (key: string): string {
    const keyVal = parseInt(key, 10)
    if (keyVal) {
        return `$event.keyCode!==${keyVal}`
    }
    const keyCode = keyCodes[key]
    const keyName = keyNames[key]
    return (
        `_k($event.keyCode,` +
        `${JSON.stringify(key)},` +
        `${JSON.stringify(keyCode)},` +
        `$event.key,` +
        `${JSON.stringify(keyName)}` +
        `)`
    )
}
```