var MySQL = require("../../MySQL");
var Router = require("express").Router();
var dayjs = require("dayjs");
var uuid = require("uuid");
var Mock = require("mockjs");
var Random = Mock.Random;

//-------------------------------------------企业----------------------------------------------------

// TODO 随机 添加数据
Router.post("/Company", (request: any, response: any) => {
  class RandomItemMakeLine {
    num = uuid.v4();
    time = `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`;
    Code: number = parseInt((Math.random() * 9 + 0).toString() + "00" + (Math.random() * 9 + 0).toString());
    index: number = parseInt((Math.random() * 66 + 0).toString());
    See: string = `${720 * parseInt(this.index / 10 + "")}*${620 * (parseInt(this.index / 10 + "") + 1)}`;
    // TODO 生产线随机
    CompanyType() {
      let companyType: string[] = ["局级", "处级", "科级", "董事长", "产品经理"];
      let companyTypeIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return companyType[companyTypeIndex];
    }

    // TODO
    City() {
      let province: string[] = [
        "山东",
        "山西",
        "河南",
        "河北",
        "陕西",
        "内蒙古",
        "上海市",
        "北京市",
        "重庆市",
        "天津市",
        "福建",
        "广东",
        "广西",
        "云南",
        "浙江",
        "贵州",
        "新疆",
        "西藏",
        "江西",
        "湖南",
        "湖北",
        "黑龙江",
        "吉林",
        "辽宁",
        "江苏",
        "甘肃",
        "青海",
        "四川",
        "安徽",
        "宁夏",
        "海南",
        "香港",
        "澳门",
        "台湾",
      ];
      let provinceIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return province[provinceIndex];
    }

    // TODO 生成身份证
    getId_no() {
      var coefficientArray = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"]; // 加权因子
      var lastNumberArray = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; // 校验码
      var address = "420101"; // 住址
      var birthday = "19810101"; // 生日
      var s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
      var array = (address + birthday + s).split("");
      var total = 0;
      for (let i in array) {
        total = total + parseInt(array[i]) * parseInt(coefficientArray[i]);
      }
      var lastNumber = lastNumberArray[parseInt((total % 11).toString())];
      var id_no_String: string = (address + birthday + s + lastNumber).toString();
      return id_no_String;
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
  let Company = new RandomItemMakeLine();
  let randonNum_last = Company.num.split("-");
  let statement = ` INSERT INTO graduation.enterprise (EnterpriseLeave, CompanyName, CompanyRegisteredCapital, Corp, CorpIdentityCard, CompanyAddress, PostalCode,Codeempty) VALUES ('${Company.CompanyType()}', '${Company.PrinterMake()}', '${
    Company.index + Company.index
  }', '${Company.getName()}', '${Company.getId_no()}', '${Company.City()}', '${Company.index}${Company.index}${Company.index}${Company.index}${Company.index}',${Company.Code});`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      const data = {
        code: -1,
        message: "失败",
        data: error,
      };
      response.send(data);
      console.log("POST /api/equipment/Company---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: result,
      };
      response.send(data);
      console.log("POST /api/equipment/Company---成功");
    }
  });
});

// TODO 获取数据
Router.get("/Company", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `select e.*,t.countNum from graduation.enterprise e join (select count(*) as countNum from graduation.enterprise) t limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `select e.*,t.countNum from graduation.enterprise e join (select count(*) as countNum from graduation.enterprise) t limit ${query.index - 1},${query.pageSize};`;
  }

  let statement2 = `select * from graduation.enterprise `;
  if (query.index) {
    MySQL.query(statement1, (error: any, result: any) => {
      if (error) {
        const data = {
          code: -1,
          message: "失败",
          data: error,
        };
        response.send(data);
        console.log("GET /api/equipment/Company---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
        };
        response.send(data);
        console.log("GET /api/equipment/Company---成功");
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
        console.log("GET /api/equipment/Company---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
        };
        response.send(data);
        console.log("GET /api/equipment/Company---成功");
      }
    });
  }
});

// TODO 搜索  ---Corp 法人
Router.post("/CompanySearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.enterprise where Corp like '%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.enterprise where Corp like '%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.enterprise where Corp like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("POST /api/equipment/CompanySearch---错误");
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
          console.log("POST /api/equipment/CompanySearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            countPage: 0,
          };
          response.send(data);
          console.log("POST /api/equipment/CompanySearch---成功");
        }
      }
    });
  });
});

// TODO 删除
Router.post("/DeleteCompany", (request: any, response: any) => {
  let query = request.body;
  let statement = `DELETE FROM  graduation.enterprise WHERE (id = '${query.id}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "修改失败",
        data: [],
      };
      console.log("POST /api/equipment/DeleteCompanySearch---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "删除成功",
        data: [],
      };
      console.log("POST /api/equipment/DeleteCompanySearch---成功");
      response.send(data);
    }
  });
});

