/**
 * Boot.js - A synchroniaed module loader for browsers.
 * @author xuld
 */

(function () {

    var nodes = document.getElementsByTagName("script"),
        bootJsScriptNode = nodes[nodes.length - 1],
        rootPath = this.BOOT_BASE_PATH || bootJsScriptNode.getAttribute('data-base') || getAbsoluteUrl(bootJsScriptNode, 'src'),
        mainModules = (bootJsScriptNode.getAttribute('data-main') || '').split(','),
        modules = {},
        i,
        moduleTypes = {
            include: 1,
            'import': 2,
            exclude: 0,
            included: 0
        };

    // Collect module infos.
    for (i = 0; i < mainModules.length; i++) {
        loadModule(mainModules[i], rootPath, 1);
    }

    // Perform module loading.
    for (i in modules) {
        bootJsScriptNode = modules[i];
        if (bootJsScriptNode === 1) {
            document.write('\r\n<script type="text/javascript" src="' + i + '"></script>\r\n');
        } else if (bootJsScriptNode === 2) {
            document.write('\r\n<link rel="stylesheet" type="text/css" href="' + i + '">\r\n');
        }
    }

    /**
     * Load a single module and the modules it required.
	 * @param {String} moduleUrl the module path.
	 * @param {String} baseModuleUrl the base module path.
     */
    function loadModule(moduleUrl, baseModuleUrl, moduleType) {
        
        // normalize path.
        moduleUrl = combinePath(baseModuleUrl, moduleUrl);

        // DONOT load twice.
        if (moduleUrl in modules) {
            return;
        }

        modules[moduleUrl] = moduleType;

        if (moduleType === 1) {

            // Parsing commands.
            loadContent(moduleUrl).replace(/^\s*\/\/\s*#(\w+)\s+(.*)$/gm, function (all, macro, args) {
                if (macro in moduleTypes) {
                    loadModule(args, moduleUrl, moduleTypes[macro]);
                }
            });

        }

    }

    /**
     * Get the absolute url of the specified relativePath.
	 * @param {String} basePath the base path.
	 * @param {String} relativePath the relative path.
     */
    function combinePath(basePath, relativePath) {

        // relativePath is already a absolute path.
        if (/^\/|:\/\//.test(relativePath)) {
            return relativePath;
        }

        // ~/ means relative to current html.
        if (/^~\//.test(relativePath)) {
            return relativePath.replace('~', location.href.replace(/[?#].*$/, "").replace(/\/([^\/]*\.[^\/]*|\/*)$/g, ""));
        }

        // relative to global base path.
        if (relativePath.charAt(0) !== '.') {
            basePath = rootPath;
        }

        // a\aa/index.html -> a/aa/  .
        basePath = basePath.replace(/[?#].*$/, "").replace(/\\/g, "/").replace(/\/([^\/]*\.[^\/]*|\/*)$/g, "");

        // make full path.
        basePath += '/' + relativePath;

        // Remove "/./" in path.
        basePath = basePath.replace(/\/(\.\/)+/g, "/");

        // Remove "/../" in path.
        while (/\/[^\/]+\/\.\.\//.test(basePath)) {
            basePath = basePath.replace(/\/[^\/]+\/\.\.\//, "/");
        }

        return basePath;
    }

    /**
     * Get the content of the specified url synchronously.
	 * @param {String} url the url to load.
     */
    function loadContent(url) {

        // Create new XMLHttpRequest instance(use ActiveXObject instead in IE 6-8).
        var xmlHttp = +"\v1" ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
            status;

        try {

            xmlHttp.open("GET", url, false);
            xmlHttp.send(null);
            status = xmlHttp.status;

            // Check http status.
            if ((status >= 200 && status < 300) || status == 304 || status == 1223) {
                return xmlHttp.responseText;
            }

            status = 'Network Error(' + status + ')';

        } catch (e) {

            status = window.location.protocol === 'file:' ? "This page is using file:// protocol, use http:// instead." : e.toString();

        } finally {

            // Release memory.
            xmlHttp = null;
        }

        // Print the error if console available.
        if (window.console && console.error) {
            console.error("File Load Error: " + url + "\r\n\tMessage: " + status);
        }

        return "";

    }

    /**
	 * Get the absolute url of specified script or link node.
	 * @param {Node} node the script or link node.
	 * @param {String} attrName the attribute name.
	 */
    function getAbsoluteUrl(node, attrName) {
        // Use getAttribute('src', 4) instead in IE 6-7 to get absolute url.
        return ((document.constructor ? node[attrName] : node.getAttribute(attrName, 4)) || "").replace(/[\?#].*$/, "");
    }

})();

