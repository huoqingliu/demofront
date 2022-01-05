export default {
  /**
   * @description 配置显示在浏览器标签页的title
   */
  title: '',
  /**
   * @description token在cookie里储存的时间，默认为30分钟
   */
  cookieExpires: '30',
   /**
   * @description 根据所属应用设置token名称，例：demoToken
   */
  TokenKey: 'demoToken',
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要的路由设置meta:{title:'xxx},用来在菜单中显示对于标签文字
   */
  useI18n: true,
   /**
   * @description api请求的基础路径
   */
  baseUrl: {
    dev: "/api",
    pro:""
  },
  /**
   * @description 默认打开首页的路由name值，默认为home
   */
  homeName: 'home',
   /**
   * @description 获取后台页面展示API的IP地址
   */
  backIP: 'http://localhost:9080/demofront/',
}