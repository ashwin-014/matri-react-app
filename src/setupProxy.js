const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/ssnmlprofilelist.php', '/ssnmlprofile.php'],
    createProxyMiddleware({
      target: 'https://www.ssmatri.com',
      changeOrigin: true,
    })
  );
};