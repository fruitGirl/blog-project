module.exports = {
    title: "困芽芽",
    description: "欢迎来到我的博客",
    base: "/blog/",
    theme: 'reco',
    mode: "light",
    markdown: {
      lineNumbers: true, //代码显示行号
    },
    head: [
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    themeConfig: {
      type: "blog",
      logo: "/avatar.png",
      authorAvatar: '/avatar.png',
      author: '困芽芽',
      subSidebar: 'auto',
      search: true,
      nav: [
        {text: "首页", link: "/", icon: 'reco-date'},
        {text: 'Github',link: "https://github.com/fruitGirl"}
      ],
      sidebar: {
        "/css/": [
            {
              title: "css", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "重排重绘.md",
                "弹性盒子布局-Flex.md",
                "flex实战篇-骰子.md",
              ],
            },
          ],
          "/js/": [
            {
              title: "javascript", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 2
              children: [
                "[设计模式]手写一个发布订阅模式.md",
                "对delete操作符知道多少？.md",
                "数据类型.md",
                "强制类型转换.md",
                "LHS和RHS.md",
              ],
            },
          ],
          "/vue2/": [
            {
              title: "vue2", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "style中的scoped属性.md",
                "key的作用.md",
              ]
            }
          ],
          "/vue3/": [
            {
              title: "vue3", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "如何使用webpack从零开始搭建一个vue项目？.md"
              ],
            },
          ],
          "/chart/": [
            {
              title: "chart", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "bizChart踩坑.md"
              ],
            },
          ],
      },
      blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
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
        }
        
    },
    plugins: [ // 插件
        [
            "vuepress-plugin-cursor-effects",
            {
                size: 2,                    // size of the particle, default: 2
                shape: 'circle',  // shape of the particle, default: 'star'
                zIndex: 999999999           // z-index property of the canvas, default: 999999999
            },
        ]
      ],  
    
}