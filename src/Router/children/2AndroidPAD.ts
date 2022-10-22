var dayjs = require("dayjs");
var Router = require("express").Router();
var MYSQL = require("../../MySQL");
var uuid = require("uuid");
var AndroidPADapp = require("express")();
var num = uuid.v4();

// TODO 解决跨域问题 cors
const cors = require("cors");
AndroidPADapp.use(cors);

// TODO 获取androidpad全部 访问 AndroidPAD 时发送请求,next---是中间件
Router.get("/AndroidPAD", (request: any, response: any, next: any) => {
  var data = request.query;
  // 设置请求头
  response.setHeader("Access-Control-Allow-Origin", "*");
  num = uuid.v4();

  MYSQL.query(` SELECT *,a.allPage FROM graduation.androidpad g join (select count(*) as allPage from graduation.androidpad) a  limit ${data.index},${data.count};`, (error: any, result: any) => {
    const data = {
      code: 200,
      message: "请求安卓PAD数据成功",
      data: result,
      AllPage: result[0].allPage,
    };
    response.send(data);
    if (error) {
      console.log("\n GET /api/equipment/AndroidPAD---错误");
    } else {
      console.log("\n GET /api/equipment/AndroidPAD---成功");
    }
  });
});

// TODO POST请求-随机添加
Router.post("/AndroidPAD", (request: any, response: any, next: any) => {
  class RandomItemMakeLine {
    num = uuid.v4();
    index: number = parseInt((Math.random() * 66 + 0).toString());

    // TODO 生产线随机
    WorkSpace() {
      var WorkSpace: string[] = ["金龙鱼生产线", "鱿鱼丝生产线", "金枪鱼生产线", "马哈鱼生产线"];
      var WorkSpaceIndex: number = parseInt((Math.random() * WorkSpace.length + 0).toString());
      return WorkSpace[WorkSpaceIndex];
    }

    // TODO 生产厂商随机
    Manufacturer() {
      var Manufacturer: string[] = ["华为", "小米", "苹果", "vivo", "OPPO", "塞班", "努比亚", "中兴", "其他"];
      var ManufacturerIndex: number = parseInt((Math.random() * Manufacturer.length + 0).toString());
      return Manufacturer[ManufacturerIndex];
    }

    // TODO 公司部门
    company() {
      var company: string[] = ["行政办公室", "人力资源部", "财务部", "生产技术部", "计划营销部", "安全监察部", "技术部"];
      var companyIndex: number = parseInt((Math.random() * company.length + 0).toString());
      return company[companyIndex];
    }

    // TODO 平板电脑生产商
    PadMake() {
      var PadMake: string[] = ["神舟", "研强科技公司", "北京启阳科技有限公司", "北京奇创彩晶科技发展有限公司", "华强北"];
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

  let AndroidPADMakeLine = new RandomItemMakeLine();
  num = uuid.v4();
  let statement: string =
    "  INSERT INTO graduation.androidpad (`id`, `BarCodeEquipment`, `specificationOfEquipment`, `purchasingPeriod`, `DeviceType`, `workStation`, " +
    "`SubordinateStation`, `resolutionRatio`, `coreNumber`, `memory`, `batteryCapacity`, `supplier`, `PrincipalOfAssets`, `manufacturer`," +
    " `DepartmentOfOwnership`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

  MYSQL.query(
    statement,
    [
      num,
      `AndroidPAD-${num.split("-")[num.split("-").length - 1]}`,
      "安卓PAD",
      `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
      `${(AndroidPADMakeLine.index + 1) * 32}`,
      AndroidPADMakeLine.WorkSpace(),
      `${AndroidPADMakeLine.index + 1}号位`,
      `${720 * parseInt(AndroidPADMakeLine.index / 10 + "")}*${620 * (parseInt(AndroidPADMakeLine.index / 10 + "") + 1)}`,
      `${AndroidPADMakeLine.index}`,
      `${(AndroidPADMakeLine.index + 1) * 32}`,
      `${6400 * (AndroidPADMakeLine.index + 1)}`,
      `${AndroidPADMakeLine.Manufacturer()}`,
      `${AndroidPADMakeLine.getName()}`,
      `${AndroidPADMakeLine.PadMake()}`,
      `${AndroidPADMakeLine.company()}`,
    ],
    (Error: any, result: any) => {
      const body: object = request.body;
      if (Error) {
        const data = {
          code: -1,
          message: "失败",
          data: Error,
        };
        response.send(data);
        console.log("\n GET /api/equipment/AndroidPAD---错误");
      } else {
        const data = {
          code: 200,
          message: "添加安卓PAD数据成功",
          data: { msg: "添加数据成功", countent: body },
        };
        response.send(data);
        console.log("\n GET /api/equipment/AndroidPAD---成功");
      }
    },
  );
});

// TODO 添加指定内容
Router.post("/AndroidPADAddItem", (request: any, response: any, next: any) => {
  num = uuid.v4();
  let data: any = request.query;
  let statement: string = `INSERT INTO graduation.androidpad (id,BarCodeEquipment,specificationOfEquipment,purchasingPeriod,DeviceType ,workStation,SubordinateStation,resolutionRatio,coreNumber,memory,batteryCapacity,supplier,PrincipalOfAssets,manufacturer,DepartmentOfOwnership) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  MYSQL.query(
    statement,
    [
      num,
      `AndroidPAD-${num.split("-")[num.split("-").length - 1]}`,
      `${data.specificationOfEquipment.replace(",", "")}`,
      `${data.purchasingPeriod.replace(",", "")}`,
      // `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}`,
      `${data.DeviceType.replace(",", "")}`,
      `${data.workStation.replace(",", "")}`,
      `${data.SubordinateStation.replace(",", "")}`,
      `${data.resolutionRatio.replace(",", "")}`,
      `${parseInt(data.coreNumber)}`,
      `${parseInt(data.memory)}`,
      `${parseInt(data.batteryCapacity)}`,
      `${data.supplier.replace(",", "")}`,
      `${data.PrincipalOfAssets.replace(",", "")}`,
      `${data.manufacturer.replace(",", "")}`,
      `${data.DepartmentOfOwnership.replace(",", "")}`,
    ],
    (Error: any, result: any) => {
      if (Error) {
        const data = {
          code: -1,
          message: "失败",
          data: Error,
        };
        response.send(data);
        console.log("\n POST /api/equipment/AndroidPAD---错误");
      } else {
        const data = {
          code: 200,
          message: "添加安卓PAD数据成功",
          data: { msg: "添加数据成功" },
        };
        response.send(data);
        console.log("\n POST /api/equipment/AndroidPAD---成功");
      }
    },
  );
});

// TODO 更改数据库
Router.post("/AndroidPADChangeItem", (request: any, response: any, next: any) => {
  let statement: string = `UPDATE graduation.androidpad SET "supplier" = '苹果' WHERE (id_index = '1') and (id = 'b6523d8e-e9ad-4b1c-8422-eedbcae4e666');`;
});
// TODO 泛型
/*function FUN<T>(s: T): T {
  return s;
}*/
module.exports = Router;
