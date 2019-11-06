> 导出渲染函数

```
function render(source, data, options){
    compile(source, options)(data)
}
```