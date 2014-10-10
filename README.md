bootjs
======

BootJs is a synchroniaed module loader for browsers. Differs from asynchronous module loaders such as AMD/CMD impl, it tries to find an easiest way to make modularize possible ---- DONOT need to rewrite your code, just specified the dependencies simplely and bootjs will make every things right.

## Features

1. Support both js and css.
2. No extra config files required! 
4. Not support cross domain loading due to limit of XMLHttpRequest.

## Examples

Here we have such files:
    
    test/
     |-- assets
     |    |-- boot.js
     |    |-- page.css
     |    `-- page.js
     |-- page.html
    
In page.html, use code below:

    <script src="assets/boot.js" data-main="page.js, page.css"></script>

page.js and page.css will be loaded by boot.js
	
For more information, view the [document page](https://github.com/bootjs/bootjs/wiki/usage).

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



