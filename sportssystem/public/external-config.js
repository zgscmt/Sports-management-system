var externalConfig = {
    /**
     * 当前代码所在环境
     * test  测试环境
     * production    生产服务器环境
     */
    env: 'production', //production
    /**
     * 接口域名地址
     *  注意：
     *      分环境配置不同的域名
     *      分具体需求配置不同的域名
     *          举例：http 和 websocket,配置如下
     *          domain :{
     *              httpServer:{
     *
     *              },
     *              websocketServer:{
     *
     *              }
     *          }
     *       配置的域名后面通知补全  “/" ,
     *          举例：http://www.baidu.com/
     *          反例：http://www.baidu.com
     */
    domain: {
        test: "http://127.0.0.1:5000/",
        production: 'http://8.142.216.58:5000/'
    },
    /**
     * 网站站点信息
     * 网站的名字，logo等配置在website下面
     */
    website: {
        // logo: "",
        // name: ""
    }
}
