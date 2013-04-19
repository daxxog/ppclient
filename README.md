ppclient
====================

(P)df (P)rint (CLIENT)

Install
-------
stable
```bash
npm install ppclient
```
edge
```bash
npm install https://github.com/daxxog/ppclient/tarball/master
```

Usage
------
```javascript
var Print = require('ppclient'),
    fs = require('fs');

Print.file('example.pdf');
Print.stream(fs.createReadStream('example.pdf'));
```