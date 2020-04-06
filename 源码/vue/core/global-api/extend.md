# extend

```
function initExtend(Vue){
    Vue.cid = 0
    let cid = 1

    Vue.extend = function(extendOptions){
        extendOptions = extendOptions || {}
        const Super = this
        const SuperId = Super.cid
        const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
        if (cachedCtors[SuperId]) {
            return cachedCtors[SuperId]
        }

        const name = extendOptions.name || Super.options.name

        const Sub = function VueComponent (options) {
            this._init(options)
        }

        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Sub

        Sub.cid = cid++
    }
    // [mergeOptions](./mixin.md)
    Sub.options = mergeOptions( Super.options, extendOptions)

    Sub['super'] = Super

    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    ['component','directive','filter'].forEach(function (type) {
      Sub[type] = Super[type]
    })

    if (name) {
        Sub.options.components[name] = Sub
    }

    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions

    // [extend](./../../shared/util.md)
    Sub.sealedOptions = extend({}, Sub.options)

    cachedCtors[SuperId] = Sub

    return Sub
}

function initProps (Comp) {
    const props = Comp.options.props
    for (const key in props) {
        proxy(Comp.prototype, `_props`, key)
    }
}

function initComputed (Comp) {
    const computed = Comp.options.computed
    for (const key in computed) {
        defineComputed(Comp.prototype, key, computed[key])
    }
}

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}
function proxy (target,sourceKey,key){
    sharedPropertyDefinition.get = function proxyGetter () {
        return this[sourceKey][key]
    }

    sharedPropertyDefinition.set = function proxySetter (val) {
        this[sourceKey][key] = val
    }

    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function defineComputed (target,key,userDef){
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key)
        sharedPropertyDefinition.set = noop
    } else {
        sharedPropertyDefinition.get = userDef.get ? userDef.cache !== false  ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop
        sharedPropertyDefinition.set = userDef.set || noop
    }

    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter (key){
    return function computedGetter () {
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
            if (watcher.dirty) {
                watcher.evaluate()
            }
            if (Dep.target) {
                watcher.depend()
            }
            return watcher.value
        }
    }
}

function createGetterInvoker(fn) {
    return function computedGetter () {
        return fn.call(this, this)
    }
}

let _isServer
function isServerRendering (){
    if (_isServer === undefined) {
        if (!inBrowser && !inWeex && typeof global !== 'undefined') {
            _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
        } else {
            _isServer = false
        }
    }
    return _isServer
}
```