# assets
> Vue.component
> Vue.filter
> Vue.directive

```
function initAssetRegisters (Vue){
    ["component","filter","directive"].foreach(type=>{
        Vue[type] = function(id,definition){
            if (!definition) {
                return this.options[type + 's'][id]
            } else {
                if (type === 'component' && isPlainObject(definition)) {
                    definition.name = definition.name || id
                    definition = this.options._base.extend(definition)
                }
                if (type === 'directive' && typeof definition === 'function') {
                    definition = { bind: definition, update: definition }
                }

                this.options[type + 's'][id] = definition
                return definition
            }
        }
    })
}

[isPlainObject](./../../shared/util.md)

```
