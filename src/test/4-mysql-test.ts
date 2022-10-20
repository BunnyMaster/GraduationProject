const mysql = require("mysql");
const uuid = require("uuid");
const dayjs = require("dayjs");
// 创建 mysql 数据库连接
const connection = mysql.createConnection({
  // 数据库主机地址
  host: "localhost",
  // 端口号
  prot: 3306,
  // 数据库用户名
  user: "root",
  // 数据库密码 字符串
  password: "02120212",
  // 指定数据库
  database: "graduation",
});
//使用本地化语言
dayjs.locale("zh-cn");
let Id: string = uuid.v4();

let insertData: object = [
  [
    1,
    Id.split("-")[Id.split("-").length - 1],
    "test",
    "admin123456",
    dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    "1319900154@qq.com",
    "18012062876",
    "其他",
    6,
    123456789,
    "aa123",
  ],
];

// 查询数据库---执行完成之后是一个数组
connection.query("select * from login;", (err: any, result: any) => {
  if (err) console.log(err);
  if (result.length > 0) {
    /*   res.writeHead(200,{ "Content-Type": "text/html;charset=utf8" })
    res.write("登录成功")
    res.end();*/
  }
});

// 插入数据
/*connection.query(
  "INSERT into LOGIN (Id_Index,Id,UserName,UserPwd,createtime,email,Phone,Name,age,QQ,WeChat) values ?",
  [insertData],
  (err: any, result: object) => {
    if (err) console.log(err);
    else console.log(result);
  }
);*/
