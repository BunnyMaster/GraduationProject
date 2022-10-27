var MySQL = require("../../MySQL");
var Router = require("express").Router();
var dayjs = require("dayjs");
var uuid = require("uuid");

// ------------------------------------------------------------------------------------------------------------------

// TODO --获取数据--  员工表
Router.get("/PerformanceStaff", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `select * from graduation.staff limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `select * from graduation.staff limit ${query.index - 1},${query.pageSize};`;
  }
  let statement2 = `select count(*) as CountNum from graduation.staff`;
  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        const data = {
          code: -1,
          message: "失败",
          data: [error1, error2],
        };
        response.send(data);
        console.log("GET /api/equipment/PerformanceStaff---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          pageSize: CountNum[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/PerformanceStaff---成功");
      }
    });
  });
});

// TODO --获取数据-- 配置表
Router.get("/PerformanceConfig", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `select * from graduation.performance_configuration limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `select * from graduation.performance_configuration limit ${query.index - 1},${query.pageSize};`;
  }
  let statement2 = `select count(*) as CountNum from graduation.performance_configuration;`;
  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        const data = {
          code: -1,
          message: "失败",
          data: [error1, error2],
        };
        response.send(data);
        console.log("GET /api/equipment/PerformanceConfig---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          pageSize: CountNum[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/PerformanceConfig---成功");
      }
    });
  });
});

// TODO --获取数据-- 总表
Router.get("/Performance", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `select * from graduation.performance_configuration c join graduation.staff s on c.performanceNo=s.Codeempty limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `select * from graduation.performance_configuration c join graduation.staff s on c.performanceNo=s.Codeempty limit ${query.index - 1},${query.pageSize};`;
  }
  let statement2 = `select count(*) as CountNum from graduation.performance_configuration c join graduation.staff s on c.performanceNo=s.Codeempty`;
  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        const data = {
          code: -1,
          message: "失败",
          data: [error1, error2],
        };
        response.send(data);
        console.log("GET /api/equipment/Performance---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          pageSize: CountNum[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/Performance---成功");
      }
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------

// TODO --搜索人名PerformanceStaffSearch全部--
Router.post("/PerformanceStaffSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.staff where factoryMainName like'%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.staff where factoryMainName like'%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.staff where factoryMainName like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("GET /api/equipment/PerformanceStaffSearch---错误");
        response.send(error1, error2);
      } else {
        if (result[0]) {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            pageSize: CountNum[0].CountNum,
          };
          response.send(data);
          console.log("GET /api/equipment/PerformanceStaffSearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            pageSize: 0,
          };
          response.send(data);
          console.log("GET /api/equipment/PerformanceStaffSearch---成功");
        }
      }
    });
  });
});

// TODO --搜索人名PerformanceConfigSearch全部 --
Router.post("/PerformanceConfigSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.performance_configuration where Unit like'%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.performance_configuration where Unit like'%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.performance_configuration where Unit like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("GET /api/equipment/PerformanceConfigSearch---错误");
        response.send(error1, error2);
      } else {
        if (result[0]) {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            pageSize: CountNum[0].CountNum,
          };
          response.send(data);
          console.log("GET /api/equipment/PerformanceConfigSearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            pageSize: 0,
          };
          response.send(data);
          console.log("GET /api/equipment/PerformanceConfigSearch---成功");
        }
      }
    });
  });
});

// TODO --搜索Performance全部 --  搜索工作名
Router.post("/PerformanceSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.staff s join graduation.performance_configuration c on s.Codeempty=c.performanceNo where s.factoryMainName like'%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.staff s join graduation.performance_configuration c on s.Codeempty=c.performanceNo where s.factoryMainName like'%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.staff s join graduation.performance_configuration c on s.Codeempty=c.performanceNo where s.factoryMainName like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("GET /api/equipment/PerformanceSearch---错误");
        response.send(error1, error2);
      } else {
        if (result[0]) {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            pageSize: CountNum[0].CountNum,
          };
          response.send(data);
          console.log("GET /api/equipment/PerformanceSearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            pageSize: 0,
          };
          response.send(data);
          console.log("GET /api/equipment/PerformanceSearch---成功");
        }
      }
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------

// TODO 删除Performance数据
Router.post("/PerformanceStaffDelete", (request: any, response: any, next: any) => {
  let query = request.query;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  console.log(query);
  let statement = `delete from graduation.staff where id='${query.id}'`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      console.log("GET /api/equipment/PerformanceStaffDelete---错误");
      response.send(error);
    } else {
      let data = {
        code: 200,
        message: "请求数据成功",
        data: "",
      };
      response.send(data);
      console.log("GET /api/equipment/PerformanceStaffDelete---成功");
    }
  });
});

// TODO 删除Performance数据
Router.post("/PerformanceConfigDelete", (request: any, response: any, next: any) => {
  let query = request.query;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  console.log(query);
  let statement = `delete from graduation.performance_configuration where id='${query.id}'`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      console.log("GET /api/equipment/PerformanceConfigDelete---错误");
      response.send(error);
    } else {
      let data = {
        code: 200,
        message: "请求数据成功",
        data: "",
      };
      response.send(data);
      console.log("GET /api/equipment/PerformanceConfigDelete---成功");
    }
  });
});

// ------------------------------------------------------------------------------------------------------------------

// TODO 添加指定内容
Router.post("/PerformanceStaffAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));
  let statement = `INSERT INTO graduation.staff ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/PerformanceStaffAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/PerformanceStaffAddItem---成功");
    }
  });
});

// TODO 添加指定内容
Router.post("/PerformanceConfigAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));
  let statement = `INSERT INTO graduation.performance_configuration ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/PerformanceConfigAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/PerformanceConfigAddItem---成功");
    }
  });
});

module.exports = Router;
