---
title: 部署个人博客到Github Page上
author: qm
date: "2023-04-03"
categories:
  - blog
tags:
  - blog
---

**前言：**
上一篇文章我们本地已经搭建好了个人博客，我想部署到免费的 Github Page 上，该如何操作呢？

1.我们现在 Github 上创建一个新的仓库

- 我们先找到 Repositories 上的 new 按钮,点击

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f761f0d43a5a41bbbe71b3bb6b4cc727~tplv-k3u1fbpfcp-watermark.image?)

- 然后填入自己的博客名字，最后点击创建

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22bd613b351640538f34ac94967685c6~tplv-k3u1fbpfcp-watermark.image?)
这样我们就成功的创建了一个新的仓库

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04abeb135d6e4552874d41e4e49a154d~tplv-k3u1fbpfcp-watermark.image?)

2.我们在项目中配置代码

我们首先要在 config.js 中配置一个 base 路径

```
module.exports = {
      // 路径名为 "/<REPO>/"
    base: '/blog/',
      //...
}
```

最终的 config.js 如下所示

```
module.exports = {
    title: 'person blog',
    description: '个人博客',
    base: "/blog/",
    theme: 'reco',
    themeConfig: {
        type: "blog",
        subSidebar: 'auto',
        logo: "/avatar.png", // logo图片
        authorAvatar: '/avatar.png', // 头像
        search: true, // 搜索配置
        nav: [
            {text: "首页", link: "/"},
            {text: 'Github',link: "https://github.com/fruitGirl"}
        ],
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
        valineConfig: {
          appId: '...',// your appId 我自己的就不写了
          appKey: '...', // your appKey 我自己的就不写了
        },
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


    },
    plugins: [ // 插件
        [
            "vuepress-plugin-cursor-effects", // 鼠标点击特效
            {
                size: 2,                    // size of the particle, default: 2
                shape: 'circle',  // shape of the particle, default: 'star'
                zIndex: 999999999           // z-index property of the canvas, default: 999999999
            },
        ],
        [ // 彩带
          'ribbon',
          {
             size: 90, // width of the ribbon, default: 90
             opacity: 0.8, // opacity of the ribbon, default: 0.3
             zIndex: -1, // z-index property of the background, default: -1
          },
       ],
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
      ],

  }
```

我们需要在根目录（blog）下创建一个 scripts 文件夹，下面创建一个 deploy-gh.sh 脚本

```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，比如我这里就是：
git push -f git@github.com:fruitGirl/person-blog.git master:gh-pages

cd -
```

为了发布上去方便，我们在 package.json 中配置一下

```
"scripts": {
    "deploy-gh": "GH=1 yarn build && bash scripts/deploy-gh.sh"
  },
```

执行 yarn deploy-gh 部署到 Github Page 上

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1f148bb4c654d1798c0ad58bada9b15~tplv-k3u1fbpfcp-watermark.image?)

找到 Settings->Pages 查看博客地址就可以了

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a16aef95b004203937e439532c79fe5~tplv-k3u1fbpfcp-watermark.image?)
