```
const htmlMinifier = (source, options) => {

    // node 
    if (typeof window === 'undefined') {
        const htmlMinifier = require('html-minifier').minify;
        const htmlMinifierOptions = options.htmlMinifierOptions;
        const ignoreCustomFragments = options.rules.map(rule => rule.test);
        htmlMinifierOptions.ignoreCustomFragments.push(...ignoreCustomFragments);
        source = htmlMinifier(source, htmlMinifierOptions);
    }

    return source;
};

```