---
title: 弹性盒子布局-Flex
author: qm
date: '2023-3-17'
categories:
 - css
tags:
 - css
---

### 前言

有人问我：经常用到的`flex: 1`是哪几个属性的复合属性

我：有点尴尬，不知道了，emmm...

flex布局在前端开发中使用的还是比较多的，但是大多数前端（其中就包括我自己），一味的使用flex: 1或者flex: auto等，但是不知其所以然的情况下，如果出现了样式问题或者浏览器兼容性问题，马上就很慌,然后又去找到底哪里有问题。这也是我重学Flex布局的原因之一，因为知道其原理才可掌握其精髓。

#### 1. 了解什么是Flex布局？

`Flex`是`Flexible Box`的缩写，意为“弹性盒子”。可以简便、完整、响应式地实现各种页面布局

弹性盒子由`Flex`容器（`flex container`）和`Flex`项目（`flex item`）组成。

注意：容器的所有子元素自动成为容器成员，称为`Flex`项目。

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abdf06ba1984440abf3182b41ffe6d79\~tplv-k3u1fbpfcp-zoom-1.image)

从上图来看，容器中默认存在两条轴，主轴（**main axis**）和交叉轴(**cross axis**)，项目默认沿主轴排列

*   **main start**:主轴的开始位置（与边框的交叉点）
*   **main end**: 主轴的结束位置
*   **cross start**: 交叉轴的开始位置
*   **cross end**: 交叉轴的结束位置
*   **main size**: 单个项目占据的主轴空间
*   **cross size**: 单个项目占据的交叉轴空间

#### 2.我们如何开始一个Flex布局？

任何一个容器都可以设置`flex`布局

    .container {
        display: flex;
    }

行内元素也可以使用`flex`布局

    .container {
        display: inline-flex;
    }

Webkit 内核的浏览器，必须加上`-webkit`前缀。

    .container {
        display: -webkit-flex;
    }

注意:设为 `Flex` 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

#### 3. 容器属性

接着我们来看弹性容器的6个属性

*   `flex-direction`

*   `flex-wrap`

*   `flex-flow`

*   `justify-content`

*   `align-items`

*   `align-content`

> **注意**：具体的以下属性与轴的方向有关，假设主轴的方向都是从左到右（也就是flex-direction默认的）

#### **flex-direction**

设置主轴的方向（项目排列的方向）

**语法如下**

    flex-direction: row | row-reverse | column | column-reverse

*   `row`：默认值。沿水平方向，从左到右

*   `row-reverse`：沿水平方向，从右像左

*   `column`：沿垂直方向，从上到下

*   `column-reverse`：沿垂直方向，从下到上

#### **flex-wrap**

如果轴线上排列不下了，设置项目是否换行，如果换行的话向上还是向下换行

**语法如下**

    flex-wrap: nowrap | wrap | wrap-reverse

*   `nowrap`: 默认值。表示容器内子元素全部显示在一行

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68a456ae101e4ff0ab191c524dfdb339~tplv-k3u1fbpfcp-watermark.image?" alt="1.png" width="70%" />

*   `wrap:` 表示宽度或者高度不够时自动往下换行

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f03fb81c7a5443b848fc6eb0e534444~tplv-k3u1fbpfcp-watermark.image?" alt="2.png" width="70%" />

*   `wrap-reverse`: 表示宽度或者高度不够时自动往上换行

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/297ffbeb326d40cb8557accd5f087a89~tplv-k3u1fbpfcp-watermark.image?" alt="3.png" width="70%" />

#### flex-flow

是`flex-direction`和`flex-wrap`的复合属性

**语法如下**

    flex-flow: flex-direction flex-wrap

举个栗子

写个沿着水平方向，自动换行的样式

    flex-flow: row wrap;

#### justify-content

设置项目在主轴上的对齐方式

**语法如下**

    justify-content: flex-start | center | flex-end | space-between | space-around

*   `flex-start`:默认值。左对齐

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9523535b99249c0b7eb1c2102fe2d23~tplv-k3u1fbpfcp-watermark.image?" alt="4.png" width="70%" />

*   `center`: 居中(主轴)

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a08b062fb5e4c44ad643106942009be~tplv-k3u1fbpfcp-watermark.image?" alt="5.png" width="70%" />

*   `flex-end`: 右对齐

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3e17127d2a8470c809184065bd3a0c8~tplv-k3u1fbpfcp-watermark.image?" alt="6.png" width="70%" />

*   `space-between`: 两端对齐，项目之间的间隔都相等

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c67e39fb6c52463c8c7a38dd71346bad~tplv-k3u1fbpfcp-watermark.image?" alt="7.png" width="70%" />

*   `space-around`:两个项目两侧间隔相等，项目之间的间隔比两边大一倍

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6161ee3419f4ffd985b666db8e831f1~tplv-k3u1fbpfcp-watermark.image?" alt="8.png" width="70%" />

#### align-items

定义项目在交叉轴上的对齐方式
**语法如下**

    align-items: flex-start | center | flex-end | baseline | stretch（默认值）

上面我们写到假设主轴是从左到右，那么交叉轴就是从上到下

