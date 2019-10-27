## package.json

### 创建package.json

```
    npm init 
    npm init -y
    npm init --yes
```

### 示例

```
    {
        "name": "my_package",
        "description": "",
        "version": "1.0.0",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "repository": {
            "type": "git",
            "url": "https://github.com/ashleygwilliams/my_package.git"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "bugs": {
            "url": "https://github.com/ashleygwilliams/my_package/issues"
        },
        "homepage": "https://github.com/ashleygwilliams/my_package"
    }
```
### 参数说明

#### name 

> 所有的小写字母
> 一个词，没有空格
> 允许使用破折号和下划线

### version

> 以x.x.x的形式
> 遵循semver规范

### description 

> 包的描述信息 
> 默认值 空

### main 

> 包的入口文件
> 默认值 index.js

### scripts 

> 可以执行的命令
> 默认值：一个空的测试脚本

### keywords 

> 关键字
> 默认值：空

### author 

> 作者
> 默认值：空

### license 

> 协议类型 
> 默认值：ISC

### bugs 

### homepage 

### dependencies 生产环境语言的包

### devDependencies 开发环境语言的包

## 相关命令

``` 
    npm set init.author.email "email"

    npm set init.author.name "username"

    npm set init.license "MIT"

    npm install <package_name> --save

    npm install <package_name> --save-dev

```

