var MySQL = require("../../MySQL");
var Router = require("express").Router();
var fs = require("fs");
var formidable = require("formidable");
var bodyParser = require("body-parser");
var rootPath = require("app-root-path");
var multer = require("multer");
var dayjs = require("dayjs");
var uuid = require("uuid");

// TODO 注册信息
Router.post("/register", (request: any, response: any) => {
  class RandomItemMakeLine {
    num = uuid.v4();
    time = `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`;
    index: number = parseInt((Math.random() * 66 + 0).toString());

    // TODO 生产线随机
    PeopleClass() {
      var WorkSpace: string[] = ["管理员", "其他", "员工", "高级工程师", "IT员工", "维修工", "车间组长", "经理", "产品设计"];
      var WorkSpaceIndex: number = parseInt((Math.random() * WorkSpace.length + 0).toString());
      return WorkSpace[WorkSpaceIndex];
    }

    // TODO 生产厂商随机
    HeaderImages() {
      var HeaderList: string[] = [
        "https://img2.woyaogexing.com/2022/10/20/aad087bdb04cd0c3!400x400.jpg",
        "https://img2.woyaogexing.com/2022/10/20/49ad8fdc396fcf16!400x400.jpg",
        "https://img2.woyaogexing.com/2022/10/20/0b4245fa8ebaee43!400x400.jpg",
        "https://img2.woyaogexing.com/2022/10/20/4aa5d8a5ea5829b3!400x400.jpg",
        "https://img2.woyaogexing.com/2022/10/20/760be4a79c221bc6!400x400.jpg",
        "https://img2.woyaogexing.com/2022/10/20/44f70435f7549d8c!400x400.jpg",
      ];
      var HeaderListIndex: number = parseInt((Math.random() * HeaderList.length + 0).toString());
      return HeaderList[HeaderListIndex];
    }
  }
  var register = new RandomItemMakeLine();
  let query = request.query;
  MySQL.query(`Select * from graduation.login where UserName='${query.UserName}'`, (error1: any, result2: any) => {
    if (result2.length === 0) {
      MySQL.query(`INSERT INTO graduation.login (id, UserName, UserPwd, CreateTime, Name,HeaderImage) VALUES ('${register.num}','${query.UserName}','${query.UserPwd1}','${register.time}','${register.PeopleClass()}','${register.HeaderImages()}');`, (error: any, result: any) => {
        if (error) {
          let data: object = {
            code: -1,
            message: "注册失败",
            data: error,
          };
          console.log("POST /api/equipment/Login---失败");
          response.send(data);
        } else {
          let data: object = {
            code: 200,
            message: "注册成功",
            data: [],
          };
          console.log("POST /api/equipment/Login---成功");
          response.send(data);
        }
      });
    } else {
      let data: object = {
        code: 201,
        message: "此用户已存在",
        data: [],
      };
      console.log("POST /api/equipment/Login---成功");
      response.send(data);
    }
  });
});

// TODO 用户登录
Router.post("/Login", (request: any, response: any) => {
  let query = request.query;
  MySQL.query(`SELECT * FROM graduation.login where UserName="${query.UserName}" and UserPwd="${query.UserPwd}";`, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "用户名或密码不正确",
        data: error,
      };
      console.log("POST /api/equipment/Login---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "登录成功",
        data: result,
      };
      console.log("POST /api/equipment/Login---成功");
      response.send(data);
    }
  });
});

// TODO 修改信息
Router.post("/ChangeUserInfo", (request: any, response: any) => {
  let body = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  let startvalue = "";

  for (let i in request.body) {
    if (i === "id" || i === "Id_Index") continue;
    startvalue += `${i}='${request.body[i]}'` + ",";
  }
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));
  //  语句
  let statement: string = `UPDATE graduation.login SET ${startvalue}  WHERE (Id_Index = '${body.Id_Index}') and (id = '${body.id}');`;

  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: 201,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/ChangeUserInfo---错误");
    } else {
      let data: object = {
        code: 200,
        message: "修改成功",
      };
      console.log("POST /api/equipment/ChangeUserInfo---成功");
      response.send(data);
    }
  });
});

// TODO 登录信息
Router.post("/LoginHome", (request: any, response: any) => {
  let query = request.query;
  MySQL.query(`SELECT * FROM graduation.login where UserName="${query.UserName}";`, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "请求用户名失败",
        data: result,
      };
      console.log("POST /api/equipment/LoginHome---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "用户信息",
        data: result,
      };
      console.log("POST /api/equipment/LoginHome---成功");
      response.send(data);
    }
  });
});

// TODO 未修工单
Router.get("/RepairBill", (request: any, response: any) => {
  let query = request.query;
  MySQL.query(`SELECT * FROM graduation.repairbill where Name="${query.Name}";`, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "请求未修工单失败",
        data: result,
      };
      console.log("GET /api/equipment/RepairBill---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "成功",
        data: result,
      };
      console.log("GET /api/equipment/RepairBill---成功");
      response.send(data);
    }
  });
});

