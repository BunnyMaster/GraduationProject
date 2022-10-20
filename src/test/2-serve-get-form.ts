// /*get获取表单数据*/
// const http = require("http");
// const url = require("url");
// const queryString = require("querystring");
// const port = 5500;
// const Router = http.createServer((req: any, res: any) => {
//   //  防止乱码
//   res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
//   const reqUrl = req.url;
//   //
//   const formVal = url.parse(reqUrl, true).query;
//   console.log(formVal.useName, formVal.usePwd);
//   // res.end();
//   res.end(`用户名:${formVal.useName},密码:${formVal.usePwd}`);
// });
// Router.listen(port);
// console.log(`${port} list......`);
