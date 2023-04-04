### 前言

想快速的搭建一个属于自己的个人博客，比较了下 Docisfy、Hexo 还有 VuePress，最终选择了 VuePress。其实我是看中了他的强大的 Plugin 插件,并且还可以自己写组件，自我认为后期可扩展性非常高~

#### 1.VuePress 快速构建

详细信息请看[VuePress 官网](https://vuepress.vuejs.org/zh/guide/getting-started.html)

我们下面快速构建一个简单的 VuePress 文档

```
// 1.创建并进入一个新目录
mkdir blog && cd blog

// 2.使用你喜欢的包管理器进行初始化
yarn init # npm init

// 3.将VuePress安装为本地依赖
yarn add -D vuepress # npm install -D vuepress

// 4.创建你的第一篇文档
mkdir docs && echo '# Hello VuePress' > docs/README.md

// 5.在package.json中添加一些scripts
{
    "scripts": {
        "dev": "vuepress dev docs",
        "build": "vuepress build docs"
      },
}

// 6.本地启动服务器
yarn dev # npm run dev

```

我们将看到这样一个界面

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88a10855b0494477abe0a9cb55f19a3b~tplv-k3u1fbpfcp-watermark.image?)
这样已经有了一个简单的 VuePress 文档

#### 2.基本配置

我们需要在 docs 下面配置.vuepress 目录，所有的和 VuePress 相关的文件配置都会在这个目录里面

```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
│  └─ css
│     └─ 重排重绘.md
└─ package.json

```

大多数配置都是在 config.js 里面，我们先简单配置下

```
module.exports = {
  title: 'person blog',
  description: '个人博客'
}
```

界面如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d767a08ce4d42a29b838b040b50883c~tplv-k3u1fbpfcp-watermark.image?)

#### 3.添加导航栏

我们开始添加导航栏，修改 config.js 如下

```
module.exports = {
    title: 'person blog',
    description: '个人博客',
    themeConfig: {
        nav: [
            {text: "首页", link: "/"},
            {text: 'Github',link: "https://github.com/fruitGirl"}
        ],
    }

  }
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bf4679105414ca2ad1c0acc67144c1c~tplv-k3u1fbpfcp-watermark.image?)

#### 4.添加侧边栏

我们继续修改 config.js,代码如下

```
module.exports = {
    title: 'person blog',
    description: '个人博客',
    themeConfig: {
        nav: [
            {text: "首页", link: "/"},
            {text: 'Github',link: "https://github.com/fruitGirl"}
        ],
        sidebar: [
            {
                title: '个人简介',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "欢迎来到个人博客", path: "/" }
                ]
            },
            {
                title: 'css',
                path: '/css',
                collapsable: false, // 不折叠
                children: [
                    { title: "重排重绘", path: "/css/重排重绘" }
                ]
            },
        ]
    }

  }
```

界面如下

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c5b81ad3a32429ba4bd3ef5273c9758~tplv-k3u1fbpfcp-watermark.image?)

到这里如果我们想写个组件库文档又或者记录自己文章的话非常适合

但是我想写一个个人的博客，接下来我需要一个合适的主题

#### 5.添加主题

发现 VuePress 可以自定义主题，但是暂时我还不想开发一个，我发现`vuepress-theme-reco`这个插件主题非常符合我的审美，于是先用这个尝试下吧，后续可以自己开发一个主题。

[这个主题文档请看](https://vuepress-theme-reco.recoluan.com/views/1.x/home.html)

##### 5.1 配置

安装 vuepress-theme-reco

```
npm install vuepress-theme-reco --save-dev

# or

yarn add vuepress-theme-reco
```

配置主题,修改 config.js,这个插件的侧边栏写法有点不同，我们先把侧边栏去掉

```
module.exports = {
    title: 'person blog',
    description: '个人博客',
    theme: 'reco',
    themeConfig: {
        type: "blog",
        nav: [
            {text: "首页", link: "/"},
            {text: 'Github',link: "https://github.com/fruitGirl"}
        ],
    }

  }
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83cbba478cfd4635a3adcad3d9ba08db~tplv-k3u1fbpfcp-watermark.image?)

我们发现有两个# Hello VuePress，发现这个插件的写法需要# Front Matter

一个完整的  `Front Matter`  案例：

```
---
title: 烤鸭的做法
date: '2019-08-08 08:00:00'
sidebar: 'auto'
categories:
 - 烹饪
 - 爱好
tags:
 - 烤
 - 鸭子
keys:
 - '32位的 md5 加密密文'
publish: false
---
```

我们在 README.md 里面测试下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5419fe94a90543949f17af572c16bbde~tplv-k3u1fbpfcp-watermark.image?)

发现 ok 的

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e819862b5741ec9cfaded6b264a82e~tplv-k3u1fbpfcp-watermark.image?)

接着开始修改 README.md

```
---
home: true
bgImage: '/bg1.jpeg'
bgImageStyle: {
  height: '400px'
}
---
```

需要背景图片，我在.vuepress 下面创建一个 public 文件夹，放置图片
目录如下

