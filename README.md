bootjs
======

BootJs is an extended AMD module loader for browsers. It allows front-end developers creating pages quickly with various pre-developed modules.

## Features

1. Besides js，BootJs supports loading css、html as well.
2. Compatible with any existing js/css/html files or CMD/AMD modules.
3. No extra config files or constraint! 

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
    
### Include Other Assets

    <script>
      include("./include/page.inc"); // include HTML fragment(same as <? include() ?> in php)
      include("./assets/func.js");   // include JavaScript file(same as import in java)
      include("./assets/func.css");  // include CSS file
    </script>

### Load modules asynchronously：

    require('./assets/func.js');
    
The content of func.js is：

    define(function()){
         return [1, 2, 3];
    });
    
func.js should better follow CommonJs,or it fails to require other modules.

### Build

Using bootjs build tools, all modules required can be packed.

    $ bootjs build test/
    
After build, include will be replaced and require will load the packed file rather than the source file.

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

BootJs is released under the terms of the [MIT License](http://seajs.org/LICENSE.md).



