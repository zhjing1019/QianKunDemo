
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 7100; // dev port

module.exports = {
  pages: {
    index: 'src/main.js',
    sub: 'src/sub-main.js',
  },
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath:`//localhost:${port}`,
  outputDir: 'dist',
  assetsDir: 'static',
  // build: {
  //   assetsPublicPath: '/',
  //   assetsSubDirectory: 'static'
  // }
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      //把子应用打包成 umd 库格式
      library: '[name]',
      filename: '[name].js',
      libraryTarget: 'umd',
      globalObject: 'this',
    }
  },
  // chainWebpack: config => {
  //   config.plugin("html").tap(args => {
  //     args[0].minify = false;
  //     return args;
  //   });
  // }
};