// TODO 添加指定内容
Router.post("/CompanyAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));

  let statement = `INSERT INTO graduation.enterprise ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/CompanyAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/CompanyAddItem---成功");
    }
  });
});

//-------------------------------------------工厂----------------------------------------------------

// TODO 插入工厂 随机 添加数据
Router.post("/factory", (request: any, response: any) => {
  class RandomItemMakeLine {
    num = uuid.v4();
    time = `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`;
    Code: number = parseInt((Math.random() * 9 + 0).toString() + "00" + (Math.random() * 9 + 0).toString());
    index: number = parseInt((Math.random() * 66 + 0).toString());
    See: string = `${720 * parseInt(this.index / 10 + "")}*${620 * (parseInt(this.index / 10 + "") + 1)}`;
    // TODO 生产线随机
    CompanyType() {
      let companyType: string[] = ["局级", "处级", "科级", "董事长", "产品经理"];
      let companyTypeIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return companyType[companyTypeIndex];
    }

    // TODO
    City() {
      let province: string[] = [
        "山东",
        "山西",
        "河南",
        "河北",
        "陕西",
        "内蒙古",
        "上海市",
        "北京市",
        "重庆市",
        "天津市",
        "福建",
        "广东",
        "广西",
        "云南",
        "浙江",
        "贵州",
        "新疆",
        "西藏",
        "江西",
        "湖南",
        "湖北",
        "黑龙江",
        "吉林",
        "辽宁",
        "江苏",
        "甘肃",
        "青海",
        "四川",
        "安徽",
        "宁夏",
        "海南",
        "香港",
        "澳门",
        "台湾",
      ];
      let provinceIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return province[provinceIndex];
    }

    // TODO 生成身份证
    getId_no() {
      var coefficientArray = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"]; // 加权因子
      var lastNumberArray = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; // 校验码
      var address = "420101"; // 住址
      var birthday = "19810101"; // 生日
      var s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
      var array = (address + birthday + s).split("");
      var total = 0;
      for (let i in array) {
        total = total + parseInt(array[i]) * parseInt(coefficientArray[i]);
      }
      var lastNumber = lastNumberArray[parseInt((total % 11).toString())];
      var id_no_String: string = (address + birthday + s + lastNumber).toString();
      return id_no_String;
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
  let Company = new RandomItemMakeLine();
  let randonNum_last = Company.num.split("-");
  let statement = `INSERT INTO graduation.factory (CreateTime, StructureArea, factoryName, factoryAdress, factoryPhone, PostalCode, Codeempty) VALUES ('${Company.time}','${Company.index * 20}m²','${Company.City()}','${Company.PrinterMake()}', '153${Company.index}062${
    Company.index
  }6', '${Company.getId_no()}','${Company.Code}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      const data = {
        code: -1,
        message: "失败",
        data: error,
      };
      response.send(data);
      console.log("POST /api/equipment/factory---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: result,
      };
      response.send(data);
      console.log("POST /api/equipment/factory---成功");
    }
  });
});

// TODO 获取工厂数据
Router.get("/factory", (request: any, response: any) => {
  let query: any = request.query;
  let statement1 = `SELECT * FROM graduation.factory g  join (select count(*) as countNum from graduation.factory) f limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `SELECT * FROM graduation.factory g  join (select count(*) as countNum from graduation.factory) f limit ${query.index - 1},${query.pageSize};`;
  }

  let statement2 = `select * from graduation.factory `;
  if (query.index) {
    MySQL.query(statement1, (error: any, result: any) => {
      if (error) {
        const data = {
          code: -1,
          message: "失败",
          data: error,
        };
        response.send(data);
        console.log("GET /api/equipment/factory---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          countPage: result[0].countNum,
        };
        response.send(data);
        console.log("GET /api/equipment/factory---成功");
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
        console.log("GET /api/equipment/factory---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
        };
        response.send(data);
        console.log("GET /api/equipment/factory---成功");
      }
    });
  }
});

// TODO 搜索  --- 工厂名
Router.post("/factorySearch", (request: any, response: any, next: any) => {
  let data = request.body;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 分页
  let statement1 = `select * from graduation.factory where factoryName like '%${data.keyword}%' limit ${data.index},${data.pageSize};`;
  if (data.index === "1" || data.index === 1) {
    statement1 = `select * from graduation.factory where factoryName like '%${data.keyword}%' limit ${data.index - 1},${data.pageSize};`;
  }
  // 多少条
  let statement2 = `select count(*) as CountNum from graduation.factory where factoryName like'%${data.keyword}%';`;

  MySQL.query(statement1, (error1: any, result: any) => {
    MySQL.query(statement2, (error2: any, CountNum: any) => {
      if (error1 || error2) {
        console.log("POST /api/equipment/factorySearch---错误");
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
          console.log("POST /api/equipment/factorySearch---成功");
        } else {
          let data = {
            code: 200,
            message: "请求数据成功",
            data: result,
            countPage: 0,
          };
          response.send(data);
          console.log("POST /api/equipment/factorySearch---成功");
        }
      }
    });
  });
});

// TODO 删除
Router.post("/Deletefactory", (request: any, response: any) => {
  let query = request.body;
  let statement = `DELETE FROM  graduation.factory WHERE (id = '${query.id}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      let data: object = {
        code: -1,
        message: "修改失败",
        data: [],
      };
      console.log("POST /api/equipment/DeletefactorySearch---失败");
      response.send(data);
    } else {
      let data: object = {
        code: 200,
        message: "删除成功",
        data: [],
      };
      console.log("POST /api/equipment/DeletefactorySearch---成功");
      response.send(data);
    }
  });
});

