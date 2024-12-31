const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://datawiztechapi.onrender.com', // Replace with your API's base URL
    changeOrigin: true, // Optional: preserve host header
  }));
};