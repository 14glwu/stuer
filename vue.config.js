const glob = require('glob');
const titles = require('./title.js');

// 统一配置多页
const pages = {};
glob.sync('./src/pages/**/main.js').forEach((filePath) => {
  const chunk = filePath.split('./src/pages/')[1].split('/main.js')[0];
  pages[chunk] = {
    entry: filePath,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  };
});

module.exports = {
  pages,
  publicPath: process.env.NODE_ENV === 'production' ? 'public' : '/',
  outputDir: '../stuer-server/app/public',
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        ws: 'true',
        changeOrigin: 'true'
      }
    }
  }
};
