## underscore 中的template

> template 支持的3中替换方式 <% %> <%= %> <%- %>
```
templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
}
```

```
let noMatch = /(.)^/;
```

需要特殊处理的字符
```
let escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
}

let escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

let escapeChar = function(match) {
    return '\\' + escapes[match];
}
```

```
function template(text, settings, oldSettings){
    if (!settings && oldSettings) settings = oldSettings;

    settings = Object.assgin({},settings,templateSettings)

    let matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    let index = 0;
    let source = "__p+='";

    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
        index = offset + match.length;

        if (escape) {
            source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        } else if (interpolate) {
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        } else if (evaluate) {
            source += "';\n" + evaluate + "\n__p+='";
        }
        return match;
    });

    source += "';\n";

    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n'

    source = "var __t,__p='',__j=Array.prototype.join," +  "print=function(){__p+=__j.call(arguments,'');};\n" +  source + 'return __p;\n';

    let render;
    try {
        render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
        e.source = source;
        throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    }

    let argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;

}
```