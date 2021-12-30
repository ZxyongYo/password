
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/password/' : '', //根路径
  outputDir: 'dist' //打包的时候生成的文件名
}
