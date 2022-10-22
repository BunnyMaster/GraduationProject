var MySQL = require("../../MySQL");
var Router = require("express").Router();
var dayjs = require("dayjs");
var uuid = require("uuid");
var Mock = require("mockjs");
var Random = Mock.Random;

// TODO 获取表单信息
Router.get("/RepairReacrd", (request: any, response: any) => {
  let obj = {
    id: Random.id(), // 身份证号
    guid: Random.guid(),
    name: Random.cname(),
    age: Random.integer(20, 50),
    asset: Random.float(200, 500000, 1, 6),
    married: Random.boolean(),
    birth: Random.datetime("yyyy-MM-dd HH:mm:ss"), // 值是指定格式的日期字符串
    // birth2: new Date(Random.datetime("yyyy-MM-dd HH:mm:ss")),  // 值是 Date 类型
    addr: `${Random.province()}-${Random.city()}-${Random.county()}`,
    email: Random.email("qq.com"),
    // word: Random.cword(2, 5),
    // string: Random.string(),
    title: Random.ctitle(10, 15),
    // senetence: Random.csentence(15, 20),
    // paragraph: Random.cparagraph(),
  };
  let statement = `SELECT g.*,r.CountNum FROM graduation.repairbill g join (select count(*) as CountNum from graduation.repairbill) r;`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "请求未修工单失败",
        data: error,
      };
      console.log("GET /api/equipment/RepairBill---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "成功",
        data: result,
        CountNum: result[0].CountNum,
      };
      console.log("GET /api/equipment/RepairBill---成功");
      response.send(data);
    }
  });
});

// TODO 添加表单信息
Router.post("/ReqRepairList", (request: any, response: any) => {
  let obj = {
    time: `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
    id: Random.id(), // 身份证号
    guid: Random.guid(),
    name: Random.cname(),
    age: Random.integer(20, 50),
    asset: Random.float(200, 500000, 1, 6),
    married: Random.boolean(),
    birth: Random.datetime("yyyy-MM-dd HH:mm:ss"), // 值是指定格式的日期字符串
    // birth2: new Date(Random.datetime("yyyy-MM-dd HH:mm:ss")),  // 值是 Date 类型
    addr: `${Random.province()}-${Random.city()}-${Random.county()}`,
    email: Random.email("qq.com"),
    // word: Random.cword(2, 5),
    // string: Random.string(),
    title: Random.ctitle(10, 15),
    // senetence: Random.csentence(15, 20),
    // paragraph: Random.cparagraph(),
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
    },
  };
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }

  startkey = startkey + "State";
  startvalue = startvalue + "'未完成'";

  let statement = `INSERT INTO graduation.repairbill ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "添加未修工单失败",
        data: [],
      };
      console.log("GET /api/equipment/ReqRepairList---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "添加成功",
        data: result,
      };
      console.log("GET /api/equipment/ReqRepairList---成功");
      response.send(data);
    }
  });
});

// TODO 修改已派工状态
Router.post("/RepairDispach", (request: any, response: any) => {
  let query = request.query;
  let statement = `UPDATE graduation.repairbill SET IsDispatch = "已派工" WHERE (id = '${query.index}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "修改工单失败",
        data: [],
      };
      console.log("GET /api/equipment/RepairDispach---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "状态修改成功",
        data: [],
      };
      console.log("GET /api/equipment/RepairDispach---成功");
      response.send(data);
    }
  });
});

// TODO 删除工单 DELETE FROM `graduation`.`repairbill` WHERE (`id` = '22');
Router.post("/DeleteRepairDispach", (request: any, response: any) => {
  let query = request.query;
  let statement = `DELETE FROM  graduation.repairbill WHERE (id = '${query.index}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "修改工单失败",
        data: [],
      };
      console.log("GET /api/equipment/DeleteRepairDispach---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "状态修改成功",
        data: [],
      };
      console.log("GET /api/equipment/DeleteRepairDispach---成功");
      response.send(data);
    }
  });
});

