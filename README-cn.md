bootjs
======

BootJs 是一个扩展的 AMD 模块加载器。它除了能加载传统的 CMD 模块，还能同步包含代码文件，并提供了一个使用简单的打包压缩工具。

## 特性

1. 除了支持 js，BootJs 还支持载入 css、html。
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
    
### 直接包含其它文件

    <script>
      include("./include/page.inc"); // 包含其它 HTML 片段（相当于 php 中的 include 函数）
      include("./assets/func.js");   // 包含其它 JavaScript 片段（相当于 java 的 import）
      include("./assets/func.css");  // 包含其它 CSS 片段
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


