```
const toString = Object.prototype.toString;
const toType = value => {
    return value === null ? 'Null' : toString.call(value).slice(8, -1);
};
const extend = function(target, defaults) {
    let object;
    const type = toType(target);

    if (type === 'Object') {
        object = Object.create(defaults || {});
    } else if (type === 'Array') {
        object = [].concat(defaults || []);
    }

    if (object) {
        for (let index in target) {
            if (Object.hasOwnProperty.call(target, index)) {
                object[index] = extend(target[index], object[index]);
            }
        }
        return object;
    } else {
        return target;
    }
};
```