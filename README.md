Add CSS to Head Plugin
======================

Webpack plugin that adds purified css to the head of html files.

Install
-------

``` console
$ npm install --save-dev add-css-to-head-plugin
```

Usage
-----

### webpack.config.js

``` javascript
var AddCSSToHeadPlugin = require('add-css-to-head-plugin');

module.exports = {
  ...
  plugins: [new AddCSSToHeadPlugin()]
};
```
