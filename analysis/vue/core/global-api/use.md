## use 
> 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法

```
fucction initUse (Vue){
     Vue.use = function (plugin: Function | Object) {
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }
        // [toArray](./../../shared/util.md)
        const args = toArray(arguments, 1)
        args.unshift(this)
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args)
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args)
        }

        installedPlugins.push(plugin)
        
        return this
    }
}
```