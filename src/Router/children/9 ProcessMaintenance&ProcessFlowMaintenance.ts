var MySQL = require("../../MySQL");
var Router = require("express").Router();
var dayjs = require("dayjs");
var uuid = require("uuid");
var Mock = require("mockjs");
var Random = Mock.Random;

// TODO 获取获取工艺数据  ProcessMaintenance-ProcessFlowMaintenance
Router.get("/ProcessMaintenance", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `select g.*,s.CountNum from graduation.p_processmaintenance g join (select count(*) as CountNum from graduation.p_processmaintenance) s limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `select g.*,s.CountNum from graduation.p_processmaintenance g join (select count(*) as CountNum from graduation.p_processmaintenance) s limit ${query.index - 1},${query.pageSize};`;
  }
  let statement2 = `select g.*,s.CountNum from graduation.p_processmaintenance g join (select count(*) as CountNum from graduation.p_processmaintenance) s;`;
  if (query.index) {
    MySQL.query(statement1, (error: any, result: any) => {
      if (error) {
        const data = {
          code: -1,
          message: "失败",
          data: error,
        };
        response.send(data);
        console.log("GET /api/equipment/ProcessMaintenance---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          countPage: result[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/ProcessMaintenance---成功");
      }
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
        console.log("GET /api/equipment/ProcessMaintenance---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
        };
        response.send(data);
        console.log("GET /api/equipment/ProcessMaintenance---成功");
      }
    });
  }
});

// TODO 获取工艺流程数据  ProcessMaintenance-ProcessFlowMaintenance
Router.get("/ProcessFlowMaintenance", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `select g.*,s.CountNum from graduation.p_processflowmaintenance g join (select count(*) as CountNum from graduation.p_processflowmaintenance) s limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `select g.*,s.CountNum from graduation.p_processflowmaintenance g join (select count(*) as CountNum from graduation.p_processflowmaintenance) s limit ${query.index - 1},${query.pageSize};`;
  }
  let statement2 = `select g.*,s.CountNum from graduation.p_processflowmaintenance g join (select count(*) as CountNum from graduation.p_processflowmaintenance) s;`;
  if (query.index) {
    MySQL.query(statement1, (error: any, result: any) => {
      if (error) {
        const data = {
          code: -1,
          message: "失败",
          data: error,
        };
        response.send(data);
        console.log("GET /api/equipment/ProcessFlowMaintenance---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          countPage: result[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/ProcessFlowMaintenance---成功");
      }
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
        console.log("GET /api/equipment/ProcessFlowMaintenance---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
        };
        response.send(data);
        console.log("GET /api/equipment/ProcessFlowMaintenance---成功");
      }
    });
  }
});

