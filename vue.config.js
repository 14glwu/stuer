module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'public' : '/',
  outputDir: '../stuer-server/dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        ws: 'true',
        changeOrigin: 'true'
      }
    }
  }
};
