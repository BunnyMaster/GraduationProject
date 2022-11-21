var Router = require("express").Router();
var MySQL = require("../../MySQL");
var fs = require("fs");
var multer = require("multer");
var Mock = require("mockjs");

Router.post("/FindDate", (request: any, response: any) => {
  let data: any = request.body;
  let statement1 = `select * from graduation.todolist where AddTime like '%${request.body.data}%';`;
  MySQL.query(statement1, (error: any, result: any) => {
    if (error) {
      const data = {
        code: -1,
        message: "失败",
        data: error,
      };
      response.send(data);
      console.log("POST /api/equipment/FindDate---错误");
    } else {
      const data = {
        code: 200,
        message: "获取成功",
        data: result,
      };
      response.send(data);
      console.log("POST /api/equipment/FindDate---成功");
    }
  });
});

module.exports = Router;
