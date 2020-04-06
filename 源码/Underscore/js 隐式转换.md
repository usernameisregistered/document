# 隐式转换

涉及隐式转换最多的两个运算符 + 和 ==

+运算符即可数字相加，也可以字符串相加。所以使用需小心
== 不同于===，故也存在隐式转换
\- \* \/ 这些运算符只会针对number类型，故转换的结果只能是转换成number类型

```
function test(a,b){
    b = !a ? 0 : +b
    console.log(b,typeof b)
}
test() //0 "number"
test("dsdf") //NaN "number"
test("dsdf","3") //3 "number"
test("dsdf",3) //3 "number"
```

## 隐式转换中主要涉及到三种转换
1. 将值转为原始值，ToPrimitive() [先不谈]
2. 将值转为数字，ToNumber()
3. 将值转为字符串，ToString()

## valueof
1. Number、Boolean、String这三种构造函数生成的基础值的对象形式，通过valueOf转换后会变成相应的原始值
2. Date这种特殊的对象，其原型Date.prototype上内置的valueOf函数将日期转换为日期的毫秒的形式的数值
3. 除此之外返回的都为this，即对象本身

## toString 会将所有对象转换为字符串。显然对于大部分对象转换

### ToNumber

| 参数 | 结果 |
| - | - |
| undefined | NaN |
| null | +0 |
| 布尔值 | true转换1，false转换为+0 |
| 数字 | 无须转换 |
| 字符串 | 有字符串解析为数字，例如：‘324’转换为324，‘qwer’转换为NaN |


### ToString

| 参数 | 结果 |
| - | - |
| undefined | '' |
| null | throw error |
| 布尔值 | 转换为’true’ 或 ‘false’ |
| 数字 | 数字转换字符串，比如：1.765转为’1.765’ |
| 字符串 | 无须转换 |


```
var a = {
    valueOf: function () {
        return 1;
    },
    toString: function () {
        return '123'
    }
}
true == a // true;
```

```
const a = {
    i: 1,
    toString: function () {
        return a.i++;
    }
}
if (a == 1 && a == 2 && a == 3) {
    console.log('hello world!'); // hello world
}


const a = {
    i: 1,
    toString: function () {
        return a.i++;
    }
}
if (a == 1 && a == 2 && a == 3) {
    console.log('hello world!'); // 
}
```