// TODO 设备台账添加
Router.post("/ADDequipmentledger", (request: any, response: any) => {
  let obj = {
    time: `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
    id: Random.id(), // 身份证号
    guid: Random.guid(),
    name: Random.cname(),
    age: Random.integer(20, 50),
    asset: Random.float(200, 500000, 1, 6),
    married: Random.boolean(),
    birth: Random.datetime("yyyy-MM-dd HH:mm:ss"), // 值是指定格式的日期字符串
    // birth2: new Date(Random.datetime("yyyy-MM-dd HH:mm:ss")),  // 值是 Date 类型
    addr: `${Random.province()}-${Random.city()}-${Random.county()}`,
    email: Random.email("qq.com"),
    // word: Random.cword(2, 5),
    // string: Random.string(),
    title: Random.ctitle(10, 15),
    // senetence: Random.csentence(15, 20),
    // paragraph: Random.cparagraph(),
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
    },
    // TODO 生产线随机
    CompanyType() {
      let companyType: string[] = ["局级", "处级", "科级", "董事长", "产品经理"];
      let companyTypeIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return companyType[companyTypeIndex];
    },
    //打印类型
    Printertotype() {
      let Manufacturer: string[] = ["热敏纸打印不干胶标签", "热敏纸打印不干胶标签", "PET标签", "吊牌", "水洗布"];
      let ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    },
    // TODO 生产厂商随机
    PrinterUse() {
      let Manufacturer: string[] = ["水产", "海鲜", "机械制造", "家用小称", "大物体", "水果批发", "体重"];
      let ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    },
    // TODO 生产厂商随机
    PrinterName() {
      let Manufacturer: string[] = ["凯丰", "至尊", "蓉城", "今选", "香山", "英衡", "大红鹰", "睿智", "乐祺", "威衡"];
      let ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    },
    // TODO 生产厂商随机
    PrinterMake() {
      let Manufacturer: string[] = [
        "深圳市博途电子科技有限公司",
        "深圳市晶衡科技有限公司是衡器、光学仪器等产品专业生产加工的公司",
        "深圳市贝约瀚有限公司",
        "明光市顺易达工艺品有限公司星狮称重设备(深圳)有限公司",
        "明光市顺易达工艺品有限公司星狮称重设备(深圳)有限公司",
        "永康市瑞扬工贸有限公司",
        "介花潮公司",
        "广州依芭衫工艺品商行",
        "东莞市诚有成电子有限公司",
        "深圳市瑞鸿鑫贸易有限公司",
      ];
      let ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    },
    // TODO 公司部门
    company() {
      let company: string[] = ["行政办公室", "人力资源部", "财务部", "生产技术部", "计划营销部", "安全监察部", "技术部"];
      let companyIndex: number = parseInt((Math.random() * company.length + 0).toString());
      return company[companyIndex];
    },
  };
  let statement = `INSERT INTO graduation.equipmentledger (EquipmentLedgerNum, EquipmentType, EquipmentEPEC,  Provider, SubPerson, ToUse, ImportanTime, principal) VALUES ('eql-${obj.id}', '打印机', '${obj.Printertotype()}',  '${obj.PrinterMake()}', '${
    obj.name
  }', '${obj.PrinterUse()}', '${obj.time}', '${obj.getName()}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "添加设备台账失败",
        data: error,
      };
      console.log("POST /api/equipment/ReqRepairList---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "添加成功",
        data: result,
      };
      console.log("POST /api/equipment/ReqRepairList---成功");
      response.send(data);
    }
  });
});

// TODO 获取设备台账
Router.get("/GETequipmentledger", (request: any, response: any) => {
  let query = request.query;
  let statement = `SELECT g.*,r.CountNum FROM graduation.equipmentledger g join (select count(*) as CountNum from graduation.equipmentledger) r limit ${query.index},${query.pageSize};`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "请求设备台账失败",
        data: error,
      };
      console.log("GET /api/equipment/GETequipmentledger---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "成功",
        data: result,
        CountNum: result[0].CountNum,
      };
      console.log("GET /api/equipment/GETequipmentledger---成功");
      response.send(data);
    }
  });
});

Router.post("/test", (request: any, response: any) => {
  let data = request.body;
  response.send(data);
});

module.exports = Router;
