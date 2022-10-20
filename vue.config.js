const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const WebpackBar = require("webpackbar");
module.exports = defineConfig({
  transpileDependencies: true,
  // TODO 打包时使用
  /* publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  indexPath: "index.html",*/
  lintOnSave: false,
  devServer: {
    proxy: {
      // TODO 访问api链接时
      "/api": {
        target: "http://localhost:6666", //这里填入你要请求的接口的前缀
      },
      //}
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: ["./src/assets/mixins/Themes.less"],
    },
  },
  configureWebpack: {
    plugins: [
      new WebpackBar(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
