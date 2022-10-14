const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const WebpackBar = require("webpackbar");
module.exports = defineConfig({
  transpileDependencies: true,
  /* publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  indexPath: "index.html",*/
  lintOnSave: false,
  // devServer: {
  //   host: "localhost",
  //   port: 8080,
  //   https: false,
  //   hot: false,
  //   proxy: null,
  // },
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
