bootjs
======

BootJs 是一个适合 Web 端的组件加载器。它能让前端将公用元素做成组件，并按需加载组件快速完成页面。

## 特性

1. 除了支持 js，BootJs 还支持 css、html的组件化。
2. BootJs 兼容现有的模块化代码，可直接加载 CMD 或 AMD 模块。
3. 通过发布工具将组件打包上线。并且发布工具没有复杂的配置和约束。

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
    
### 文件包含

    <script>
      include("./include/page.inc"); // include HTML fragment(same as <? include() ?> in php)
      include("./assets/func.js");   // include JavaScript file(same as import in java)
      include("./assets/func.css");  // include CSS file
    </script>

### 异步载入其它模块

    require('./assets/func.js');
    
func.js 内容如下：

    define(function()){
         return [1, 2, 3];
    });
    
func.js 最好遵循 CommonJs(或AMD) 规范，否则它将不能使用 require 功能。

### 发布

通过 bootjs 发布工具，可以将模块合并以减少请求数。

    $ bootjs build test/
    
发布后，include 会被内联，require 只请求合并后的单一文件。

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

BootJs 在 [MIT 协议](http://seajs.org/LICENSE.md) 下发布。


