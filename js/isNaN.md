### 数据类型转换

####一、 其他数据类型转换为数字
Number()、parseInt() 、parseFloat

Number(), 会首先将非基本类型参数调用toString()方法转化为字符串，然后再转化为字符串，转化为的字符串中如果含有非数字的字符，
则结果为NaN
基本数据类型转换结果按照以下的方式进行
几个比较特殊的例子：
```javascript
Number(12);  // => 12
Number(NaN);    // => NaN
Number('12');   // => 12
Number('12xxx');  // => NaN
Number('');  // => 0
Number(' ');  // => 0
Number('\t');  // => 0
Number(true);   // => 1
Number(false);  // => 0
Number(null);   // => 0
Number(undefined);   // => NaN
Number({name: 'zhang', sex: 'male'});   // => NaN
Number([12,23]);    // => NaN  因为调用toString方法之后，为‘12,13’
Number([12]);       // => 12
Number([]);     // => 0
```
NaN是非数， 代表数值不是一个数字，但是数据类型是数字类型
NaN不和任何数据类型相等，包括和自身也不相等，判断一个值是不是非数有两种方式，
1、使用自身严格等于‘===’， 返回false的是非数， 
```javascript
NaN === NaN; //  =>  false,

```
2、使用isNaN来进行判断
返回true的话，数据值是非数，返回false， 数据值为数字
```javascript
const a = '123';
isNaN(a); // => true; 
```
isNaN的工作机制：
（1）当传进来的数据是数字类型时，直接判断是否是非数
（2）当传进来的数据是其他数据类型时， 需要通过Number()进行数据类型转换为数字类型，然后进行判断，
其中Number转换的结果如上

parseInt()
将数据转化为整数，本身是数字类型就不讨论了，各种情况：
1、基本数据类型，除了字符串都会转化为NaN，
2、字符串类型单独拎出来，从左查起，到第一个不为数字的位置结束，如果是空字符串，则转化为NaN, 否则
有几位则转化为有效数字
3、引用数据类型
将引用数据类型的值先调用其toString()方法转化为字符串类型，然后按照2的步骤进行转换
```javascript
parseInt('123xxx'); // => 123
parseInt('123.345xxx'); // => 123
parseInt([12, 23]); // => 12
parseInt(['123xxx', '234']); // => 123
parseInt([]); // => NaN 空字符串
```
parseFloat（）
将数据转化为浮点数，工作原理里与parseInt基本一致，会多判断一位小数点‘.’
```javascript
parseInt('123.345xxx'); // => 123.345

```
###二、转化其他数据类型为布尔类型的值
方式：Boolean、！、！！

开门见山，只有5个值会转化为false，分别是0、null、undefined、''、NaN；其他的值转化为布尔类型的值都是true
其中！是取反
Boolean和！！某种意义上是等价的，项目中通常用！！方式，优点是简短、逼格高点


