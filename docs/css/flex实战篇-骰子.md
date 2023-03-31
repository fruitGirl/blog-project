---
title: flex实战篇-骰子
author: qm
date: '2023-3-19'
categories:
 - css
tags:
 - css
---

**前言**：上一篇文章学了flex的用法，用法学是学了，但是毕竟实践是检验学习的标准，下面开始flex实------骰子🎲。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed0733e6671a4a758dfad4e7a9519966\~tplv-k3u1fbpfcp-watermark.image?)

我们怎么用flex布局去实现上图中的骰子的六面呢？可以通过[codeopen](https://codepen.io/fruitgirl/pen/OJowBay)查看demo。

每一面骰子的html部分

    // 第一面的xxxx代表first，第二面的xxxx代表second，依次类推
    <div class="xxxx-face">
        <div class="dot"></div>
    </div>

我们先定义下类名为xxxx-face代表的是容器盒子，类名为dot代表盒子下面的项目。

首先把骰子的容器的公共样式写出来，如下

    [class$="face"] {
       width: 85px;
      height: 85px;
      border-radius: 10px;
      background-color: #e7e7e7;
      box-shadow: inset 0 3px #fff, // 上内阴影
        inset 0 -3px #d7d7d7, // 下内阴影
        inset 3px 0 #d7d7d7, // 左内阴影
        inset -3px 0 #d7d7d7; // 右内阴影
      padding: 6px;
      margin-right: 20px;
    }

即下图所示

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c378ce4bd92462c953acb220cf209a5\~tplv-k3u1fbpfcp-watermark.image?)

骰子里面点数的样式如下

    .dot {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #333;
      box-shadow: 
        inset 0 3px #111,
        inset 0 -3px #555;
    }

放入点数如下图所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5d219841a254e1b86b21ae8d804c51c\~tplv-k3u1fbpfcp-watermark.image?)

#### 骰子的第一面

先写html部分

    <div class="first-face">
        <div class="dot"></div>
    </div>

下面我们怎么让项目水平垂直居中呢？
首先我们先设置项目水平居中

    .first-face {
        display: flex;
        justify-content: center
    }

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfc414717ece47d68bb71447b6bb1b88\~tplv-k3u1fbpfcp-watermark.image?)

我们再设置垂直居中

    .first-face {
        display: flex;
        justify-content: center；
        align-items: center;
    }

然后成功得到了第一面骰子

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef3a5b84762b4c808ce909e203e71ec4\~tplv-k3u1fbpfcp-watermark.image?)

#### 第二面骰子

html部分如下

    <div class="second-face">
       <div class="dot"></div>
       <div class="dot"></div>
    </div>

css如下

    .second-face {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/693647a99de1419d88d3dbb6fd487e30\~tplv-k3u1fbpfcp-watermark.image?)

然后设置第二个项目靠近右下方

    .second-face .dot:nth-child(2) {
        align-self: flex-end;
      }

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a851985e58a74fa5b480acca58fd9ce4\~tplv-k3u1fbpfcp-watermark.image?)

#### 第三面

html如下

    <div class="third-face">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>

css如下：

先把主轴方向设置为竖轴，然后三个项目中间距离相同的靠近两端

    .third-face {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/505ec13f769e4cc69a702e9088529411\~tplv-k3u1fbpfcp-watermark.image?)

设置第二个项目水平居中

    .third-face .dot:nth-child(2) {
        align-self: center;
    }

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b4ba0343b4d49dd98b4e00086921413\~tplv-k3u1fbpfcp-watermark.image?)

设置第三个项目水平靠右

    .third-face .dot:nth-child(3) {
        align-self: flex-end;
     }

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f088d94c465f4030a8f7ba1eb1ff8f0a\~tplv-k3u1fbpfcp-watermark.image?)

### 第四面

因为有四个项目，我们来进行分组实现

html如下

    <div class="fourth-face">
      <div class="column">
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="column">
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

css如下

    .fourth-face {
      display: flex;
      justify-content: space-between;
    }

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0add9bc28a8c424fb70a44a763d8f84d\~tplv-k3u1fbpfcp-watermark.image?)

我们需要把column里面的项目向上下两端靠近

    .fourth-face .column {
       display: flex;
       flex-direction: column;
       justify-content: space-between;
    }

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5402afd95f7249dfbb20876fe579807b\~tplv-k3u1fbpfcp-watermark.image?)

#### 第五面

html如下

    <div class="fifth-face">
      <div class="column">
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="column">
        <div class="dot"></div>
      </div>
      <div class="column">
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

css如下

    .fifth-face {
      display: flex;
      justify-content: space-between;
      
    }

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d258552a0674d19bc8f5faaa8ab0ae9\~tplv-k3u1fbpfcp-watermark.image?)

把column里面的项目向上下两端靠近

    .fifth-face .column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d0ad18aa1984f3b825d6d63f55d2e8a\~tplv-k3u1fbpfcp-watermark.image?)

设置的第二个cloumn里面的项目按照主轴居中

    .fifth-face .column:nth-child(2) {
      justify-content: center;
    }

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47496c86e8d34cbaaa60300fbbb7e67c\~tplv-k3u1fbpfcp-watermark.image?)

#### 第六面

其实这个和第四面原理是一样，都是分成两组。

html如下

    <div class="sixth-face">
      <div class="column">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>

      <div class="column">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

写成less如下

    .sixth-face {
      display: flex;
      justify-content: space-between;
      .column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d14af549267b414aa725bbaf30b3363e\~tplv-k3u1fbpfcp-watermark.image?)

**结语：**  大家一起学习叭，如果有问题，欢迎指出，一起进步呀

参考文档

Flex 布局教程：实例篇(<https://www.ruanyifeng.com/blog/2015/07/flex-examples.html>)
