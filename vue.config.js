// vue-config.js
/*const path = require('path')
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js', // 把src 修改为examples
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  /!* chainWebpack 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。 *!/
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(__dirname + 'comp') // 注意这里需要绝对路径，所有要拼接__dirname
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      }).end()
    /!* config.module
       .rule("vue")
       .use("vue-loader")
       .loader("vue-loader")
       .options({
         prefix: false,
       })
       .end()*!/
  }
}*/
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

function assetsPath(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    'static' :
    'static'
  return path.posix.join(assetsSubDirectory, _path)
}

const name = defaultSettings.title || '智慧校园统一平台' // page title

const port = process.env.port || process.env.npm_config_port || 9524 // dev port

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'build',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/rest': {
        target: 'http://10.0.0.22:8086',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/rest": "/rest"
        }
      },
      '/cas': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true, // 是否跨域
        secure: false,
        pathRewrite: {
          "^/cas": "/cas"
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    module: {
      rules: [{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonrs/[name].[hash:7].[ext]')
        }
      }]
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [{
      rel: 'preload',
      // to ignore runtime.js
      // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
