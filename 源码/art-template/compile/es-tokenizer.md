导入包[is-keyword-js](https://github.com/crissdev/is-keyword-js/blob/master/index.js)

导入包[js-tokens](https://github.com/lydell/js-tokens/blob/master/index.js)


```
function esTokenizer(code){
 const tokens = code.match(jsTokens).map(value => {
            jsTokens.lastIndex = 0;
            return matchToToken(jsTokens.exec(value));
        }).map(token => {
            if (token.type === 'name' && isKeyword(token.value)) {
                token.type = 'keyword';
            }
            return token;
        });
    return tokens;
}

```
将code使用正则进行分割为数组 分割方法见js-tokens

