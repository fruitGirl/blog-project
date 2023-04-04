---
title: css省略号显示
author: qm
date: '2019-10-15'
categories:
 - css
tags:
 - css
---

产品经理：这个列表中文字超过一行显示...，又或者多行...显示

我：emmm.... 小意思

&#x20;下面我们来开始先看css如何写：&#x20;

超过一行显示...

```css
width:100px;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
```

多行显示...

```css
width: 100px;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orident: vertical;
```

基于高度显示省略号

```css
.demo{
    position: relative;
    height: 40px;
    line-height: 20px;
    overflow:hidden;
}
.demo:after {
    content: "...";
    position: absoluted;
    bottom: 0;
    right: 0;
    padding: 0 20px 0 20px;
}
```

这个原理很简单，就是通过伪元素绝对定位到行尾并遮住文字，并通过overflow\:hidden;隐藏多余文字

一般英文存在用work-break：break-all;

产品经理又说了：我想鼠标放上去的时候显示全部

第一种方案：我直接加个title属性。

简单是简单，但是产品经理又说了： 我觉得这样式也太丑了吧
