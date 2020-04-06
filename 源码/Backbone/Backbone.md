## 前言 
> 不知道该说些什么作为开头比较好一点，直接复制别人的话作为开头 毕竟**万事开头难**
> Backbone.js为复杂WEB应用程序提供模型(models)、集合(collections)、视图(views)的结构 | 其中模型用于绑定键值数据和自定义事件；集合附有可枚举函数的丰富API； 视图可以声明事件处理函数，并通过RESRful JSON接口连接到应用程序 | 

## 事件（Events）
| 方法名 | 参数 | 说明 | 
| - | - | - | 
| add | (model, collection, options) |  当一个model（模型）被添加到一个collection（集合）时触发 | 
| remove | (model, collection, options) |  当一个model（模型）从一个collection（集合）中被删除时触发 | 
| reset | (collection, options) |  当该collection（集合）的全部内容已被替换时触发 | 
| sort | (collection, options) |  当该collection（集合）已被重新排序时触发 | 
| change | (model, options) |  当一个model（模型）的属性改变时触发 | 
| change:[attribute] | (model, value, options) |  当一个model（模型）的某个特定属性被更新时触发 | 
| destroy | (model, collection, options) | 当一个model（模型）被destroyed（销毁）时触发 | 
| request | (model_or_collection, xhr, options) |  当一个model（模型）或collection（集合）开始发送请求到服务器时触发 | 
| sync | (model_or_collection, resp, options) |  当一个model（模型）或collection（集合）成功同步到服务器时触发 | 
| error | (model_or_collection, resp, options) |  当一个model（模型）或collection（集合）的请求远程服务器失败时触发 | 
| invalid | (model, error, options) | 当model（模型）在客户端 validation（验证）失败时触发 | 
| route:[name] | (params) |  当一个特定route（路由）相匹配时通过路由器触发 | 
| route | (route, params) | 当任何一个route（路由）相匹配时通过路由器触发 | 
| route | (router, route, params) | 当任何一个route（路由）相匹配时通过history（历史记录）触发 | 
| all |  |  所有事件发生都能触发这个特别的事件，第一个参数是触发事件的名称 | 


## 模型（Model）
| 方法名 | 参数 | 说明 | 
| extend | properties, [classProperties] | 要创建自己的Model类，你可以扩展Backbone.Model并提供实例properties(属性)，以及可选的可以直接注册到构造函数的classProperties(类属性) | 
| constructor/initialize | [attributes], [options] | - | 
| get | attribute | 从当前model中获取当前属性(attributes)值 | 
| set | attributes, [options] | 向model设置一个或多个hash属性(attributes) | 
| escape | attribute | 与get类似，只是返回的是HTML转义后版本的model属性值 | 
| has | attribute | 属性值为非null或非undefined时返回true | 
| unset | attribute, [options] | 从内部属性散列表中删除指定属性(attribute) | 
| clear | [options] | 从model中删除所有属性， 包括id属性 | 
| toJSON | - | 返回一个模型的 attributes 浅拷贝副本的 JSON 字符串化形式 | 
| validate | attributes, options | 自定义验证 | 
| isValid | - | 运行validate来检查模型状态 | 
| url | - | 返回模型资源在服务器上位置的相对 URL  | 
| urlRoot | attribute | 从当前model中获取当前属性(attributes)值 | 
