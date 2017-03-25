'use strict';

module.exports = appInfo => {
  const config = {};
  
  // set csrf to false for testing
  config.security = {
      csrf: false,
      domainWhiteList: ['http://localhost:8080'],
  };

  // should change to your own
  config.keys = appInfo.name + '_1490438538376_2407';
  
  config.mysql = {
      // 单数据库信息配置
      client: {
          // host
          host: '127.0.0.1',
          // 端口号
          port: '3306',
          // 用户名
          user: 'root',
          // 密码
          password: '199005',
          // 数据库名
          database: 'tantu',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
  };

  return config;
};
