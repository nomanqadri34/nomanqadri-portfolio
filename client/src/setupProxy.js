const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://alqadridev.onrender.com',
      changeOrigin: true,
    })
  );
}; 