// TODO 添加工单
Router.post("/RepairBill", (request: any, response: any) => {
  class RandomItemMakeLine {
    num = uuid.v4();
    index: number = parseInt((Math.random() * 66 + 0).toString());

    // TODO 生产线随机
    RepairBill() {
      var WorkSpace: string[] = ["完成", "未完成", "警告", "错误"];
      var WorkSpaceIndex: number = parseInt((Math.random() * WorkSpace.length + 0).toString());
      return WorkSpace[WorkSpaceIndex];
    }

    // TODO 生产厂商随机
    City() {
      var Manufacturer: string[] = ["沈阳", "长春", "上海", "南京", "武汉", "广州", "重庆", "成都", "西安"];
      var ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    }

    // TODO 公司部门
    RepairItem() {
      var company: string[] = ["空调外机", `${this.index}号机床`, `${this.index}栋宿舍`, "消防泵房", "推拉门", "洗衣机", "热水器"];
      var companyIndex: number = parseInt((Math.random() * company.length + 0).toString());
      return company[companyIndex];
    }

    // TODO 平板电脑生产商
    PadMake() {
      var PadMake: string[] = [
        "神舟",
        "研强科技公司",
        "北京启阳科技有限公司",
        "北京奇创彩晶科技发展有限公司",
        "华强北",
        "中国核工业集团有限公司",
        "中国航天科技集团有限公司",
        "中国航空工业集团有限公司",
        "中国航空发动机集团有限公司",
        "中国船舶集团有限公司",
        "中国兵器工业集团有限公司",
        "中国兵器装备集团有限公司",
        "中国电子科技集团有限公司",
        "中国电子信息产业集团有限公司",
      ];
      var PadMakeIndex: number = parseInt((Math.random() * PadMake.length + 0).toString());
      return PadMake[PadMakeIndex];
    }

    // TODO 工作人员
    getName() {
      var name: string;
      var familyNames: string[] = [
        "赵",
        "钱",
        "孙",
        "李",
        "周",
        "吴",
        "郑",
        "王",
        "冯",
        "陈",
        "褚",
        "卫",
        "蒋",
        "沈",
        "韩",
        "杨",
        "朱",
        "秦",
        "尤",
        "许",
        "何",
        "吕",
        "施",
        "张",
        "孔",
        "曹",
        "严",
        "华",
        "金",
        "魏",
        "陶",
        "姜",
        "戚",
        "谢",
        "邹",
        "喻",
        "柏",
        "水",
        "窦",
        "章",
        "云",
        "苏",
        "潘",
        "葛",
        "奚",
        "范",
        "彭",
        "郎",
        "鲁",
        "韦",
        "昌",
        "马",
        "苗",
        "凤",
        "花",
        "方",
        "俞",
        "任",
        "袁",
        "柳",
        "酆",
        "鲍",
        "史",
        "唐",
        "费",
        "廉",
        "岑",
        "薛",
        "雷",
        "贺",
        "倪",
        "汤",
        "滕",
        "殷",
        "罗",
        "毕",
        "郝",
        "邬",
        "安",
        "常",
        "乐",
        "于",
        "时",
        "傅",
        "皮",
        "卞",
        "齐",
        "康",
        "伍",
        "余",
        "元",
        "卜",
        "顾",
        "孟",
        "平",
        "黄",
        "和",
        "穆",
        "萧",
        "尹",
      ];
      var givenNames: string[] = [
        "子璇",
        "淼",
        "国栋",
        "夫子",
        "瑞堂",
        "甜",
        "敏",
        "尚",
        "国贤",
        "贺祥",
        "晨涛",
        "昊轩",
        "易轩",
        "益辰",
        "益帆",
        "益冉",
        "瑾春",
        "瑾昆",
        "春齐",
        "杨",
        "文昊",
        "东东",
        "雄霖",
        "浩晨",
        "熙涵",
        "溶溶",
        "冰枫",
        "欣欣",
        "宜豪",
        "欣慧",
        "建政",
        "美欣",
        "淑慧",
        "文轩",
        "文杰",
        "欣源",
        "忠林",
        "榕润",
        "欣汝",
        "慧嘉",
        "新建",
        "建林",
        "亦菲",
        "林",
        "冰洁",
        "佳欣",
        "涵涵",
        "禹辰",
        "淳美",
        "泽惠",
        "伟洋",
        "涵越",
        "润丽",
        "翔",
        "淑华",
        "晶莹",
        "凌晶",
        "苒溪",
        "雨涵",
        "嘉怡",
        "佳毅",
        "子辰",
        "佳琪",
        "紫轩",
        "瑞辰",
        "昕蕊",
        "萌",
        "明远",
        "欣宜",
        "泽远",
        "欣怡",
        "佳怡",
        "佳惠",
        "晨茜",
        "晨璐",
        "运昊",
        "汝鑫",
        "淑君",
        "晶滢",
        "润莎",
        "榕汕",
        "佳钰",
        "佳玉",
        "晓庆",
        "一鸣",
        "语晨",
        "添池",
        "添昊",
        "雨泽",
        "雅晗",
        "雅涵",
        "清妍",
        "诗悦",
        "嘉乐",
        "晨涵",
        "天赫",
        "?傲",
        "佳昊",
        "天昊",
        "萌萌",
        "若萌",
      ];
      var i: number = parseInt((Math.random() * familyNames.length + 0).toString());
      var familyName: string = familyNames[i];
      var j: number = parseInt((Math.random() * givenNames.length + 0).toString());
      var givenName: string = givenNames[j];
      name = familyName + givenName;
      return name;
    }
  }
  var LoginTime = new RandomItemMakeLine();
  let query = request.query;
  MySQL.query(
    `INSERT INTO graduation.repairbill ( Time, Name, State, City, Address, DeviceName) VALUES ( "${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}", 'admin', '${LoginTime.RepairBill()}', '${LoginTime.City()}', '${LoginTime.PadMake()}', '${LoginTime.RepairItem()}');`,
    (error: any, result: any) => {
      if (error) {
        let data: object = {
          code: -1,
          message: "添加失败",
          data: error,
        };
        console.log("POST /api/equipment/RepairBill---失败");
        response.send(data);
      } else {
        let data: object = {
          code: 200,
          message: "添加成功",
          data: [],
        };
        console.log("POST /api/equipment/RepairBill---成功");
        response.send(data);
      }
    },
  );
});
module.exports = Router;
