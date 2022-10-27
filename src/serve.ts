var colors = require("colors-console");
const express = require("express");
var app = express();

// TODO 配置表单数据中间件
app.use(express.urlencoded({ extended: false }));

/*
 * TODO 在 RouterMoudles.ts 中导出的列表进行使用，因为里面是一个数组所以循环遍历并使用
 *  并且为其添加 /api/equipment 前缀
 */
const userRouter = require("./Router/RouterMoudles");
userRouter.forEach((routerItem: any) => app.use("/api/equipment", routerItem));

// TODO 监听端口6666的数据内容
app.listen(6666, () => {
  console.log(`${colors("reverse", "6666端口")}\t${colors("reverse", "根路径-->http://127.0.0.1:6666/")}`);
});

module.exports = app;
