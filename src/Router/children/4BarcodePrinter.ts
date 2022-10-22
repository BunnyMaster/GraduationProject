var MySQL = require("../../MySQL");
var Router = require("express").Router();
var dayjs = require("dayjs");
var uuid = require("uuid");

// TODO 随机 添加数据
Router.post("/BarcodePrinter", (request: any, response: any) => {
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

  let body: object = request.body;
  let PrinterScale = new RandomItemMakeLine();
  let randonNum_last = PrinterScale.num.split("-");
  let statement = `INSERT INTO graduation.barcodeprinter 
 ( BarCodeEquipment, specificationOfEquipment, DeviceType, purchasingPeriod, workStation, SubordinateStation, PrintMode, ResolutionRatio, PrincipalOfAssets, DepartmentOfOwnership, manufacturing, USEfor)
 VALUES 
 ( 'codeprinter-${randonNum_last[randonNum_last.length - 1]}', '条码打印机', '${PrinterScale.PrinterType()}', '${PrinterScale.time}', '${PrinterScale.index}号工作站', '${PrinterScale.WorkSpace()}', '${PrinterScale.Printertotype()}', '${
    PrinterScale.See
  }', '${PrinterScale.getName()}', '${PrinterScale.company()}', '${PrinterScale.PrinterMake()}', '${PrinterScale.PrinterUse()}');`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      const data = {
        code: -1,
        message: "失败",
        data: error,
      };
      response.send(data);
      console.log("POST /api/equipment/BarcodePrinter---错误");
    } else {
      const data = {
        code: 200,
        message: "添加数据成功",
        data: result,
      };
      response.send(data);
      console.log("POST /api/equipment/BarcodePrinter---成功");
    }
  });
});

// TODO 获取数据
Router.get("/BarcodePrinter", (request: any, response: any) => {
  let query: any = request.query;
  let statement = `select e.*,t.countNum from graduation.electronicscale e join (select count(*) as countNum from graduation.electronicscale) t limit ${query.index},${query.pageSize};`;
  MySQL.query(statement, (error: any, result: any) => {
    if (error) {
      const data = {
        code: -1,
        message: "失败",
        data: error,
      };
      response.send(data);
      console.log("GET /api/equipment/BarcodePrinter---错误");
    } else {
      const data = {
        code: 200,
        message: "获取成功",
        data: result,
      };
      response.send(data);
      console.log("GET /api/equipment/BarcodePrinter---成功");
    }
  });
});
module.exports = Router;