*   `flex-start`: 交叉轴的起点对齐

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7d5d13963ce4cca8a3d93fc7507e8b2~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `center`: 交叉轴中点对齐

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c360f65fdfc459aae703692a0d174c7~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `flex-end`: 交叉轴的终点对齐

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37c6acc278294a5db4a10b5fd3c363a1~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `baseline`: 项目第一行的基线对齐

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcf9ee69414c41788ea425f3cc4a5143~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `stretch`: 默认值。项目如果未设置高度或者设置为auto，则占满整个屏幕

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54c512dc1fc84c6d9dfa642a7c9901e0~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

#### align-content

定义多根轴线的对齐方式。如果项目只有一根轴线，则该属性不起作用

**语法如下**

```
align-content: flex-start | center | flex-end | space-between | space-around | stretch（默认值）

```

*   `flex-start`: 和交叉轴的起点对齐

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64447629c2214021855bd9cc70887655~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `center`: 和交叉轴的中点对齐

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5c7bd8419f84b1d99b81a6b6704df27~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `flex-end`: 和交叉轴的终点对齐s

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70b360c539a74c71b04f2a496ae4445d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `space-between`：和交叉轴两端对齐，项目中间间隔相等

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2aea1d732f294aa3adf7967740166232~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `space-around`: 每根轴线的两侧间隔相等，两个项目之间的间隔是两侧的一倍

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73036b750089450483270f25c0703eb1~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

*   `stretch`：铺满整个交叉轴

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5a06397c3e846fa84a8984f5e93b253~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

#### 4. 项目属性

*   `order`
*   `flex-grow`
*   `flex-shrink`
*   `flex-basis`
*   `flex`
*   `align-self`

#### order

设置项目的排列顺序，数值越小越靠前，默认值为0

**语法如下**

```
order: <interger>

```

举个栗子：

设置项目的`order`分别为99 0 -1 8  -2,显示如下图

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18b5a1c0d6644bd6b280df2babeb5dfa~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

#### flex-grow

设置项目的放大比例：默认值为0.意思为如果有剩余空间，也不放大

**语法如下**

```
flex-grow: <number>

```

举个栗子

如果所有的项目都设置`flex-grow:1`，说明等分剩余空间

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe642683056f427ca6903112b613b8c4~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

如果有的项目设置`flex-grow:1`，有的设置`flex-grow:2`说明设置2的是设置1的两倍

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03f51325ccf7417082af25f4238b8a13~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

#### flex-shrink

设置项目的缩小比例：默认值为1.意思为如果剩余空间不足，将会缩小

**语法如下**

```
flex-shrink: <number>

```

举个栗子

如果所有的项目都设置为`flex-shrink: 1`,空间不足时将等比例缩小。如果有一个设置了0，那个为0的，将不会缩小，其他设置为1的，将按照剩余空间等比例缩小

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b1cbed8ea8f48999c02652037213881~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

#### flex-basis

定义了在分配多余空间之前，项目所占的主轴空间（`main size`）。默认值：`auto`，即原来项目的大小.如果设置了`width`,则项目尺寸则由`width/height`(主轴方向)决定，如果没有设置则由内容决定。

**语法如下**

```
flex-basis: <length> | auto

```

当设置为0时，会根据内容撑开。

当设置和`width`和`height`一样的值（350px），占固定空间。

#### flex

该属性是`flex-grow`、`flex-shrink`、`flex-basis`的复合属性，默认值：`0 1 auto`。
后面两个属性可选
**语法如下**

    flex: flex-grow flex-shrink flex-basis; // 后面两个可选

项目中这个符合属性用的比较多，一般不会一个个的去写

一些属性有：

*   `flex: 1` === `flex: 1 1 0`
*   `flex: 2` === `flex: 2 1 0`
*   `flex：auto` === `flex: 1 1 auto`
*   `flex: none` === `flex: 0 0 auto`(常用于固定尺寸不伸缩)

`flex:1`和`flex：auto`的区别就是在于`flex-basis:0` 和`flex-basis:auto`的区别

当设置为`0`时，此时就是告诉`flex-grow`和`flex-shrink`在伸缩的时候不需要考虑我的尺寸

当设置为`auto`时，就是说明你们需要考虑下我的尺寸

#### align-self

允许单个项目与其他项目不一样的对齐方式，可覆盖`align-items`属性。

默认是是`auto`，表示继承父元素中的`align-items`属性。如果没有父元素，则等同于`stretch`

**语法如下**

    align-self: auto| flex-start | center | flex-end | baseline | stretch（默认值）

这其中的属性就比`align-items`多了一个`auto`属性。其他属性都和`align-items`属性一个意思

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4b14b86cf4147cfb5c42c14660f7502~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="50%" />

#### 5.浏览器兼容

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e0a82267702495b82001db3d185da43\~tplv-k3u1fbpfcp-watermark.image?)

*   红色为不支持flex布局
*   绿色部分为完全支持
*   还有1、2、3、4标签支持的各有不同，[具体详情请看](https://caniuse.com/flexbox)

参考文献

<https://caniuse.com/flexbox>

<https://ruanyifeng.com/blog/2015/07/flex-grammar.html>
