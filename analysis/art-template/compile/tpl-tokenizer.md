```
function Token(type, value, prevToken) {
    this.type = type;
    this.value = value;
    this.script = null;
    if (prevToken) {
        this.line = prevToken.line + prevToken.value.split(/\n/).length - 1;
        if (this.line === prevToken.line) {
            this.start = prevToken.end;
        } else {
            this.start = prevToken.value.length - prevToken.value.lastIndexOf('\n') - 1;
        }
    } else {
        this.line = 0;
        this.start = 0;
    }
    this.end = this.start + this.value.length;
}
```

```
function wrapString(token) {
    const value = new String(token.value);
    value.line = token.line;
    value.start = token.start;
    value.end = token.end;
    return value;
}
```
将source按照指定的规则进行切割
```
function tplTokenizer(source, rules, context = {}){
    const tokens = [new Token("string", source)];
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const flags = rule.test.ignoreCase ? `ig` : `g`;
        const regexp = new RegExp(rule.test.source, flags);

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            let prevToken = tokens[i - 1];
            if (token.type !== "string") {
                continue;
            }
            let match,index = 0;
            const substitute = [];
            const value = token.value;

            while ((match = regexp.exec(value)) !== null) {
                if (match.index > index) {
                    prevToken = new Token("string", value.slice(index, match.index), prevToken);
                    substitute.push(prevToken);
                }
                prevToken = new Token("expression", match[0], prevToken);
                match[0] = wrapString(prevToken);
                prevToken.script = rule.use.apply(context, match);
                substitute.push(prevToken);
                index = match.index + match[0].length;
            }
            if (index < value.length) {
                prevToken = new Token("string", value.slice(index), prevToken);
                substitute.push(prevToken);
            }

            tokens.splice(i, 1, ...substitute);
            i += substitute.length - 1;
        }
        return tokens;
    }
}
```


