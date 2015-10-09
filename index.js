var purify = require('purify-css');

function AddCSSToHeadPlugin(opts) {
  opts = opts || {};
  this.minify = 'minify' in opts ? opts.minify : true;
  this.clean = 'clean' in opts ? opts.clean : true;
  this.amp = opts.amp;
}

AddCSSToHeadPlugin.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function(compilation, done) {
    var htmlFiles = [],
        cssFiles = [],
        css = '';

    for(var filename in compilation.assets) {
      if(filename.match(/\.html$/)) { htmlFiles.push(filename); }

      if(filename.match(/\.css$/)) {
        cssFiles.push(filename);
        css += compilation.assets[filename].source();
      }
    }

    htmlFiles.forEach(function(filename) {
      var html = compilation.assets[filename].source();
      var purified = purify(html, css, { minify: self.minify });
      html = insertIntoHead(html, purified, self.amp);
      updateAsset(compilation.assets, filename, html);
    });

    if(self.clean) { removeFromAssets(compilation.assets, cssFiles); }
    done();
  });
};

function insertIntoHead(html, css, amp) {
  var index = html.indexOf('<head>') + 6;
  var before = html.slice(0, index);
  var after = html.slice(index);
  var styleTag = '<style ' + (amp ? 'amp-custom' : '') + '>';
  return before + styleTag +  css + '</style>' + after;
}

function updateAsset(assets, filename, html) {
  assets[filename] = {
    source: function() { return html; },
    size:   function() { return html.length; }
  };
}

function removeFromAssets(assets, files) {
  files.forEach(function(filename) { delete assets[filename]; });
}

module.exports = AddCSSToHeadPlugin;
