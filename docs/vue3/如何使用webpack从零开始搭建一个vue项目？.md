---
title: 如何使用webpack从零开始搭建一个vue项目？
author: qm
date: '2023-03-02'
categories:
 - vue3
tags:
 - vue3
---

平时做项目都是直接用vue-cli脚手架直接构建vue项目。直到我出去面试

**面试官问我**：你自己在不用vue-cli的情况下，是否可以用webpack搭建一个项目？

**我**：还真没有自己搭过，在webpack里面加东西的时候倒是比较多

这次面试之后，我想了一下可能用已有的东西太久，而忘记了最根本的东西。其实我内心还是蛮恐惧自己用webpack搭建的（不会所以恐惧）。但我还是想试试...

下面我开始试着搭建项目（vue3+webpack）

#### 初始化项目

```bash
mkdir vue3-webpack-project
cd vue3-webpack-project
npm init
```

执行以上命令，根据提示初始化项目，会生成一个package.json文件。如下

```json
{
  "name": "vue3-webpack-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "quman",
  "license": "ISC"
}
```

#### 引入webpack

首先安装webpack webpack-cli

```bash
npm install webpack webpack-cli --save-dev
```

执行以上命令会自动生成node-module目录以及package-lock.json文件。并下载webpack以及webpack-cli的包。现在的目录如下

    > node_module
    package-lock.json
    package.json

然后我们在根目录下创建webpack.config.js文件

    touch webpack.config.js

安装path（一会webpack.config.js里面需要用到）

    npm i path 

我们在webpack.config.js文件里加入一下代码

```javascript
const path = require("path");
module.exports = {
    mode: "development", // 当前的开发环境，mode的默认配置就是production
    entry: '/src/main.js', // 入口文件
    output: { // 出口文件
        filename: 'bundle.js',
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/"
    },
    plugins: [], // 使用的插件
    module: { // 对文件处理的方式配置（模块加载）
        generator: {}, // 生成器
        parser: {}, // 解析器
        rules: [], // 修改模块的创建方式
    }

}
```

为了打包方便，我们可以在package.json里面的scripts对象下面加入以下指令

```json
"build": "webpack --config webpack.config.js"
```

下面我们创建一个src文件夹，在src下创建一个main.js进行打包测试下

```javascript
const a = "我是测试文件";
console.log("测试---", a);
```

然后直接在终端执行npm run build进行打包，打包好我们可以看到在dist目录下生成了一个bundle.js文件

    eval("const a = \"我是测试文件\";\nconsole.log(\"测试---\", a);\n\n//# sourceURL=webpack://vue3-webpack-project/./src/main.js?");

这说明我们引入webpack可以正常打包了，下一步是配置文件打包到html当中

#### &#x20;如何将js打包至html文件当中

我们首先在src下创建一个index.html文件，如下

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>

```

要做到将js、css等打包并且引入到html文件中，我们需要htmlWebpackPlugin插件。

htmlWebpackPlugin插件的作用：webpack打包时，会创建一个html文件，然后把打包后的静态文件（bundle）引入到html文件中。

下面我们来看下怎么引入这个插件

首先安装以下命令

    npm install html-webpack-plugin -D

然后webpack.config.js注入该插件，代码如下

    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    module.exports = {
        mode: "development", // 当前的开发环境，mode的默认配置就是production
        entry: '/src/main.js', // 入口文件
        output: { // 出口文件
            filename: 'bundle.js',
            path: path.resolve(__dirname, "./dist"),
            publicPath: "/"
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: '/src/index.html',
                filename: "index.html",
                title: "qm-vue3",
                minify: {
                    collapseWhitespace: true, // 去掉空格
                    removeComments: true, // 删除注释
                }
            })
        ], // 使用的插件
        module: { // 对文件处理的方式配置（模块加载）
            generator: {}, // 生成器
            parser: {}, // 解析器
            rules: [], // 修改模块的创建方式
        }
    }

然后运行npm run build 。会发现dist目录下会多了一个index.html文件，里面bundle.js被引入了进去

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Document</title>
        // js被注入了进去
        <script defer="defer" src="/bundle.js"></script>
      </head>

      <body></body>
    </html>

#### 下面我们来看怎么搭建一个vue项目

首先我们安装以下vue

    npm i vue

我们在src下新建一个App.vue页面，代码如下

```html
<template>
  <div>这是一个测试vue的页面</div>
