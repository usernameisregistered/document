## set 

```
//[isValidArrayIndex](./../../shared/util.md)
function set(target,key,val){
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }

    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }

    const ob = target.__ob__
    if (target._isVue || (ob && ob.vmCount)) {
        return val
    }

    if (!ob) {
        target[key] = val
        return val
    }

    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}

function defineReactive(obj,key,val,customSetter,shallow){

}
```

## del

```
function del(target,key){
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1)
        return
    }

     const ob = target.__ob__
    if (target._isVue || (ob && ob.vmCount)) {
        return
    }

    if (!Object.prototype.hasOwnPropert.call(target, key)) {
        return
    }
    delete target[key]

    if (!ob) {
        return
    }
    ob.dep.notify()
}
```