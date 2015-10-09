var purify = require('purify-css');

function AddCSSToHeadPlugin(opts) {
  opts = opts || {};
  this.minify = opts.minify || true;
  this.clean = opts.clean || true;
}

AddCSSToHeadPlugin.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function(compilation, done) {
    var htmlFiles = [],
        cssFiles = []
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

      var headStart = html.indexOf('<head>') + 6;
      html = html.slice(0, headStart) + '<style>' + purified + '</style>' + html.slice(headStart);

      compilation.assets[filename] = {
        source: function() { return html; },
        size:   function() { return html.length; }
      };
    });

    if(self.clean) {
      cssFiles.forEach(function(filename) {
        delete compilation.assets[filename];
      });
    }

    done();
  });
};

module.exports = AddCSSToHeadPlugin;
