# tantu-backend

eggjs simple login system using restful api 


### Development

1. run backend project

```shell
$ cd server
$ npm install
$ npm run dev
```

2. run frontend project

```shell
$ npm install
$ npm run dev
$ open http://localhost:7001/
```

### Configuration

Config mysql in file `server/config/config.default.js`.

```javascript
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
          password: 'xxx',
          // 数据库名
          database: 'tantu',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
  };
```


### Deploy

Use `EGG_SERVER_ENV=prod` to enable prod mode

```shell
$ EGG_SERVER_ENV=prod npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


### TODO

[ ] 1. password encode  
[ ] 2. username unique validate


[egg]: https://eggjs.org
