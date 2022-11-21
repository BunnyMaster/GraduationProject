var MySQL = require("../../MySQL");
var Router = require("express").Router();
var dayjs = require("dayjs");
var uuid = require("uuid");

// TODO 随机 添加数据
Router.post("/InfraredCounterGun", (request: any, response: any) => {
  class RandomItemMakeLine {
    num = uuid.v4();
    time = `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`;

    index: number = parseInt((Math.random() * 66 + 0).toString());
    See: string = `${720 * parseInt(this.index / 10 + "")}*${620 * (parseInt(this.index / 10 + "") + 1)}`;
    // TODO 生产线随机
    WorkSpace() {
      let WorkSpace: string[] = ["金龙鱼生产线", "鱿鱼丝生产线", "金枪鱼生产线", "马哈鱼生产线"];
      let WorkSpaceIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return WorkSpace[WorkSpaceIndex];
    }

    // TODO 生产厂商随机
    PrinterType() {
      let Manufacturer: string[] = ["不干胶标签", "POSTEK标签", "PET标签", "吊牌", "水洗布"];
      let ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    }

    //打印类型
    Printertotype() {
      let Manufacturer: string[] = ["热敏纸打印不干胶标签", "热敏纸打印不干胶标签", "PET标签", "吊牌", "水洗布"];
      let ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    }

    // TODO 生产厂商随机
    PrinterUse() {
      let Manufacturer: string[] = ["水产", "海鲜", "机械制造", "家用小称", "大物体", "水果批发", "体重"];
      let ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    }

    // TODO 生产厂商随机
    PrinterName() {
      let Manufacturer: string[] = ["凯丰", "至尊", "蓉城", "今选", "香山", "英衡", "大红鹰", "睿智", "乐祺", "威衡"];
      let ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    }

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
    }

    // TODO 公司部门
    company() {
      let company: string[] = ["行政办公室", "人力资源部", "财务部", "生产技术部", "计划营销部", "安全监察部", "技术部"];
      let companyIndex: number = parseInt((Math.random() * company.length + 0).toString());
      return company[companyIndex];
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
  let infraredcountergun = new RandomItemMakeLine();
  let randonNum_last = infraredcountergun.num.split("-");
  let statement = `INSERT INTO graduation.infraredcountergun (BarCodeEquipment, DeviceType, PurchaseTime, ClassFacility, workStation, SubordinateStation, SensingDistance, GoNumber, SensingWay, manufacturer, PrincipalOfAssets, DepartmentOfOwnership) 
VALUES 
('infraredcountergun-${randonNum_last[randonNum_last.length - 1]}', '红外对射枪', '${infraredcountergun.time}', '${infraredcountergun.PrinterType()}', '${infraredcountergun.WorkSpace()}', '${infraredcountergun.index}号位', '${infraredcountergun.index}', 'infraredcounter-${
    randonNum_last[randonNum_last.length - 1]
  }', '${infraredcountergun.PrinterUse()}', '${infraredcountergun.PrinterMake()}', '${infraredcountergun.getName()}', '${infraredcountergun.company()}');`;

  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      const data = {
        code: -1,
        message: "失败",
        data: error,
      };
      response.send(data);
      console.log("POST /api/equipment/InfraredCounterGun---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: result,
      };
      response.send(data);
      console.log("POST /api/equipment/InfraredCounterGun---成功");
    }
  });
});

// TODO 获取数据
Router.get("/InfraredCounterGun", (request: any, response: any) => {
  let query: any = request.query;
  let statement = `select e.*,t.countNum from graduation.infraredcountergun e join (select count(*) as countNum from graduation.infraredcountergun) t limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement = `select e.*,t.countNum from graduation.infraredcountergun e join (select count(*) as countNum from graduation.infraredcountergun) t limit ${query.index - 1},${query.pageSize};`;
  }

  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      const data = {
        code: -1,
        message: "失败",
        data: error,
        AllPage: 0,
      };
      response.send(data);
      console.log("GET /api/equipment/InfraredCounterGun---错误");
    } else {
      const data = {
        code: 200,
        message: "获取成功",
        data: result,
        AllPage: result[0].countNum,
      };
      response.send(data);
      console.log("GET /api/equipment/InfraredCounterGun---成功");
    }
  });
});

// TODO 添加指定内容
Router.post("/InfraredCounterGunAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));
  let statement = `INSERT INTO graduation.infraredcountergun ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/InfraredCounterGunAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/InfraredCounterGunAddItem---成功");
    }
  });
});

// TODO 搜索人名infraredcountergun全部 访问 InfraredCounterGun 时发送请求,next---是中间件
Router.post("/InfraredCounterGunSearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  let statement = `SELECT *,a.countNum FROM graduation.infraredcountergun g join (select count(*) as countNum from graduation.infraredcountergun where PrincipalOfAssets like'%${data.keyword}%') a where g.PrincipalOfAssets like '%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement = `SELECT *,a.countNum FROM graduation.infraredcountergun g join (select count(*) as countNum from graduation.infraredcountergun where PrincipalOfAssets like'%${data.keyword}%') a where g.PrincipalOfAssets like '%${data.keyword}%' limit ${data.index - 1},${
      data.pageSize
    };`;
  }
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      console.log("GET /api/equipment/InfraredCounterGunSearch---错误");
      response.send(error);
    } else {
      if (result[0]) {
        let data = {
          code: 200,
          message: "请求数据成功",
          data: result,
          AllPage: result[0].countNum,
        };
        response.send(data);
        console.log("GET /api/equipment/InfraredCounterGunSearch---成功");
      } else {
        let data = {
          code: 200,
          message: "请求数据成功",
          data: result,
          AllPage: 0,
        };
        response.send(data);
        console.log("GET /api/equipment/InfraredCounterGunSearch---成功");
      }
    }
  });
});

// TODO 删除infraredcountergun数据
Router.post("/InfraredCounterGunDelete", (request: any, response: any, next: any) => {
  let query = request.query;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  let statement = `delete from graduation.infraredcountergun where id='${query.id}'`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      console.log("GET /api/equipment/InfraredCounterGunDelete---错误");
      response.send(error);
    } else {
      let data = {
        code: 200,
        message: "请求数据成功",
        data: "",
      };
      response.send(data);
      console.log("GET /api/equipment/InfraredCounterGunDelete---成功");
    }
  });
});

module.exports = Router;
