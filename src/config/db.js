
let  MYSQL_CONF= {
  // 打开哪个数据库
  database: 'test',
  // 用户名
  username: 'root',
  // 密码
  password: '123456',
  // 使用哪个数据库程序
  dialect: 'mysql',
  // 地址
  host: 'localhost',
  // 端口
  port: 3306,
  // 连接池
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: '+08:00',
}
let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}
module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