// TODO 添加指定内容
Router.post("/factoryAddItem", (request: any, response: any, next: any) => {
  let data: any = request.body;
  let startkey = "";
  let startvalue = "";

  for (let i in request.body) {
    startkey += i + ",";
    startvalue += `'${request.body[i]}',`;
  }
  startkey = startkey.slice(0, startkey.lastIndexOf(","));
  startvalue = startvalue.slice(0, startvalue.lastIndexOf(","));

  let statement = `INSERT INTO graduation.factory ( ${startkey}) VALUES (${startvalue});`;
  MySQL.query(statement, (Error: any, result: any) => {
    if (Error) {
      const data = {
        code: -1,
        message: "失败",
        data: Error,
      };
      response.send(data);
      console.log("POST /api/equipment/factoryAddItem---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: { msg: "添加数据成功" },
      };
      response.send(data);
      console.log("POST /api/equipment/factoryAddItem---成功");
    }
  });
});

//-------------------------------------------/////----------------------------------------------------

// TODO 插入工厂 随机 添加数据
Router.post("/Workshop", (request: any, response: any) => {
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
  class RandomItemMakeLine {
    num = uuid.v4();
    time = `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`;
    Code: number = parseInt((Math.random() * 9 + 0).toString() + "00" + (Math.random() * 9 + 0).toString());
    index: number = parseInt((Math.random() * 66 + 0).toString());
    See: string = `${720 * parseInt(this.index / 10 + "")}*${620 * (parseInt(this.index / 10 + "") + 1)}`;

    // TODO 生产线随机
    CompanyType() {
      let companyType: string[] = ["局级", "处级", "科级", "董事长", "产品经理"];
      let companyTypeIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return companyType[companyTypeIndex];
    }

    // TODO 姓名
    gender() {
      let genderType: string[] = ["男", "女", "变态"];
      let genderIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return genderType[genderIndex];
    }
    // TODO 生产线随机
    WorkSpace() {
      var WorkSpace: string[] = ["金龙鱼生产线", "鱿鱼丝生产线", "金枪鱼生产线", "马哈鱼生产线"];
      var WorkSpaceIndex: number = parseInt((Math.random() * WorkSpace.length + 0).toString());
      return WorkSpace[WorkSpaceIndex];
    }
    // TODO
    City() {
      let province: string[] = [
        "山东",
        "山西",
        "河南",
        "河北",
        "陕西",
        "内蒙古",
        "上海市",
        "北京市",
        "重庆市",
        "天津市",
        "福建",
        "广东",
        "广西",
        "云南",
        "浙江",
        "贵州",
        "新疆",
        "西藏",
        "江西",
        "湖南",
        "湖北",
        "黑龙江",
        "吉林",
        "辽宁",
        "江苏",
        "甘肃",
        "青海",
        "四川",
        "安徽",
        "宁夏",
        "海南",
        "香港",
        "澳门",
        "台湾",
      ];
      let provinceIndex: number = parseInt((Math.random() * 4 + 0).toString());
      return province[provinceIndex];
    }

    // TODO 生成身份证
    getId_no() {
      var coefficientArray = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"]; // 加权因子
      var lastNumberArray = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; // 校验码
      var address = "420101"; // 住址
      var birthday = "19810101"; // 生日
      var s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
      var array = (address + birthday + s).split("");
      var total = 0;
      for (let i in array) {
        total = total + parseInt(array[i]) * parseInt(coefficientArray[i]);
      }
      var lastNumber = lastNumberArray[parseInt((total % 11).toString())];
      var id_no_String: string = (address + birthday + s + lastNumber).toString();
      return id_no_String;
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
  let Company = new RandomItemMakeLine();
  let randonNum_last = Company.num.split("-");
  let statement = `INSERT INTO graduation.staff (LocalNumber, LocalName, factoryMainName, factoryDtail, workstationName, workstationNumber, Codeempty, workName,jobTime,age,gender,PersonLeave,email,idCare,StaffAddress) VALUES ('ws-${
    randonNum_last[randonNum_last.length - 1]
  }', '${Company.WorkSpace()}', '${Company.getName()}', '${Company.City()} ${Company.company()} ${Company.WorkSpace()}', '${Company.index}号工站', '${Company.getId_no()}', '${Company.index}', '${Company.CompanyType()}','${Company.time}','${
    obj.age
  }','${Company.gender()}','${Company.company()}','${obj.email}',${obj.id},'${obj.addr}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      const data = {
        code: -1,
        message: "失败",
        data: error,
      };
      response.send(data);
      console.log("POST /api/equipment/Workshop---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: result,
      };
      response.send(data);
      console.log("POST /api/equipment/Workshop---成功");
    }
  });
});

// TODO 获取车间数据
Router.get("/Workshop", (request: any, response: any) => {
  let query: any = request.query;

  let statement1 = `SELECT * FROM graduation.staff s join (SELECT factoryName,factoryAdress,factoryPhone,PostalCode,Codeempty as CodeFind FROM graduation.factory) f on f.CodeFind=s.Codeempty limit ${query.index},${query.pageSize};`;
  let statement2 = `SELECT * FROM graduation.staff s join (SELECT factoryName,factoryAdress,factoryPhone,PostalCode,Codeempty as CodeFind FROM graduation.factory) f on f.CodeFind=s.Codeempty ;`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `SELECT * FROM graduation.staff s join (SELECT factoryName,factoryAdress,factoryPhone,PostalCode,Codeempty as CodeFind FROM graduation.factory) f on f.CodeFind=s.Codeempty limit ${query.index - 1},${query.pageSize};`;
  }

  let countNum = `SELECT count(*) as countNum FROM graduation.staff s join (SELECT factoryName,factoryAdress,factoryPhone,PostalCode,Codeempty as CodeFind FROM graduation.factory) f on f.CodeFind=s.Codeempty;`;
  if (query.index) {
    MySQL.query(statement1, (error1: any, result: any) => {
      MySQL.query(countNum, (error2: any, countNum: any) => {
        if (error1 || error2) {
          const data = {
            code: -1,
            message: "失败",
            data: [error1, error2],
          };
          response.send(data);
          console.log("GET /api/equipment/Workshop---错误");
        } else {
          const data = {
            code: 200,
            message: "获取成功",
            data: result,
            countPage: countNum[0].countNum,
          };
          response.send(data);
          console.log("GET /api/equipment/Workshop---成功");
        }
      });
    });
  } else {
    MySQL.query(statement2, (error1: any, result: any) => {
      MySQL.query(countNum, (error2: any, countNum: any) => {
        if (error1 || error2) {
          const data = {
            code: -1,
            message: "失败",
            data: [error1, error2],
          };
          response.send(data);
          console.log("GET /api/equipment/Workshop---错误");
        } else {
          const data = {
            code: 200,
            message: "获取成功",
            data: result,
            countPage: countNum[0].countNum,
          };
          response.send(data);
          console.log("GET /api/equipment/Workshop---成功");
        }
      });
    });
  }
});

// TODO 获取员工数据
Router.get("/staff", (request: any, response: any) => {
  let query: any = request.query;

  let statement1 = `SELECT *,c.CountNum FROM graduation.staff join (SELECT count(*) as CountNum FROM graduation.staff) c limit ${query.index},${query.pageSize};`;
  if (query.index === "1" || query.index === 1) {
    statement1 = `SELECT *,c.CountNum FROM graduation.staff join (SELECT count(*) as CountNum FROM graduation.staff) c limit ${query.index - 1},${query.pageSize};`;
  }

  let statement2 = `SELECT *,c.CountNum FROM graduation.staff join (SELECT count(*) as CountNum FROM graduation.staff) c;`;
  if (query.index) {
    MySQL.query(statement1, (error1: any, result: any) => {
      if (error1) {
        const data = {
          code: -1,
          message: "失败",
          data: [error1],
        };
        response.send(data);
        console.log("GET /api/equipment/staff---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          countPage: result[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/staff---成功");
      }
    });
  } else {
    MySQL.query(statement2, (error1: any, result: any) => {
      if (error1) {
        const data = {
          code: -1,
          message: "失败",
          data: [error1],
        };
        response.send(data);
        console.log("GET /api/equipment/staff---错误");
      } else {
        const data = {
          code: 200,
          message: "获取成功",
          data: result,
          countPage: result[0].CountNum,
        };
        response.send(data);
        console.log("GET /api/equipment/staff---成功");
      }
    });
  }
});

module.exports = Router;
