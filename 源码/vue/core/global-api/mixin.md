## 混入

```
function initMixin(Vue){
    Vue.mixin = function(mixin){
        this.options = mergeOptions(this.options, mixin)
        return this
    }
}

function mergeOptions (parent,child,vm){
    if (!child._base) {
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm)
        }
        if (child.mixins) {
            for (let i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm)
            }
        }
    }

    const options = {}
    let key
    for (key in parent) {
        mergeField(key)
    }
    for (key in child) {
        if (Object.prototype.hasOwnProperty.call(parent, key)) {
            mergeField(key)
        }
    }

    function defaultStrat(parentVal,childVal){
        return childVal === undefined ? parentVal : childVal
    }

    function mergeField (key) {
        const strat = Object.create(key) || defaultStrat
        options[key] = strat(parent[key], child[key], vm, key)
    }

    return options
}
```

## Object.create
语法 Object.create(proto[, propertiesObject])
参数 
    proto：新创建对象的原型对象
    propertiesObject：可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数
返回：一个新对象，带着指定的原型对象和属性