// TODO 获取工艺和流程 ProcessMaintenance-ProcessFlowMaintenance
Router.get("/ProcessMaintenanceANDFlowMaintenance", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `SELECT a.*,b.* FROM graduation.p_processmaintenance a JOIN (SELECT * FROM graduation.p_processflowmaintenance) b on a.ProcessMaintenanceNo=b.ProcessMaintenanceNo limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `SELECT a.*,b.* FROM graduation.p_processmaintenance a JOIN (SELECT * FROM graduation.p_processflowmaintenance) b on a.ProcessMaintenanceNo=b.ProcessMaintenanceNo limit ${query.index - 1},${query.pageSize};`;
  }
  let statement2 = `SELECT a.*,b.* FROM graduation.p_processmaintenance a JOIN (SELECT * FROM graduation.p_processflowmaintenance) b on a.ProcessMaintenanceNo=b.ProcessMaintenanceNo`;
  let statement3 = `SELECT count(*) as CountNum FROM graduation.p_processmaintenance a JOIN (SELECT * FROM graduation.p_processflowmaintenance) b on a.ProcessMaintenanceNo=b.ProcessMaintenanceNo;`;

  MySQL.query(statement3, (error1: any, CountNUm: any) => {
    if (error1) {
      const data = {
        code: -1,
        message: "失败",
        data: error1,
      };
      response.send(data);
      console.log("GET /api/equipment/ProcessMaintenanceANDFlowMaintenance---错误");
    } else {
      if (query.index) {
        MySQL.query(statement1, (error: any, result: any) => {
          if (error) {
            const data = {
              code: -1,
              message: "失败",
              data: error,
            };
            response.send(data);
            console.log("GET /api/equipment/ProcessMaintenanceANDFlowMaintenance---错误");
          } else {
            const data = {
              code: 200,
              message: "获取成功",
              data: result,
              countPage: CountNUm[0].CountNum,
            };
            response.send(data);
            console.log("GET /api/equipment/ProcessMaintenanceANDFlowMaintenance---成功");
          }
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
            console.log("GET /api/equipment/ProcessMaintenanceANDFlowMaintenance---错误");
          } else {
            const data = {
              code: 200,
              message: "获取成功",
              data: result,
            };
            response.send(data);
            console.log("GET /api/equipment/ProcessMaintenanceANDFlowMaintenance---成功");
          }
        });
      }
    }
  });
});

//---------------------------------------获取获取工艺数据---------------------------------------------------

// TODO --搜索人名ProcessMaintenanceSearch全部-- 工序名称
Router.post("/ProcessMaintenanceSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.p_processmaintenance where ProcessMaintenanceName like'%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.p_processmaintenance where ProcessMaintenanceName like'%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.p_processmaintenance where ProcessMaintenanceName like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("GET /api/equipment/ProcessMaintenanceSearch---错误");
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
          console.log("GET /api/equipment/ProcessMaintenanceSearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            countPage: 0,
          };
          response.send(data);
          console.log("GET /api/equipment/ProcessMaintenanceSearch---成功");
        }
      }
    });
  });
});

// TODO 删除Performance数据
Router.post("/ProcessMaintenanceDelete", (request: any, response: any, next: any) => {
  let query = request.query;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  let statement = `delete from graduation.p_processmaintenance where id='${query.id}'`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      console.log("GET /api/equipment/ProcessMaintenanceDelete---错误");
      response.send(error);
    } else {
      let data = {
        code: 200,
        message: "请求数据成功",
        data: "",
      };
      response.send(data);
      console.log("GET /api/equipment/ProcessMaintenanceDelete---成功");
    }
  });
});

// TODO 添加指定内容
Router.post("/ProcessMaintenanceAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));
  let statement = `INSERT INTO graduation.p_processmaintenance ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/ProcessMaintenanceAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/ProcessMaintenanceAddItem---成功");
    }
  });
});

//---------------------------------------获取获取工艺数据---------------------------------------------------

//---------------------------------------获取工艺流程数据---------------------------------------------------

// TODO --搜索人名ProcessFlowMaintenanceSearch全部--  流程维护
Router.post("/ProcessFlowMaintenanceSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.p_processflowmaintenance where ProcessMaintenanceName like'%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.p_processflowmaintenance where ProcessMaintenanceName like'%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.p_processflowmaintenance where ProcessMaintenanceName like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("GET /api/equipment/ProcessFlowMaintenanceSearch---错误");
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
          console.log("GET /api/equipment/ProcessFlowMaintenanceSearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            pageSize: 0,
          };
          response.send(data);
          console.log("GET /api/equipment/ProcessFlowMaintenanceSearch---成功");
        }
      }
    });
  });
});

// TODO 删除Performance数据
Router.post("/ProcessFlowMaintenanceDelete", (request: any, response: any, next: any) => {
  let query = request.query;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  let statement = `delete from graduation.p_processflowmaintenance where id='${query.id}'`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      console.log("GET /api/equipment/ProcessFlowMaintenanceDelete---错误");
      response.send(error);
    } else {
      let data = {
        code: 200,
        message: "请求数据成功",
        data: "",
      };
      response.send(data);
      console.log("GET /api/equipment/ProcessFlowMaintenanceDelete---成功");
    }
  });
});

// TODO 添加指定内容
Router.post("/ProcessFlowMaintenanceAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));
  let statement = `INSERT INTO graduation.p_processflowmaintenance ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/ProcessFlowMaintenanceAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/ProcessFlowMaintenanceAddItem---成功");
    }
  });
});

//---------------------------------------获取工艺流程数据---------------------------------------------------

module.exports = Router;
