> 导出全局变量 template

```
function template(filename, content){
    return content instanceof Object ? render({filename},content) : compile({filename,source: content});
}
template.render = render;
template.compile = compile;
template.defaults = defaults;
```