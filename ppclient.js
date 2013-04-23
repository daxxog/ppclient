/* ppclient
 * (P)df (P)rint (CLIENT)
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {
    var request = require('request'),
        fs = require('fs');
    
    var Print = function(_server, _port) {
        this.server = (typeof _server == 'string') ? _server: '127.0.0.1';
        this.port = (typeof _port == 'number') ? _port : 9999;
        this.base = 'http://' + this.server + ':' + this.port.toString();
    };
    
    Print.prototype.file = function(fn) {
        return this.stream(fs.createReadStream(fn));
    };
    
    Print.prototype.stream = Print.prototype.buffer = Print.prototype.data = function(mixed, opt) {
        var r = request.post(this.base + '/print');
        r.form().append('pdf', mixed, (typeof opt == 'object') ? opt : {
            filename: 'print.pdf',
            contentType: 'application/pdf',
        });
        
        return r;
    };
    
    return function(_server, _port) {
        return new Print(_server, _port);
    };
}));