---
title: style中的scoped属性
author: qm
date: '2018-08-26'
categories:
 - vue2
tags:
 - vue2
---

> vue项目中慎用style的scoped

简介：vue组件开发，一般是使用单文件组件形式，我们一般style使用scoped使模块私有化。从主观上来说这是一个很好的方案，为什么我现在要说慎用呢？下面我们来看下

### scoped的实现私有化样式的原理
那么我们先从实现原理说起。为了方便称呼，我们假设把加了scoped的组件叫做模块私有组件，其他未加scoped的组件就叫做模块一般组件。

通过DOM结构发现：vue是通过DOM结构以及css样式上加上了唯一不重复的标记，以保证唯一行，达到样式私有化模块化的目的，具体的渲染结果是怎么样的，我们通过一个例子来说明下。

##### 公共组件button组件

```
//button.vue
<template>
  <div class="button-warp">
    <button class="button">text</button>
  </div>
</template>
...
<style scoped>
  .button-warp{
    display:inline-block;
  }
  .button{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
  }
</style>
```
##### 浏览器渲染的button组件

渲染出来的html和css部分分别为

```
<div data-v-2311c06a class="button-warp">
  <button data-v-2311c06a class="button">text</button>
</div>
```

```
.button-warp[data-v-2311c06a]{
  display:inline-block;
}
.button[data-v-2311c06a]{
  padding: 5px 10px;
  font-size: 12px;
  border-radus: 2px;
}
```
从上面浏览器渲染出来的代码我们可以看出，添加了scoped属性的组件，为了达到样式私有化模块的目的，做了两个处理：

- 给HTML的DOM节点上加了一个不重复的data属性（data-v-xxx）
- 在每句编译后生成的css语句的末尾加了加了一个当前组件的data属性，来保证唯一性样式。

scoped的这一操作，虽然看上去是达到了组件样式模块的化的目的，但是每个样式的权重加重了，我们如果要修改这个样式，需要更高的权重去覆盖这个样式。

##### 其他组件引用button组件

上面我们分析了单个组件渲染后的结果，那么组件相互调用之后又会什么样的结果呢？
具体分两种情况：模块私有组件引用模块私有组件；模块一般组件引用模块私有组件。

下面我们举个例子，在组件article.vue组件中引用button组件，那么article组件是否添加scoped属性，渲染出来的结果会有什么区别呢？

```
//article.vue
<template>
  <div class="article">
    <!-- we-button假设是上面定义的组件 -->
    <we-button></v-button>
  </div>
</template>
...
<style>
  .article{
    width: 500px;
    margin: 0 auto;
  }
  .article .button{
    border-raduis: 5px;
  }
</style>
```
如果style上没有加scoped属性，那么渲染出来html和css分别就是：

```
<template>
  <div class="article">
    <!-- we-button假设是上面定义的组件 -->
    <div data-v-2311c06a class="button-warp">
    <button data-v-2311c06a class="button">text</button>
  </div>
  </div>
</template>
```

```
/*button.vue渲染出来的css*/
.button-warp[data-v-2311c06a]{
  display:inline-block;
}
.button[data-v-2311c06a]{
  padding: 5px 10px;
  font-size: 12px;
  border-radus: 2px;
}
/*article.vue渲染出来的css*/
.article{
    width: 500px;
    margin: 0 auto;
  }
  .article .button{
    border-raduis: 5px;
  }
```
从渲染结果可以看出，虽然在article组件中修改了button的属性样式，但是生效的依然是button组件（此时外部的样式被覆盖）

##### 模块私有组件（添加scoped）引用模块私有组件

如果加了scoped的属性渲染出来的会生效吗？下面我们来见证一下

渲染出来的html和css分别是


```
<template>
  <div data-v-57bc25a0 class="article">
    <!-- we-button假设是上面定义的组件 -->
    <div data-v-57bc25a0 data-v-2311c06a class="button-warp">
    <button data-v-2311c06a class="button">text</button>
  </div>
  </div>
</template>
```

```
/*button.vue渲染出来的css*/
.button-warp[data-v-2311c06a]{
  display:inline-block;
}
.button[data-v-2311c06a]{
  padding: 5px 10px;
  font-size: 12px;
  border-radus: 2px;
}
/*article.vue渲染出来的css*/
.article[data-v-57bc25a0]{
  width: 500px;
  margin: 0 auto;
}
.article .button[data-v-57bc25a0]{
  border-raduis: 5px;
}
```
从渲染结果我们，最后这句根本作用不到我们想要改变的DOM节点上面，所以根本不会影响到button.vue组件，这就很尴尬了。。。

当然这个问题也是可以解决的，直接增加全局样式修改，但这势必会影响全局样式。

所以需要另外一种方法在artice.vue组件内再加一个不带scoped属性的style标签，也就意味着要加两个style，一个用于私有样式，一个用于公有样式。这看起来还是有点low的。

```
//article.vue
<template>
  <div class="article">
    <!-- we-button假设是上面定义的组件 -->
    <we-button></v-button>
  </div>
</template>
...
<style scoped>
  .article{
    width: 500px;
    margin: 0 auto;
  }
  
</style>
<style>
.article .button{
    border-raduis: 5px;
  }
</style>
```
虽然可以解决，但是这样好像不太符合规范？

#### 总结一下scoped的渲染规则

- 给HTML的DOM节点上加了一个不重复的data属性（data-v-xxx）
- 在每句编译后生成的css语句的末尾加了加了一个当前组件的data属性，来保证唯一性样式。
- 如果组件内部包含其他组件，只会给其他组件的最外层标签加上当前组件的data属性。


> 解决方案

就是在vue的组件最外层标签加上一个不重的类名,样式用类名包裹。(不要有定义两个相同class名称的根节点，因为都作用于整个单页会有一个失效)

```
<template>
<div class="page-file-name">
</div>
</template>
<style lang="less">
.page-file-name{
    ...
    样式
}
</style>
```

参考文章
[浅谈vue中慎用style的scoped属性](https://www.jb51.net/article/121603.htm)