</template>

```

把index.html的代码加入一行代码

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    // 新加入这行代码
    <div id="app"></div>
  </body>
</html>

```

然后我们修改下main.js的测代码

```javascript
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

现在我们执行npm run build肯定是不成功的。因为webpack还识别不了vue后缀的文件。那下面我们该怎么做呢

下面我们开始安装vue-loader，让webpack认识vue文件

```bash
npm i vue-loader thread-loader -D
```

顺便安装下thread-loader。它的作用：把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行

然后在webpack.config.js加入loader

    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const {VueLoaderPlugin } = require("vue-loader");
    module.exports = {
        mode: "development", // 当前的开发环境，mode的默认配置就是production
        entry: '/src/main.js', // 入口文件
        output: { // 出口文件
            filename: 'bundle.js',
            path: path.resolve(__dirname, "./dist"),
            publicPath: "/"
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: '/src/index.html',
                filename: "index.html",
                title: "qm-vue3",
                minify: {
                    collapseWhitespace: true, // 去掉空格
                    removeComments: true, // 删除注释
                }
            })
        ], // 使用的插件
        module: { // 对文件处理的方式配置（模块加载）
            generator: {}, // 生成器
            parser: {}, // 解析器
            rules: [
                {
                    test: /\.vue$/,
                    use: [
                        { loader: "thread-loader" },
                        {
                            loader: "vue-loader",
                            options: {
                                compilerOptions: {
                                    preserveWhitespace: false,
                                }
                            }
                        }
                    ],
                    exclude: /node_modules/,
                },
            ], // 修改模块的创建方式
        }
    }

现在我们执行npm run build&#x20;

我们生成了一个包不知道成功没有，我们先搭建一个node静态服务器检测下

我们新开一个node项目，叫node-demo，先安装express

    npm i express

然后把之前打包好的dist文件复制到node-demo下,目录如下

    dist
    node_modules
    package.json

我们新建一个server.js文件，代码如下

    var express = require('express');
    var http = require('http');
    var app = express();
    var server = http.createServer(app);


    server.listen(3000, function listening() {
      console.log('服务器启动成功！');
    });
    app.use(express.static("dist"));

我们为了运行方便，更改下package.json

```
{
  "name": "node-demo",
  "version": "1.0.0",
  "main": "server.js",
  "license": "MIT",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
  }
}

```

执行npm run start 。跑起来之后可以发现，页面上显示”这是一个测试vue的页面“，表示我们成功了。

#### 配置devServer

当然用nodejs来跑静态文件比较麻烦，现在我们来配置webpack自带的工具webpack devServer

首先安装以下命令行

    npm i webpack-dev-server -D

在package.json中配置

        "dev": "webpack-dev-server --config webpack.config.js"

在webpack.config.js中添加

    devServer: {
            port: 3021, // 启动端口
            open: true, // 是否自动打开页面
            hot: true, // 是否开启热更新
            proxy: {
                "/api": {
                    target: "http://127.0.0.1",
                    changeOrigin: true, // 收否允许跨域
                    pathRewrite: { // 重定向
                        "^/api": ""
                    }
                }
            }


        },

执行npm run dev。发现项目启动好了<http://localhost:3021/>。

到这里我们手动配置一个vue文件就算完成了。

#### 添加 gitignore 文件

在根目录下添加.gitignore 文件，设置 node\_modules 文件夹不上传

    node_modules/

#### 支持scss

```
npm i css-loader style-loader sass sass-loader -D

```

在 webpack.config.js 文件中添加的 rules

                 {
                    test: /\.css$/,
                    use: ["css-loader", "style-loader"]
                },
                {
                    test: /\.scss$/,
                    use: ["css-loader", "style-loader", "sass-loader"]
                }

#### 支持es6或者js

在 webpack.config.js 文件中添加的 rules

                {
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-transform-modules-commonjs',
                            ],
                        }
                    }
                }

#### ngix配置

路由用history模式会用到

    server {
      listen  80;
      server_name  www.xxx.com;

      location / {
        index  /data/dist/index.html;
        try_files $uri $uri/ /index.html;
      }
    }

修改完配置后记得更新

    nginx -s reload

到这里就没有了

最后：感觉自己动手搭建一遍，并没有想象的那么难。
[源码地址](https://github.com/fruitGirl/vue3-webpack-project)

### 参考的文章

<https://juejin.cn/post/7032092289035927559>
