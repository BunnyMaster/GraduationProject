var MySQL = require("../../MySQL");
var Router = require("express").Router();
var dayjs = require("dayjs");
var uuid = require("uuid");
var Mock = require("mockjs");
var Random = Mock.Random;

// TODO 获取获取工艺数据  todolist-todolist
Router.post("/todolistAll", (request: any, response: any) => {
  if (request.body.isShow === "1") {
    let query: any = request.body;
    let statement1 = `select * from graduation.todolist where isShow<>0 limit ${query.index},${query.pageSize};`;
    if (query.index === "1" || query.index === 1) {
      statement1 = `select * from graduation.todolist where isShow<>0 limit ${query.index - 1},${query.pageSize};`;
    }

    let statement2 = `select count(*) as CountNum from graduation.todolist where isShow<>0;`;
    if (query.index) {
      MySQL.query(statement1, (error1: any, result1: any) => {
        MySQL.query(statement2, (error2: any, result2: any) => {
          if (error1 || error2) {
            const data = {
              code: -1,
              message: "失败",
              data: [error1, error2],
            };
            response.send(data);
            console.log("GET /api/equipment/todolist---错误");
          } else {
            const data = {
              code: 200,
              message: "获取成功",
              data: result1,
              countPage: result2[0].CountNum,
            };
            response.send(data);
            console.log("GET /api/equipment/todolist---成功");
          }
        });
      });
    } else {
      MySQL.query(statement1, (error: any, result: any) => {
        if (error) {
          const data = {
            code: -1,
            message: "失败",
            data: error,
          };
          response.send(data);
          console.log("GET /api/equipment/todolist---错误");
        } else {
          const data = {
            code: 200,
            message: "获取成功",
            data: result,
          };
          response.send(data);
          console.log("GET /api/equipment/todolist---成功");
        }
      });
    }
  } else {
    let query: any = request.body;

    let statement1 = `select * from graduation.todolist limit ${query.index},${query.pageSize};`;
    let statement2 = `select count(*) as CountNum from graduation.todolist`;
    if (query.index) {
      MySQL.query(statement1, (error1: any, result1: any) => {
        MySQL.query(statement2, (error2: any, result2: any) => {
          if (error1 || error2) {
            const data = {
              code: -1,
              message: "失败",
              data: [error1, error2],
            };
            response.send(data);
            console.log("GET /api/equipment/todolist---错误");
          } else {
            const data = {
              code: 200,
              message: "获取成功",
              data: result1,
              countPage: result2[0].CountNum,
            };
            response.send(data);
            console.log("GET /api/equipment/todolist---成功");
          }
        });
      });
    } else {
      MySQL.query(statement2, (error: any, result: any) => {
        if (error) {
          const data = {
            code: -1,
            message: "失败",
            data: error,
          };
          response.send(data);
          console.log("GET /api/equipment/todolist---错误");
        } else {
          const data = {
            code: 200,
            message: "获取成功",
            data: result,
          };
          response.send(data);
          console.log("GET /api/equipment/todolist---成功");
        }
      });
    }
  }
});

// TODO --搜索人名todolistSearch全部-- 工序名称
Router.post("/todolistSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.todolist where TodoDetail like '%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.todolist where TodoDetail like '%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.todolist where TodoDetail like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("GET /api/equipment/todolistSearch---错误");
        response.send(error1, error2);
      } else {
        if (result[0]) {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            countPage: CountNum[0].CountNum,
          };
          response.send(data);
          console.log("GET /api/equipment/todolistSearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            countPage: 0,
          };
          response.send(data);
          console.log("GET /api/equipment/todolistSearch---成功");
        }
      }
    });
  });
});

// TODO --修改显示状态 删除
Router.post("/todolistUpdateDelete", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement = `update graduation.todolist set isshow ='0' where (uuid = '${data.id}')`;

  if (data.id) {
    MySQL.query(statement, (error: any, result: any) => {
      if (error) {
        let data = {
          code: -1,
          message: "失败",
          data: "",
        };
        response.send(data);
        console.log("GET /api/equipment/todolistUpdate---成功");
      } else {
        let data = {
          code: 200,
          message: "请求数据成功",
          data: "更改成功",
        };
        response.send(data);
        console.log("GET /api/equipment/todolistUpdate---成功");
      }
    });
  } else {
    response.send({
      code: 201,
      message: "参数错误",
    });
  }
});

// TODO --修改完成情况
Router.post("/todolistUpdatecomplet", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement = `update graduation.todolist set Sate ='${data.Sate}' where (uuid = '${data.uuid}')`;
  console.log(data);
  if (data.Sate && data.uuid) {
    MySQL.query(statement, (error: any, result: any) => {
      if (error) {
        let data = {
          code: -1,
          message: "失败",
          data: "",
        };
        response.send(data);
        console.log("GET /api/equipment/todolistUpdate---成功");
      } else {
        let data = {
          code: 200,
          message: "请求数据成功",
          data: "更改成功",
        };
        response.send(data);
        console.log("GET /api/equipment/todolistUpdate---成功");
      }
    });
  } else {
    response.send({
      code: 201,
      message: "参数错误",
    });
  }
});

// TODO 添加指定内容
Router.post("/todolistAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey += "uuid";
  startvalue += `'${uuid.v4()}'`;

  let statement = `INSERT INTO graduation.todolist ( ${startkey}) VALUES (${startvalue});`;
  console.log(statement);
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/todolistAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/todolistAddItem---成功");
    }
  });
});

module.exports = Router;
