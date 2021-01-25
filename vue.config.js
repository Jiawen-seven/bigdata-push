module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'common': '@/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
        'router': '@/router',
        'store': '@/store',
        'utils': '@/utils'
      }
    }
  }
}