```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ public
│       └─ bg1.jpeg
│       └─ avatar.png
│     └─ config.js

│  └─ css
│     └─ 重排重绘.md
└─ package.json
```

然后在 css 文件夹下自己的文档头部加上**分类和标签**，例如

```
---
title: 重排重绘
author: qm
date: '2023-2-25'
categories:
 - css
tags:
 - css
---
```

结果如图所示：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7297ba7acd940e59b9bf6f4e40b1059~tplv-k3u1fbpfcp-watermark.image?)

##### 5.2.添加头像

在 config.js 中加入头像配置

```
module.exports = {
    title: 'person blog',
    description: '个人博客',
    theme: 'reco',
    themeConfig: {
        type: "blog",
        logo: "/avatar.png", // logo图片
        authorAvatar: '/avatar.png', // 头像
        nav: [
            {text: "首页", link: "/"},
            {text: 'Github',link: "https://github.com/fruitGirl"}
        ],
    }

  }
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec1d7dcb02234becb838f965356df211~tplv-k3u1fbpfcp-watermark.image?)

##### 5.3.添加博客配置

在 config.j 中的 themeConfig 下添加下面一段配置

```
blogConfig: {
            category: {
                location: 4,     // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
              },
              tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '文章'      // 默认文案 “标签”
              },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/fruitGirl' },
                { icon: 'reco-juejin', link: 'https://juejin.cn/user/325111173876509/posts' }
            ]
        },
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af683f577d2b4d6f8b095d349460e2a5~tplv-k3u1fbpfcp-watermark.image?)

##### 5.4.添加侧边栏

在 config.js 中 themeConfig 下加入添加侧边栏,例如 css

```
sidebar: { // 侧边栏
    "/css/": [
        {
          title: "css", // 必要的
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            "重排重绘"
          ],
        },
      ],
},
```

进去文章如图所示有了侧边栏

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6999d6b4bb2f4342abf647e01e67d901~tplv-k3u1fbpfcp-watermark.image?)

##### 5.5.导航搜索文章

config.j 中的 themeConfig 下加入

```
search: true, // 搜索配置
```

就可以搜索所有文章了

##### 5.6.文章下面加入评论

用的是 Valine，下面需要在 config.j 中的 themeConfig 下添加下面一段配置

```
valineConfig: {
          appId: '...',// your appId
          appKey: '...', // your appKey
        }
```

> 注意： 需要去 leanCloud 获取 appId 和 appKey

具体获取步骤如下：
1、进入**lean** **Cloud**官网注册一个账号，申请一个自己的开发版库
2、**获取** **app** **id**  与 **app** **key** ，控制台 > 设置 > **应用凭证** **Key**  来**获取** **App** **ID**，**App** **Key**  以及服务器地址。

##### 5.7.加入各种特效插件

1. 修改光标特效[vuepress-plugin-cursor-effects](https://github.com/SigureMo/vuepress-plugin-cursor-effects)

安装

```
yarn add vuepress-plugin-cursor-effects -D
```

config.js 中配置如下

```
plugins: [ // 插件
        [
            "vuepress-plugin-cursor-effects", // 鼠标点击特效
            {
                size: 2,                    // size of the particle, default: 2
                shape: 'circle',  // shape of the particle, default: 'star'
                zIndex: 999999999           // z-index property of the canvas, default: 999999999
            },
        ],
        ]
```

添加鼠标点击后散落彩色粒子的效果喽~

2.彩带
[vuepress-plugin-ribbon](https://github.com/SigureMo/vuepress-plugin-ribbon)

安装

```
yarn add vuepress-plugin-ribbon -D
```

在 config.js 中的 plugins 加入

```
[ // 彩带
  'ribbon',
  {
     size: 90, // width of the ribbon, default: 90
     opacity: 0.8, // opacity of the ribbon, default: 0.3
     zIndex: -1, // z-index property of the background, default: -1
  },
],
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/057f61aefd8e419d8c96a9940608eb21~tplv-k3u1fbpfcp-watermark.image?)

3. 看板娘[@vuepress-reco/vuepress-plugin-kan-ban-niang](https://github.com/vuepress-reco/vuepress-plugin-kan-ban-niang)

安装

```
yarn add @vuepress-reco/vuepress-plugin-kan-ban-niang -D
```

在 config.js 中的 plugins 加入

```
   ['@vuepress-reco/vuepress-plugin-kan-ban-niang',{ // 看板娘
    theme: ["wanko"],
    clean: false,
    info: 'https://github.com/fruitGirl',
    messages: {
      welcome: '欢迎来到困芽芽的小空间',
      home: '心里的花，我想要带你回家',
      theme: '好吧，希望你能喜欢我的其他小伙伴。',
      close: '你可以选择关闭我哦'
    }
  }],
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07a6bd7c220542ad9e7655c29828fc44~tplv-k3u1fbpfcp-watermark.image?)
当然还有好多插件，感兴趣的[可以查看](https://vuepress-theme-reco.recoluan.com/views/other/recommend.html)
