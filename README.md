bootjs
======

BootJs is a synchroniaed module loader for browsers. Differs from asynchronous module loaders such as AMD/CMD impl, it tries to find an easiest way to make modularize possible ---- DONOT need to rewrite your code, just specified the dependencies simplely and bootjs will make every things right.

## Features

1. Besides js，BootJs supports loading css、html as well.
2. Compatible with any existing js/css/html files. All files can be generated as an AMD/CMD module.
3. No extra config files or constraint! 
4. Not support cross domain loading due to limit of XMLHttpRequest.

## Examples

Here we have such files:
    
    test/
     |-- assets
     |    |-- boot.js
     |    |-- func.css
     |    `-- func.js
     |-- include
     |    `-- page.inc
     |-- page.html
    
In page.html, use code below:

    <script>
      include("func.js");   // include JavaScript file(same as import in java)
      include("func.css");  // include CSS file
      include("~/include/page.inc"); // include HTML fragment(same as <? include() ?> in php), in which ~ equals to the path of current html.
	  
	  // "func.js" is already executed, we can use variables in "func.js" directly here.
    </script>
	
For more information, view the [document page](https://github.com/bootjs/bootjs/wiki/api).

## Build

Using bootjs build tools, all includes will be replaced by content relatived.

    $ bootjs build test/
	
For more information, view the [document page](https://github.com/bootjs/bootjs/wiki/build).

## Compatibility

- IE 6+             ✔
- Chrome 4+         ✔
- Firefox 2+        ✔
- Safari 3.2+       ✔
- Opera 10.5+       ✔

## Report bugs

[View issues](https://github.com/bootjs/bootjs/issues)

[New issue](https://github.com/bootjs/bootjs/issues/new)

## License

BootJs is released under the terms of the [MIT License](LICENSE.md).



