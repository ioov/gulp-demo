#### markdown语法
nodeppt是支持**marked**语法的，但是为了制作出来更加完美的ppt，扩展了下面的语法

#### 配置
基本配置如下：
```markdown
title: 分享测试
speaker: koala4js
url: http://koala4js.github.io/share
transition: glue
files: /css/demo.css, /js/demo.js

[slide style="background-image:url('/img/bg1.png')"]
# 这是个有背景的家伙
## 我是副标题

[slide]
## 主页面样式
### ----是上下分割线
----
nodeppt是基于nodejs写的支持 **Markdown!** 语法的网页PPT
nodeppt：https://koala4js.github.io

[slide data-transition="vertical3d"]
## 这是个动画

[slide]
<div class="file-setting">
    <p>这是html</p>
</div>
<p id="css-demo">这是css样式</p>
<p>具体看下项目中 ppts/demo.md 代码</p>
<script>
    function testScriptTag(){

    }
    console.log(typeof testScriptTag);
</script>
<style>
#css-demo{
    color: red;
}
</style>

[slide data-outcallback="outcallback" data-incallback="incallback"]
## 当进入此页，就执行incallback函数
## 当离开此页面，就执行outcallback函数

[slide]
### 市面上主要的css预处理器：less\sass\stylus
---
 |less| sass | stylus
:-------|:------:|-------:|--------
环境 |js/nodejs | Ruby | nodejs
扩展名 | .less | .sass/.scss | .styl
特点 | 老牌，用户多，支持js解析 | 功能全，有成型框架，发展快 | 语法多样，小众
案例/框架 | [Bootstrap](http://getbootstrap.com/) | [compass](http://compass-style.org) [bourbon](http://bourbon.io) |

[slide]
<iframe data-src="http://www.baidu.com" src="about:blank;"></iframe>