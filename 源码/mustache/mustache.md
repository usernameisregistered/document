# mustache

> 模板技术，一个比freemarker轻量级的模板引擎

## 公用的辅助函数
```
var objectToString = Object.prototype.toString

var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
};

  function isFunction (object) {
    return typeof object === 'function';
}

function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
}
```


## in和hasOwnProperty区别

> in操作符只要通过对象能访问到属性就返回true。hasOwnProperty()只在属性存在于实例中时才返回true。

> 使用delete操作符则可以完全删除实例属性，从而让我们能巩固重新访问原型中的属性

```
function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
}

function primitiveHasOwnProperty (primitive, propName) {
    return (
      primitive != null
      && typeof primitive !== 'object'
      && primitive.hasOwnProperty
      && primitive.hasOwnProperty(propName)
    );
}
```

## 正则相关的

```
var regExpTest = RegExp.prototype.test;
function testRegExp (re, string) {
    return regExpTest.call(re, string);
}
// \S 匹配一个非空白符
var nonSpaceRe = /\S/;
function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
}
```

## 将特殊字符转义为实体字符

```
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
}
```

# 需要使用的正则
```
    var whiteRe = /\s*/;
    var spaceRe = /\s+/; 
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;
```
## 转义影响正则的字符
```
function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}
```

```
mustache.name = 'mustache.js';
mustache.version = '3.1.0';
mustache.tags = [ '{{', '}}' ];

var defaultWriter = new Writer();

mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
};

mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
};

mustache.render = function render (template, view, partials, tags) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials, tags);
};

mustache.to_html = function to_html (template, view, partials, send) {

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
}

mustache.escape = escapeHtml;
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;

```

