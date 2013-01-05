 /**
  * Boot.js - An extended AMD module loader for browsers.
  */
  

  
//(function(window){
	
	// Do not overwrite and existing bootjs instance.
	// if(typeof window.bootjs === 'function'){
		// return;
	// }

	var modules = {}, 
		waitModuleList = {},
		op = Object.prototype,
		toString = op.toString,
		hasOwnProperty = op.hasOwnProperty,
		ap = Array.prototype,
		id = 1,
		isArray = Array.isArray || function (obj) {
			return toString.call(obj) === '[object Array]';
		},
		
		// When requiring an anonymous module, anonymousModuleId is used as its name.
		// This value is set before loading modules in require function.
		anonymousModuleId = null,
		currentlyAddingScript,
		baseURL = (function(){

			var aJS = document.getElementsByTagName('script');

			var ret = aJS[aJS.length-1].src.replace(/\/[^\/]+$/, '');

			if(!/^[a-z]+?:\/\//.test(ret)){

				var sLocation = document.location.toString();

				//修正IE下相对路径不能返回完整的路径

				if(/^\//.test(ret)){

					ret = sLocation.replace(/((.*?\/){3}).*$/,'$1') + ret.substr(1);

				}else{

					ret = sLocation.replace(/[^\/]+$/, '') + ret;

				}

			}

			return ret;

		}());
	
    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
	function define(id, dependencies, factory){

        // Allow for anonymous modules
		// define(factory) => define(null, factory)
		// define(dependencies, factory) => define(null, dependencies, factory)
        if (typeof id !== 'string') {
            factory = dependencies;
            dependencies = id;
            id = null;
        }

        // This module may not have dependencies
		// define(id, factory) => define(id, null, factory)
        if (!isArray(dependencies)) {
            factory = dependencies;
            dependencies = null;
        }

        // If no name, and factory is a function, then figure out if it a
        // CommonJS thing with dependencies.
		// define(factory) => define(null, ["require", "exports", "modules"], factory)
        if (!dependencies && typeof factory === 'function' && factory.length) {
            
			// May be a CommonJS thing even without require calls, but still
			// could use exports, and module. Avoid doing exports and module
			// work though if it just needs require.
			// REQUIRES the function to expect the CommonJS variables in the
			// order listed below.
			dependencies = factory.length === 1 ? ['require'] : ['require', 'exports', 'module'];
			
			// Remove comments from the factory string,
			// look for require calls, and pull them into the dependencies.
			var sourceCode = factory.toString();
			sourceCode
				.replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, '')
				.replace(new RegExp('(?:^|[^.$])\\b' + (/^function\s*\(\s*(\w+)/.exec(sourceCode) || [0, "require"])[1] + '\\s*\\(\\s*([\"\'])([^\"\'\\s\)]+)\\1\\s*\\)', 'g'), function (_, dependency) {
					dependencies.push(dependency);
				});
        }

		var module = modules[id];
		
		/* 
        // If in IE 6-8 and hit an anonymous define() call, do the interactive
        // work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        // Always save off evaluating the def call until the script onload handler.
        // This allows multiple modules to be in a file without prematurely
        // tracing dependencies, and allows for anonymous module support,
        // where the module name is not known until the script onload event
        // occurs. If no context, use the global queue, and get it processed
        // in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
		 */
	}
	
    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
	function require(modulePath, callback){
	
        // This modules maybe an array
		// require([module], successCallback) => define([module], successCallback)
        // if (isArray(dependencies)) {
            
			// var aModule = sModule;
			
			// bTempModule = true;

			// define('require' + (id++), modules, function(){return [].slice.call(arguments);});

        // }
		
		var module = new Module('require' + (id++), modulePath, callback);
		
		module.load();
		
		// Build all instances of module for dependencies.
		// for(var i = 0; i < modulePath.length; i++){
			// modules[i] = new Module(modulePath);
		// }
		
	}
	
	function Module(id, dependencies, factory){
		this.depExports = [];
	}
	
	Module.prototype = {
	
		/**
		 * The ready state of current module. The values are:
		 * 1 - the module is just created.
		 * 2 - The module is loading.
		 * 3 - The module is loaded, but it's dependencies are not ready.
		 * 4 - The module is loaded completely.
		 */
		readyState: 1,
		
		load: function() {
			
			// If current modules' dependencies are ready.
			if(this.check()){
			
			}
		
			require.loadScript(this.url, function(){
				
			
			}, this.charset);
		},
	
		/**
		 * Checks is the module is ready to define itself, and if so,
		 * define it.
		 */
		check: function () {
		
			var dependencies = this.dependencies,
				i, 
				module,
				depExports;
			
			// Check dependent modules.
			if(dependencies){
				for(i = dependencies.length - 1; i >= 0; i--){
					
					depExports = dependencies[i];
				
					module = modules[depExports];
					
					// If at least one module is not created or loaded, stop check.
					if(!module || module.readyState !== 4){
					
						// Add current module to waitlist.
						if(depExports in waitModuleList){
							waitModuleList[depExports].push(this);
						} else {
							waitModuleList[depExports] = [this];
						}
						
						loadModule(depExports, module);
					
						return false;
					}
				}
			}
			
			// Everything is ready. Then we define the current module.
			depExports = [];
			
			for(i = dependencies.length - 1; i >= 0; i--){
				depExports[i] = module[dependencies[i]].exports;
			}
			
			this.loaded(depExports);
			
			// Check Modules that depends on this module.
			var waitModules = waitModuleList[this.id];
			
			if(waitModules){
				for(i = 0; i < waitModules.length; ) {
					if(waitModules[i].check()){
						waitModules.splice(i, 1);
					} else {
						i++;
					}
				}
			}
			
			return true;
		},
		
		loaded: function(depExports){
			
			// define the module after all dependencies is ready.
			var exports = this.factory.apply(null, depExports);
			
			if(exports !== undefined){
				this.exports = exports;
			}
			
			this.readyState = 4;
		
		}
	
	};
	
	function loadModule(moduleId, moduleInstance){
	
		// Convert id to url.
		var moduleUrl = require.toUrl(moduleId);
		
		// If there is one module loading.
		if(anonymousModuleId){
			
			anonymousModuleId = moduleId;
			
			require.loadScript(moduleUrl, function(){
			
				// When loading an AMD or CMD module, specific module will be created.
				var module = modules[moduleId];
				
				if(module){
					module.check();
				}
				
				anonymousModuleId = null;
			});
			
		}
	
	}
	
	var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
	
	require.loadScript = function(url, callback, charset){
	
		var script = document.createElement('script');
		
		if (charset) {
			script.charset = charset;
		}
		
		// It's boring to handler script onerror event. Then we just ignore it.
		script.onload = script.onerror = script.onreadystatechange = function() {
			if (/loaded|complete|undefined/.test(script.readyState)) {
					
				// Ensure run only once and handle memory leak in IE.
				script.onload = script.onerror = script.onreadystatechange = null;

				// Remove the script to reduce memory leak.
				if (script.parentNode) {
					head.removeChild(script);
				}

				// Dereference the script.
				script = null;
				
				// Call the callback.
				callback();
			}
		};
		
		script.async = 'async';
		script.src = url;
		
		currentlyAddingScript = script;
		
		head.insertBefore(script, head.firstChild);
		
		currentlyAddingScript = null;
		
	};
	
	require.loadStyle = function(){
	
	
	};
	
	require.getText = function(){
	
	
	};
	
	require.toUrl = function(){
		var segments = path.split("/");
		for (var i = segments.length; i >= 0; i--) {
		var pkg;
		var parent = segments.slice(0, i).join("/");
		if (paths[parent]) {
		 segments.splice(0, i, paths[parent]);
			break;
		}else if ((pkg = pkgs[parent])) {
		 var pkgPath;
			if (path === pkg.name) {
				pkgPath = pkg.location + '/' + pkg.main;
			} else {
				pkgPath = pkg.location;
			}
			 segments.splice(0, i, pkgPath);
			 break;
					}
		}
		path = segments.join("/");
				if (path.charAt(0) !== '/') {
				 path = cfg.baseUrl + path;
				}
		path = _normalize(path);
		return path;

	};
	
	define.amd = {bootjs: 1.0};



//})(this);