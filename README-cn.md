bootjs
======

BootJs 是一个适合 Web 端的同步组件加载器。不同于异步加载器(如 requirejs/seajs)，它以最少的成本来实现模块化的开发————无需对已有代码作任何改动，只需添加一行依赖列表，bootjs就可以自动处理全部的依赖关系。

## 特性

1. 除了支持 js，BootJs 还支持 css、html的组件化。
2. BootJs 兼容现有的任何代码。所有文件都可转换为 CMD 或 AMD 模块。
3. 通过发布工具将组件打包上线。并且发布工具没有复杂的配置和约束。
4. 由于 XMLHttpRequest 的限制，BootJs 不支持跨域加载。

## 示例

假设我们有如下文件:
    
    test/
     |-- assets
     |    |-- boot.js
     |    |-- func.css
     |    `-- func.js
     |-- include
     |    `-- page.inc
     |-- page.html
    
在 page.html 中使用如下代码：

    <script>
      include("func.js");   // 包含其它 JavaScript 片段（相当于 java 的 import）
      include("func.css");  // 包含其它 CSS 片段
      include("~/include/page.inc"); // 包含其它 HTML 片段（相当于 php 中的 include 函数）, 其中 ~ 表示当前 HTML 的路径。
    </script>
	
更多信息查看[文档页面](https://github.com/bootjs/bootjs/wiki/api)。

## 发布

通过 bootjs 发布工具，可以将 include 合并掉以减少请求数。

    $ bootjs build test/
	
更多信息查看[文档页面](https://github.com/bootjs/bootjs/wiki/build)。

## 兼容性

- IE 6+             ✔
- Chrome 4+         ✔
- Firefox 2+        ✔
- Safari 3.2+       ✔
- Opera 10.5+       ✔

## 报告 BUG

[查看讨论话题](https://github.com/bootjs/bootjs/issues)

[新建话题](https://github.com/bootjs/bootjs/issues/new)

## 协议

BootJs 在 [MIT 协议](LICENSE.md) 下发布。


