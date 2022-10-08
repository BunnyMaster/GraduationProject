// /*post请求表单数据*/
// const http = require("http");
// const queryString = require("querystring");
// const port = 5500;
// const Serve = http.createServer((req: any, res: any) => {
//   let postVal = "";
//   req.on("data", (chunk: any) => {
//     postVal += chunk;
//   });
//   req.on("end", () => {
//     console.log(queryString.parse(postVal));
//     res.end();
//   });
// });
// console.log(`${port} listening.....`);
// Serve.listen(port);
