module.exports = {
  publicPath: "",
  devServer: {
    proxy: {
      "/api": {
        target: "https://gelbooru.com/",
        secure: true,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
