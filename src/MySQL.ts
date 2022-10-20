const mySQL = require("mysql");

const Databases = mySQL.createPool({
  host: "localhost", // 数据库的 IP 地址
  user: "root", // 登录名
  password: "02120212", // 登录密码
  databases: "graduation", // 需要哪个数据库
});

module.exports = Databases;
