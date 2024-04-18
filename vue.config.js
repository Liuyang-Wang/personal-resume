const outputDir = 'static';
function resolve(dir) {
  return require('path').join(__dirname, dir);
}
const isProduction = process.env.NODE_ENV === 'production';
const CDN_LINK = 'https://unpkg.com/';

const cdn = {
  // 忽略打包的第三方库
  /**
   * externals 对象属性解析：
   * '包名' : '浏览器环境中的对象名字'
   * 以element-ui举例 他在浏览器环境中的对象名字叫ELEMENT
   * 所以这样写'element-ui': 'ELEMENT'
   */
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios'
  },
  js: [
    CDN_LINK + 'vue@2.6.14/dist/vue.min.js',
    CDN_LINK + 'vue-router@3.5.2/dist/vue-router.min.js',
    CDN_LINK + 'vuex@3.6.2/dist/vuex.min.js',
    CDN_LINK + 'axios@0.21.4/dist/axios.min.js'
  ],
  css: []
};

module.exports = {
  publicPath: '/', // 静态资源目录
  outputDir, // 构建输出目录
  assetsDir: 'resource', // 静态资源目录
  lintOnSave: true, // 是否开启代码检测
  productionSourceMap: false, // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  devServer: {
    port: 8018, // 端口
    open: true, // 自动打开
    overlay: {
      warnings: false, // eslint语法warnings显示
      errors: true // eslint语法errors显示
    },
    proxy: {
      // 代理
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    disableHostCheck: true
  },
  css: {
    // 开启 css modules
    requireModuleExtension: false,
    loaderOptions: {
      scss: {
        // 引用全局变量
        prependData: `@import "~@/style/variables/index.scss";`
      }
    }
  },
  configureWebpack: config => {
    // 配置jquery
    // entry: {
    //   app: './src/main.js'
    // }
    // 忽略打包
    if (isProduction) {
      config.externals = cdn.externals;
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
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
      .end();
    if (isProduction) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
    // 打包屏蔽console.log
    config.optimization.minimizer('terser').tap(args => {
      args.forEach(item => {
        if (Object.prototype.hasOwnProperty.call(item, 'terserOptions')) {
          Object.assign(item.terserOptions.compress, {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          });
        }
        item.terserOptions.format = {
          comments: false
        };
      });
      return args;
    });
  }
};
