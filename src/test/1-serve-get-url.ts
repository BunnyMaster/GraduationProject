// /*get---请求url擦书*/
// const http = require("http");
// const url = require("url");
// const queryString = require("querystring");
// const port = 5500;
// const server = http.createServer((request: any, response: any) => {
//   const reqUrl = request.url;
//   // 传递query参数
//   console.log(`${url.parse(reqUrl)}query的参数`);
//   //将query参数解析成JSON格式
//   const queryUrl = url.parse(reqUrl).query;
//   console.log(queryString.parse(queryUrl));
//   response.end();
// });
// server.listen(port); //监听的端口号
// console.log(`${port} 端口listening......`);
