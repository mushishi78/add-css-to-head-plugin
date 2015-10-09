module.exports = function(render, done) {
  render('index.html', require('./pages/index.html'));
  render('about/index.html', require('./pages/about.html'));
  render('base.css', require('./css/base.css'));
  render('headings.css', require('./css/headings.css'));
  done();
};
