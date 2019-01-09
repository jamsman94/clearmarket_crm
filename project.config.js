const NODE_ENV = process.env.NODE_ENV || 'development'
const [ip, port] = [require('ip'), '1314']
module.exports = {
  /** 当前服务端口 */
  port,
  /** 当前环境 */
  env: NODE_ENV,
  /** 基础绝对路径 */
  basePath: __dirname,
  /** 资源所在目录 */
  srcDir: 'src',
  /** 打包入口文件 */
  main: 'main',
  /** 输出目录 */
  outDir: 'dist',
  /** publicPath 公用路径 */
  publicPath: NODE_ENV === 'development' ? `http://${ip.address()}:${port}/` : './',
  /** devtool sourcemaps */
  sourcemaps: NODE_ENV === 'development',
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {},
  /** 是否打印日志 */
  verbose: false,
  /** 第三方的公用库 */
  vendors: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router-dom'
  ],
}
