---
title: nvm踩坑篇
author: qm
date: '2022-04-06'
categories:
 - tool
tags:
 - tool
---

我们在开发中有时候会切换nodejs的版本，我们可以用nvm这么一个nodejs的版本管理工具，可以安装和切换不同版本的nodejs，我这边主要说在mac安装的

##### 安装

```javascript
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

这句命令执行过后，没有什么问题，但是提示我要去设置环境变量，然后我去看官方文档![image-20210728162049914](https://i.loli.net/2021/07/28/DA63PxJ1uMCKX92.png)

让我去创建一个.bash_profile文件，具体命令行如下

```javascript
cd ~
touch .bash_profile
open .bash_profile
然后在.bash_profile文件中写入
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
然后保存
```

我就以为完事了，我开心的试了一下nvm -v发现commond not found

然后我发现是我忘记运行bash_profile文件了,然后运行一下命令

```javascript
source .bash_profile
```

为了验证下成功没 nvm -v 发现成功了，有版本号了，我以为这就完了

我想验证下是不是装到了全局，我新打开了一个命令行窗口，继续运行nvm -v,竟然显示commond not found，但是继续执行<code>source .bash_profile</code>这个还是可以使用nvm的，但是我又不想每次都要写这个命令，所以我继续查找原因

写到这有点生气，啊啊啊啊啊

发现如果用zsh模式的，nvm其实是执行的.zshrc文件，然后我执行下面命令

```javascript
cd ~
touch .zshrc
open .zshrc
在.zshrc文件中写入
source .bash_profile
然后保存
```

新打开一个命令行窗口可以运行了，开森

> 注意： bash是.bashrc     zsh是执行的.zshrc

