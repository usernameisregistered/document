先读取[es-tokenizer](./es-tokenizer.md)
先读取[tpl-tokenizer](./tpl-tokenizer.md)

```
class Compiler{
    constructor(options) {
        let source = options.source;
        const minimize = options.minimize;
        const htmlMinifier = options.htmlMinifier;
        this.options = options;
        this.stacks = [];
        this.context = [];
        this.scripts = [];
        this.CONTEXT_MAP = {};
        this.ignore = ["$data", "$imports", $$options, ...options.ignore];

        this.internal = {
            [OUT]: `''`,
            [LINE]: `[0,0]`,
            [BLOCKS]: `arguments[1]||{}`,
            [FROM]: `null`,
            [PRINT]: `function(){var s=''.concat.apply('',arguments);${OUT}+=s;return s}`,
            [INCLUDE]: `function(src,data){var s=${OPTIONS}.include(src,data||${DATA},arguments[2]||${BLOCKS},${OPTIONS});${OUT}+=s;return s}`,
            [EXTEND]: `function(from){${FROM}=from}`,
            [SLICE]: `function(c,p,s){p=${OUT};${OUT}='';c();s=${OUT};${OUT}=p+s;return s}`,
            [BLOCK]: `function(){var a=arguments,s;if(typeof a[0]==='function'){return ${SLICE}(a[0])}else if(${FROM}){if(!${BLOCKS}[a[0]]){${BLOCKS}[a[0]]=${SLICE}(a[1])}else{${OUT}+=${BLOCKS}[a[0]]}}else{s=${BLOCKS}[a[0]];if(typeof s==='string'){${OUT}+=s}else{s=${SLICE}(a[1])}return s}}`
        };

        this.dependencies = {
            [PRINT]: [OUT],
            [INCLUDE]: [OUT, OPTIONS, DATA, BLOCKS],
            [EXTEND]: [FROM, /*[*/ INCLUDE /*]*/],
            [BLOCK]: [SLICE, FROM, OUT, BLOCKS]
        };
        this.importContext(OUT);
        if (options.compileDebug) {
            this.importContext(LINE);
        }
        if (minimize) {
            try {
                source = htmlMinifier(source, options);
            } catch (error) {}
        }
        this.source = source;
        this.getTplTokens(source, options.rules, this).forEach(tokens => {
            if (tokens.type === tplTokenizer.TYPE_STRING) {
                this.parseString(tokens);
            } else {
                this.parseExpression(tokens);
            }
        });
    }

    getTplTokens(...args) {
        return tplTokenizer(...args);
    }

    getEsTokens(source) {
        return esTokenizer(source);
    }

    getVariables(esTokens) {
        let ignore = false;
        return esTokens
            .filter(esToken => {
                return esToken.type !== `whitespace` && esToken.type !== `comment`;
            })
            .filter(esToken => {
                if (esToken.type === `name` && !ignore) {
                    return true;
                }
                ignore = esToken.type === `punctuator` && esToken.value === `.`;
                return false;
            })
            .map(tooken => tooken.value);
    }

    importContext(name) {
        let value = ``;
        const internal = this.internal;
        const dependencies = this.dependencies;
        const ignore = this.ignore;
        const context = this.context;
        const options = this.options;
        const imports = options.imports;
        const contextMap = this.CONTEXT_MAP;

        if (!has(contextMap, name) && ignore.indexOf(name) === -1) {
            if (has(internal, name)) {
                value = internal[name];

                if (has(dependencies, name)) {
                    dependencies[name].forEach(name => this.importContext(name));
                }

            } else if (name === ESCAPE || name === EACH || has(imports, name)) {
                value = `${IMPORTS}.${name}`;
            } else {
                value = `${DATA}.${name}`;
            }

            contextMap[name] = value;
            context.push({
                name,
                value
            });
        }
    }

     parseString(tplToken) {
        let source = tplToken.value;

        if (!source) {
            return;
        }

        const code = `${OUT}+=${stringify(source)}`;
        this.scripts.push({
            source,
            tplToken,
            code
        });
    }

    checkExpression(script) {
        // 没有闭合的块级模板语句规则
        // 基于正则规则来补全语法不能保证 100% 准确，
        // 但是在绝大多数情况下足以满足辅助开发调试的需要
        const rules = [
            // <% } %>
            // <% }else{ %>
            // <% }else if(a){ %>
            [/^\s*}[\w\W]*?{?[\s;]*$/, ''],

            // <% fn(c,function(a,b){ %>
            // <% fn(c, a=>{ %>
            // <% fn(c,(a,b)=>{ %>
            [/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/, '$1})'],

            // <% if(a){ %>
            // <% for(var i in d){ %>
            [/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/, '$1}']
        ];

        let index = 0;
        while (index < rules.length) {
            if (rules[index][0].test(script)) {
                script = script.replace(...rules[index]);
                break;
            }
            index++;
        }

        try {
            new Function(script);
            return true;
        } catch (e) {
            return false;
        }
    }

    build() {
        const options = this.options;
        const context = this.context;
        const scripts = this.scripts;
        const stacks = this.stacks;
        const source = this.source;
        const filename = options.filename;
        const imports = options.imports;
        const mappings = [];
        const extendMode = has(this.CONTEXT_MAP, EXTEND);

        let offsetLine = 0;

        // Create SourceMap: mapping
        const mapping = (code, { line, start }) => {
            const node = {
                generated: {
                    line: stacks.length + offsetLine + 1,
                    column: 1
                },
                original: {
                    line: line + 1,
                    column: start + 1
                }
            };

            offsetLine += code.split(/\n/).length - 1;
            return node;
        };

        // Trim code
        const trim = code => {
            return code.replace(/^[\t ]+|[\t ]$/g, '');
        };

        stacks.push(`function(${DATA}){`);
        stacks.push(`'use strict'`);
        stacks.push(`${DATA}=${DATA}||{}`);
        stacks.push(`var ` + context.map(({ name, value }) => `${name}=${value}`).join(`,`));

        if (options.compileDebug) {
            stacks.push(`try{`);

            scripts.forEach(script => {
                if (script.tplToken.type === tplTokenizer.TYPE_EXPRESSION) {
                    stacks.push(
                        `${LINE}=[${[script.tplToken.line, script.tplToken.start].join(',')}]`
                    );
                }

                mappings.push(mapping(script.code, script.tplToken));
                stacks.push(trim(script.code));
            });

            stacks.push(`}catch(error){`);

            stacks.push(
                'throw {' +
                    [
                        `name:'RuntimeError'`,
                        `path:${stringify(filename)}`,
                        `message:error.message`,
                        `line:${LINE}[0]+1`,
                        `column:${LINE}[1]+1`,
                        `source:${stringify(source)}`,
                        `stack:error.stack`
                    ].join(`,`) +
                    '}'
            );

            stacks.push(`}`);
        } else {
            scripts.forEach(script => {
                mappings.push(mapping(script.code, script.tplToken));
                stacks.push(trim(script.code));
            });
        }

        if (extendMode) {
            stacks.push(`${OUT}=''`);
            stacks.push(`${INCLUDE}(${FROM},${DATA},${BLOCKS})`);
        }

        stacks.push(`return ${OUT}`);
        stacks.push(`}`);

        const renderCode = stacks.join(`\n`);

        try {
            const result = new Function(IMPORTS, OPTIONS, `return ${renderCode}`)(imports, options);
            result.mappings = mappings;
            result.sourcesContent = [source];
            return result;
        } catch (error) {
            let index = 0;
            let line = 0;
            let start = 0;
            let generated;

            while (index < scripts.length) {
                const current = scripts[index];
                if (!this.checkExpression(current.code)) {
                    line = current.tplToken.line;
                    start = current.tplToken.start;
                    generated = current.code;
                    break;
                }
                index++;
            }

            throw {
                name: `CompileError`,
                path: filename,
                message: error.message,
                line: line + 1,
                column: start + 1,
                source,
                generated,
                stack: error.stack
            };
        }
    }

}
```