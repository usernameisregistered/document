# index 

将所有的方法挂载到Vue下


```
function initGlobalAPI (){
    const configDef = {}
    // [config](https://github.com/vuejs/vue/blob/dev/src/core/config.js) 默认配置申明
    configDef.get = () => config

    Object.defineProperty(Vue, 'config', configDef)
}

Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
}

Vue.set = set
Vue.delete = del
Vue.nextTick = nextTick

Vue.observable = obj=> {
    observe(obj)
    return obj
}

Vue.options = Object.create(null)

["component","filter","directive"].foreach(type=>{
    Vue.options[type + 's'] = Object.create(null)
})

Vue.options._base = Vue
// [extend](./../../shared/util.md)
extend(Vue.options.components, builtInComponents)

//[initUse](./use.md)
initUse(Vue)
//[initMixin](./mixin.md)
initMixin(Vue)
//[initExtend](./extend.md)
initExtend(Vue)
//[initAssetRegisters](./assets.md)
initAssetRegisters(Vue)
```