var MySQL = require("../../MySQL");
var Router = require("express").Router();
var dayjs = require("dayjs");
var uuid = require("uuid");
var Mock = require("mockjs");
var Random = Mock.Random;

// TODO 获取员工上下班数据
Router.get("/MountGuardRecords", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `select g.*,s.CountNum from graduation.staff g join (select count(*) as CountNum from graduation.staff) s limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `select g.*,s.CountNum from graduation.staff g join (select count(*) as CountNum from graduation.staff) s limit ${query.index - 1},${query.pageSize};`;
  }
  let statement2 = `select g.*,s.CountNum from graduation.staff g join (select count(*) as CountNum from graduation.staff) s;`;
  if (query.index) {
    MySQL.query(statement1, (error: any, result: any) => {
      if (error) {
        const data = {
          code: -1,
          message: "失败",
          data: error,
        };
        response.send(data);
        console.log("GET /api/equipment/MountGuardRecords---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          countPage: result[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/MountGuardRecords---成功");
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
        console.log("GET /api/equipment/MountGuardRecords---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
        };
        response.send(data);
        console.log("GET /api/equipment/MountGuardRecords---成功");
      }
    });
  }
});

//-----------------------------------------订单管理------------------------------------------------------

// TODO 获取订单管理数据
Router.get("/OrderManagement", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `SELECT o.*,t.CountNum FROM graduation.order_management o join(SELECT count(*) as CountNum FROM graduation.order_management) t limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `SELECT o.*,t.CountNum FROM graduation.order_management o join(SELECT count(*) as CountNum FROM graduation.order_management) t limit ${query.index - 1},${query.pageSize};`;
  }
  let statement2 = `SELECT o.*,t.CountNum FROM graduation.order_management o join(SELECT count(*) as CountNum FROM graduation.order_management) t;`;
  if (query.index) {
    MySQL.query(statement1, (error: any, result: any) => {
      if (error) {
        const data = {
          code: -1,
          message: "失败",
          data: error,
        };
        response.send(data);
        console.log("GET /api/equipment/OrderManagement---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          countPage: result[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/OrderManagement---成功");
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
        console.log("GET /api/equipment/OrderManagement---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
        };
        response.send(data);
        console.log("GET /api/equipment/OrderManagement---成功");
      }
    });
  }
});

// TODO 搜索  --- 主要负责人
Router.post("/OrderManagementSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.order_management where Mainname like '%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.order_management where Mainname like '%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.order_management where Mainname like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("GET /api/equipment/OrderManagement---错误");
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
          console.log("GET /api/equipment/OrderManagement---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            countPage: 0,
          };
          response.send(data);
          console.log("GET /api/equipment/OrderManagement---成功");
        }
      }
    });
  });
});

// TODO 删除
Router.post("/DeleteOrderManagement", (request: any, response: any) => {
  let query = request.body;
  let statement = `DELETE FROM  graduation.order_management WHERE (id = '${query.id}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "修改失败",
        data: [],
      };
      console.log("POST /api/equipment/DeleteOrderManagement---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "删除成功",
        data: [],
      };
      console.log("POST /api/equipment/DeleteOrderManagement---成功");
      response.send(data);
    }
  });
});

// TODO 添加指定内容
Router.post("/OrderManagementAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));

  let statement = `INSERT INTO graduation.order_management ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/OrderManagementAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/OrderManagementAddItem---成功");
    }
  });
});

//-------------------------------------------订单维护----------------------------------------------------

// TODO 获取维护订单管理数据
Router.get("/RepairOrderMaintenance", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `SELECT o.*,m.*,t.CountNum FROM graduation.order_repairordermaintenance o join (SELECT * FROM graduation.order_management) m on o.id=m.id join (SELECT count(*) as CountNum FROM graduation.order_repairordermaintenance a join (SELECT * FROM graduation.order_management) b on a.id=b.id) t limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `SELECT o.*,m.*,t.CountNum FROM graduation.order_repairordermaintenance o join (SELECT * FROM graduation.order_management) m on o.id=m.id join (SELECT count(*) as CountNum FROM graduation.order_repairordermaintenance a join (SELECT * FROM graduation.order_management) b on a.id=b.id) t limit ${
      query.index - 1
    },${query.pageSize};`;
  }
  let statement2 = `SELECT o.*,m.*,t.CountNum FROM graduation.order_repairordermaintenance o join (SELECT * FROM graduation.order_management) m on o.id=m.id join (SELECT count(*) as CountNum FROM graduation.order_repairordermaintenance a join (SELECT * FROM graduation.order_management) b on a.id=b.id) t;`;
  if (query.index) {
    MySQL.query(statement1, (error: any, result: any) => {
      if (error) {
        const data = {
          code: -1,
          message: "失败",
          data: error,
        };
        response.send(data);
        console.log("GET /api/equipment/RepairOrderMaintenance---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          countPage: result[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/RepairOrderMaintenance---成功");
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
        console.log("GET /api/equipment/RepairOrderMaintenance---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
        };
        response.send(data);
        console.log("GET /api/equipment/RepairOrderMaintenance---成功");
      }
    });
  }
});

// TODO 搜索  --- 主要负责人
Router.post("/RepairOrderMaintenanceSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.order_repairordermaintenance where artifactClass like '%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.order_repairordermaintenance where artifactClass like '%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.order_repairordermaintenance where artifactClass like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("POST /api/equipment/RepairOrderMaintenanceSearch---错误");
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
          console.log("POST /api/equipment/RepairOrderMaintenanceSearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            countPage: 0,
          };
          response.send(data);
          console.log("POST /api/equipment/RepairOrderMaintenanceSearch---成功");
        }
      }
    });
  });
});

// TODO 删除
Router.post("/DeleteRepairOrderMaintenance", (request: any, response: any) => {
  let query = request.body;
  let statement = `DELETE FROM  graduation.order_repairordermaintenance WHERE (id = '${query.id}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "修改失败",
        data: [],
      };
      console.log("POST /api/equipment/DeleteRepairOrderMaintenanceSearch---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "删除成功",
        data: [],
      };
      console.log("POST /api/equipment/DeleteRepairOrderMaintenanceSearch---成功");
      response.send(data);
    }
  });
});

// TODO 添加指定内容
Router.post("/RepairOrderMaintenanceAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));

  let statement = `INSERT INTO graduation.order_repairordermaintenance ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/RepairOrderMaintenanceAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/RepairOrderMaintenanceAddItem---成功");
    }
  });
});

module.exports = Router;
