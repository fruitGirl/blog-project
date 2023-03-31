---
title: 对delete操作符知道多少？
author: qm
date: '2023-3-24'
categories:
 - javascript
tags:
 - javascript
---


> 项目中大家是不是经常使用delete删除一个对象的属性，那问问自己对这么常见的delete操作符又知道多少呢？（我着实觉得自己好菜，呜呜呜...）

#### delete是干什么的？

delete操作符用于删除对象的某个属性。如果没有指向这个属性的引用，那它最终会被释放。

语法：

    delete object.property
    delete object['property']
    delete  object[index]

参数：

*   object：对象的名称
*   property：要删除的对象的属性
*   index: 表示要删除的数组下标

返回值：

删除成功时返回true，删除失败时返回false

> 注意：`delete`操作符与直接释放内存**无关**

详解：使用delete只是将属性的值设置为undefined，而不是从内存中完全删除该属性。他们不会立即释放该属性占的内存，浏览器可能在将来合适的时刻自动回收内存。这里就涉及到垃圾回收机制了，有兴趣的可以去了解下

#### delete的特殊的点

1.  删除对象中不存在的属性，delete仍然会返回true

    var obj = {
    name: "困芽芽"
    }

    console.log("删除没有的属性:", delete obj.age, obj);

    console.log("删除存在的属性:", delete obj.name, obj);

运行结果如下

    删除没有的属性: true {"name":"困芽芽"}
    删除存在的属性: true {}

1.  如果对象的原型链上有和待删除属性同样的属性，那么删除属性之后，对象会使用原型链上的那个属性

```
function Person() {
  this.name = "困芽芽"
}
 Person.prototype.name = "lihua"

 var person = new Person();


 delete person.name;
 // person.name仍然可以用，并获取原型链上的name值
 console.log("name:", person.name); // lihua

// 从原型链上删除
 delete Person.prototype.name; // true

 console.log("name prototype:", person.name); // undefined

```

1.  不可设置（Non-configurable）属性不能移除。

*   像Math、Array、Object内置对象的属性不能删除
*   使用Object.definePropery()设置不可设置的不能删除

    // 内置属性不能删除
    console.log("Math.PI", delete Math.PI) // false

    var o = {};

    // 设置不可设置移除无效
    Object.defineProperty(o, "name", {
    configurable: false, // 设置不可配置
    writable: true,
    value: "困芽芽",

    })
    console.log("设置不可设置", delete o.name , o.name)

1.  在任何使用`var`声明的属性不能从全局作用于或者函数作用域中删除

ES5为我们提供了`Object.getOwnPropertyDescriptor(Object, property)`来获取内部属性，那我们来看下var声明的全局变量的属性是什么样的吧

我们先来看一个栗子

    var a = 1;
    console.log("全局属性a:", Object.getOwnPropertyDescriptor(window, "a"))

    var persons = {
      name: "困芽芽"
    }

    console.log("persons中的属性:", Object.getOwnPropertyDescriptor(persons, "name"))

运行结果为

    全局属性a: {
        "value":1,
        "writable":true,
        "enumerable":true,
        "configurable":false
    }

    persons: {
        "value":"困芽芽",
        "writable":true,
        "enumerable":true,
        "configurable":true
    }

我们发现用var声明的a变量的configurable是不可设置的，那我们猜想a肯定是不能移除的
persons中的name属性的configurable是可设置的，那么他是可移除的.

我们验证一下

```
console.log("a:", delete a); // false
console.log("persons name:", delete persons.name); // true

```

哈哈哈，确实如此

**我们如果不用var声明b又会如何**

    b = 2;
    console.log("b:", delete b); // true

结果删除成功了

我们通过`Object.getOwnPropertyDescriptor(window, "b")`可以得到以下结果

    {"value":2,"writable":true,"enumerable":true,"configurable":true}

因为b是全局作用域的一个属性，没有var声明，他是可设置的，所以可以删除。

**我们再来看下函数作用域中栗子**

    function test() {
      var c = 5;
      console.log("c:", delete c); // false
    }
    test();
    console.log("外部c:", delete c); //  true

5.使用let或者const声明的不能从它被声明作用域中删除

```
let color1 = "red";
console.log("color1:", delete color1, color1); // false red

const color2 = "green"
console.log("color2:", delete color2, color2); // false green

const obj1 = {
  color: "blue"
}
console.log("obj1:", delete obj1); // false
console.log("obj1---color:", delete obj1.color, obj1.color); // true undefined

```

6.删除数组元素时，数组长度不受影响

    var arrs = [1, 2, 3, 4,5]
    delete arrs[3];
    console.log(arrs); // [1, 2, 3, ,5]

    if (3 in arrs) {
      // 不会进到这里来
    }

上面的例子发现删除数组，长度不受限制。但是我们如果想让一个数组元素继续存在，但是其值是undefined，那么可以把undefined赋值给这个元素，而不是使用delete
如下

    var arrs = [1, 2, 3, 4,5]
    arrs[3] = undefined;

    if (3 in arrs) {
      // 会进到这里来
    }

如果真的想从数组中移除数据，我们可以通过splice方法

    arrs.splice(3, 1)
    console.log(arrs) // [1, 2, 3, 5]

#### 严格模式下

*   不可配置的属性，会抛出错误
*   如果对一个变量直接引用、函数参数或者函数名直接用delete会抛出错误，为避免这个我们必须以`delete object.property`或`delete object['property']`的形式使用 delete 运算符

    "use strict"
    var fruit = "apple";
    console.log(delete fruit);// SyntaxError

    function fnc() {

    }
    console.log(delete fnc); // SyntaxError

#### 性能

我们项目中delete用的还是比较多，我们来看下用delete和object.key = undefined的对比

```
console.time("demo")
var objDemo = {
  age: 16
}
delete objDemo.age;
console.timeEnd("demo")

```

运行发现

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e11208295b61465eb10cb7a45ced1dee\~tplv-k3u1fbpfcp-watermark.image?)

    console.time("demo")
    var objDemo = {
      age: 16
    }
    objDemo.age = undefined;
    console.timeEnd("demo")

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/977c7a12743d4f579cf2641237bd4ec3\~tplv-k3u1fbpfcp-watermark.image?)

通过上图我们知道用delete的时间0.11ms,undefined时间为0.55ms，对比之下设置为undefined会快一半

随意我们我们尽量用undefined能提升点性能。

参考文章；
<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete>
