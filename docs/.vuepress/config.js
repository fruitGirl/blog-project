module.exports = {
    title: "困芽芽de空间",
    description: "欢迎来到我的博客",
    base: "/blog/",
    theme: 'reco',
    mode: "light",
    markdown: {
      lineNumbers: true, //代码显示行号
    },
    head: [
      // 手机适配
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    themeConfig: {
      type: "blog",
      logo: "/avatar.png", // logo图片
      authorAvatar: '/avatar.png', // 头像
      author: '困芽芽',
      subSidebar: 'auto',
      search: true, // 搜索配置
      nav: [
        {text: "首页", link: "/", icon: 'reco-date'},
        {text: 'Github',link: "https://github.com/fruitGirl"}
      ],
      sidebar: { // 侧边栏
        "/css/": [
            {
              title: "css", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "重排重绘",
                "弹性盒子布局-Flex",
                "flex实战篇-骰子",
                "背景图片全屏铺满自适应",
                "css省略号显示"
              ],
            },
          ],
          "/js/": [
            {
              title: "javascript", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 2
              children: [
                "[设计模式]手写一个发布订阅模式",
                "对delete操作符知道多少？",
                "数据类型",
                "强制类型转换",
                "LHS和RHS",
                "执行上下文和执行栈",
                "设计模式",
              ],
            },
          ],
          "/vue2/": [
            {
              title: "vue2", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "style中的scoped属性",
                "key的作用",
              ]
            }
          ],
          "/vue3/": [
            {
              title: "vue3", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "如何使用webpack从零开始搭建一个vue项目？"
              ],
            },
          ],
          "/chart/": [
            {
              title: "chart", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "bizChart踩坑"
              ],
            },
          ],
          "/tool/": [
            {
              title: "tool", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "nvm踩坑篇"
              ],
            },
          ],
          "/blog/": [
            {
              title: "blog", // 必要的
              sidebarDepth: 2, // 可选的, 默认值是 1
              children: [
                "如何用VuePress 搭建个人博客？",
                "部署个人博客到Github Page上"
              ],
            },
        ],
        "/vite/": [
          {
            title: "vite", // 必要的
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
              "解决低版本系统白屏问题"
            ],
          },
        ],
      },
      // 博客设置
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
        },
        valineConfig: {
          appId: 'uQUH4wH4m1c86Mms1ZPOQnNS-gzGzoHsz',// your appId
          appKey: 'MVtA6E7KCrvQY77h33Jr5XH9', // your appKey
        }
        
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