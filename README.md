# mes-systems

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
## 怎么打包?
- 在vue,config.js中添加以下
~~~JavaScript
 publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  indexPath: "index.html",
~~~
- 在路由组件中添加以下
~~~JavaScript
  history: createWebHistory(process.env.BASE_URL), //默认---开发时
  // history: createWebHashHistory(process.env.BASE_URL), //修改后---上线时
~~~

# 提交表单

| 编号 | 意义       |
| ---- | ---------- |
| ""   | null       |
| 001  | 安卓PAD    |
| 002  | 红外对射枪 |
| 003  | 条码打印机 |
| 004  | 读卡器     |
| 005  | 电子秤     |

# 数据库名

## AndroidPAD

- 安卓PAD

### 一览表

| 列表名称                 | 表示含义         | 数据类型     | 字段     | 单位          |
| ------------------------ | ---------------- | ------------ | -------- | ------------- |
| id                       | 编号，主键，唯一 | INT          | NN/PK/AI |               |
| BarCodeEquipment         | 条形码编号       | VARCHAR(45)  | NN/PK    |               |
| DeviceType               | 设备类型         | VARCHAR(45)  | NN       |               |
| specificationOfEquipment | 设备规格         | VARCHAR(45)  | NN       |               |
| purchasingPeriod         | 采购时间         | DATETIME(45) | NN       | 时间          |
| workStation              | 所属工站         | VARCHAR(45)  | NN       |               |
| SubordinateStation       | 所属工位         | VARCHAR(45)  | NN       |               |
| resolutionRatio          | 分辨率           | VARCHAR(45)  | NN       | 1920*1080     |
| coreNumber               | 核心数           | INT          | NN       | 2<sup>n</sup> |
| memory                   | 内存             | INT          | NN       | 2<sup>n</sup> |
| batteryCapacity          | 电池容量         | INT          | NN       | 1w以上        |
| supplier                 | 供应商           | VARCHAR(45)  | NN       |               |
| manufacturer             | 生产商           | VARCHAR(45)  | NN       |               |
| PrincipalOfAssets        | 资产负责人       | VARCHAR(45)  | NN       |               |
| DepartmentOfOwnership    | 所有权部门       | VARCHAR(45)  | NN       |               |

### 实例

~~~JSOn
{
    "id": 0,
    "BarCodeEquipment": "48954654678",
    "specificationOfEquipment": "军工防水级",
    "purchasingPeriod": "2022-10-17 10:10:10",
    "workStation": "Office",
    "SubordinateStation": "2号位",
    "Name":"鱿鱼称"
    "resolutionRatio": "1920*1080",
    "coreNumber": 4,
    "memory": 128,
    "batteryCapacity": 12000,
    "supplier": "华为",
    "manufacturer": "华强北",
    "PrincipalOfAssets": "球球",
    "DepartmentOfOwnership": "市场采购" 
}
~~~

### TableList

```js
const tableList = [
    "设备条码",
    "设备规格",
    "采购时间",
    "所属工站",
    "所属工位",
    "分辨率",
    "分辨率",
    "核心数",
    "内存",
    "电池容量",
    "供应商",
    "生产商",
    "用途",
    "资产负责人",
    "所有权部门",
];
```

## ElectronicScale

- 电子秤

### 一览表

| 列表名称                 | 表示含义         | 数据类型     | 字段     | 单位            |
| ------------------------ | ---------------- | ------------ | -------- | --------------- |
| id                       | 编号，主键，唯一 | INT          | NN/PK/AI |                 |
| BarCodeEquipment         | 设备条码         | VARCHAR(45)  | NN/PK    |                 |
| DeviceType               | 设备类型         | VARCHAR(45)  | NN       |                 |
| specificationOfEquipment | 设备规格         | VARCHAR(45)  | NN       |                 |
| purchasingPeriod         | 采购时间         | DATETIME(45) | NN       | 时间            |
| workStation              | 所属工站         | VARCHAR(45)  | NN       |                 |
| SubordinateStation       | 所属工位         | VARCHAR(45)  | NN       |                 |
| Name                     | 分辨率           | VARCHAR(45)  | NN       | '鱿鱼称'        |
| WeighingScale            | 称量范围         | VARCHAR(45)  | NN       | '5~10'          |
| weight                   | 内存             | INT          | NN       | '5'             |
| supplier                 | 供应商           | VARCHAR(45)  | NN       | '凯丰'          |
| manufacturer             | 生产商           | VARCHAR(45)  | NN       | '赛多利斯'      |
| USE                      | 用途             | VARCHAR(45)  | NN       | '物产'          |
| manufacturing            | 出厂编号         | VARCHAR(45)  | NN       | 'MYY5155-11212' |
| PrincipalOfAssets        | 资产负责人       | VARCHAR(45)  | NN       | '球球'          |
| DepartmentOfOwnership    | 所有权部门       | VARCHAR(45)  | NN       | '市场采购'      |

### 实例

~~~json
{
    "id": 0,
    "BarCodeEquipment": "48954654678",
    "specificationOfEquipment": "军工防水级",
    "purchasingPeriod": "2022-10-17 10:10:10",
    "workStation": "Office",
    "SubordinateStation": "2号位",
    "Name":"鱿鱼称"
    "WeighingScale": "5~10",
    "weight": 4,
    "memory": 128,
    "supplier": "凯丰",   
    "manufacturer": "赛多利斯",
    "PrincipalOfAssets": "球球",
    "DepartmentOfOwnership": "市场采购",
    "manufacturing":"MYY5155-11212",
    "USE":"物产"
}
~~~

#### 供应商

~~~js
[凯丰,蓉城,至尊,今选,香山,长协电子,睿智,大红鹰,乐祺,英衡]
~~~

#### 生产商

~~~js
[ "赛多利斯", "梅特勒-托利多", "寺冈DIGI", "凯士CAS", "西特SETRA", "DIGI寺冈", "霸王台秤", "EXCELL英展" ]
~~~

### 创建数据库

~~~MySQL
 CREATE TABLE `graduation`.`folderopened` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `BarCodeEquipment` VARCHAR(45) NOT NULL DEFAULT '13456789',
     `specificationOfEquipment` VARCHAR(45) NOT NULL DEFAULT '军工防水级',
     `DeviceType` VARCHAR(45) NOT NULL DEFAULT '安卓PAD',
     `purchasingPeriod` DATE NOT NULL DEFAULT '2022-10-17 10:10:10',
     `workStation` VARCHAR(45) NOT NULL DEFAULT '鱿鱼工作站',
     `SubordinateStation` VARCHAR(45) NOT NULL DEFAULT '2号位',
     `Name` VARCHAR(45) NOT NULL DEFAULT '鱿鱼称',
     `WeighingScale` VARCHAR(45) NOT NULL DEFAULT '5~10',
     `weight` INT NOT NULL DEFAULT 5,
     `supplier` VARCHAR(45) NOT NULL DEFAULT '凯丰',
     `manufacturer` VARCHAR(45) NOT NULL DEFAULT '赛多利斯',
     `PrincipalOfAssets` VARCHAR(45) NOT NULL DEFAULT '球球',
     `DepartmentOfOwnership` VARCHAR(45) NOT NULL DEFAULT '市场采购',
     `manufacturing` VARCHAR(45) NOT NULL DEFAULT 'MYY5155-11212',
     `USE` VARCHAR(45) NOT NULL DEFAULT '物产',   
     PRIMARY KEY (`id`))
~~~

### TableList

~~~js
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "名称", "称量范围", "重量", "供应商", "生产商", "出厂编号", "用途", "资产负责人", "所有权部门"];
~~~

## BarcodePrinter

- 需要改成读卡器

- 条码打印机

### 一览表

| 列表名称                 | 表示含义         | 数据类型     | 字段     | 单位            |
| ------------------------ | ---------------- | ------------ | -------- | --------------- |
| id                       | 编号，主键，唯一 | INT          | NN/PK/AI |                 |
| BarCodeEquipment         | 设备条码         | VARCHAR(45)  | NN/PK    |                 |
| DeviceType               | 设备类型         | VARCHAR(45)  | NN       |                 |
| specificationOfEquipment | 设备规格         | VARCHAR(45)  | NN       |                 |
| purchasingPeriod         | 采购时间         | DATETIME(45) | NN       | 时间            |
| workStation              | 所属工站         | VARCHAR(45)  | NN       |                 |
| SubordinateStation       | 所属工位         | VARCHAR(45)  | NN       |                 |
| PrintMode                | 打印模式         | VARCHAR(45)  | NN       | 条形码          |
| ResolutionRatio          | 分辨率           | VARCHAR(45)  | NN       | 1920*1080       |
| USE                      | 用途             | VARCHAR(45)  | NN       | '物产'          |
| manufacturing            | 出厂编号         | VARCHAR(45)  | NN       | 'MYY5155-11212' |
| PrincipalOfAssets        | 资产负责人       | VARCHAR(45)  | NN       | '球球'          |
| DepartmentOfOwnership    | 所有权部门       | VARCHAR(45)  | NN       | '市场采购'      |

### 创建数据库

~~~mysql
 CREATE TABLE `graduation`.`barcodeprinter` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `BarCodeEquipment` VARCHAR(45) NOT NULL DEFAULT '13456789',
     `specificationOfEquipment` VARCHAR(45) NOT NULL DEFAULT '军工防水级',
     `DeviceType` VARCHAR(45) NOT NULL DEFAULT '条码打印机',
     `purchasingPeriod` DATE NOT NULL DEFAULT '2022-10-17 10:10:10',
     `workStation` VARCHAR(45) NOT NULL DEFAULT '鱿鱼工作站',
     `SubordinateStation` VARCHAR(45) NOT NULL DEFAULT '2号位',
     `PrintMode` VARCHAR(45) NOT NULL DEFAULT '条形码',
     `ResolutionRatio` VARCHAR(45) NOT NULL DEFAULT '1920*1080',
     `PrincipalOfAssets` VARCHAR(45) NOT NULL DEFAULT '球球',
     `DepartmentOfOwnership` VARCHAR(45) NOT NULL DEFAULT '市场采购',
     `manufacturing` VARCHAR(45) NOT NULL DEFAULT 'MYY5155-11212',
     `USE` VARCHAR(45) NOT NULL DEFAULT '物产',
     PRIMARY KEY (`id`));
~~~

### TbaleList

~~~js
const tableList = ["设备条码", "设备类型", "设备规格", "采购时间", "创建时间", "所属工站", "所属工位", "所有权部门", "称量范围", "供应商", "生产商", "资产负责人"];
~~~

## InfraredCounterGun

- 红外对射枪

### 一览表

| 列表名称                 | 表示含义         | 数据类型     | 字段     | 单位            |
| ------------------------ | ---------------- | ------------ | -------- | --------------- |
| id                       | 编号，主键，唯一 | INT          | NN/PK/AI |                 |
| BarCodeEquipment         | 条形码编号       | VARCHAR(45)  | NN/PK    |                 |
| specificationOfEquipment | 设备规格         | VARCHAR(45)  | NN       |                 |
| purchasingPeriod         | 采购时间         | DATETIME(45) | NN       | 时间            |
| workStation              | 所属工站         | VARCHAR(45)  | NN       |                 |
| SubordinateStation       | 所属工位         | VARCHAR(45)  | NN       |                 |
| SensingDistance          | 感应距离         | INT          | NN       | '5'             |
| LnductiveApproach        | 感应方式         | VARCHAR(45)  | NN       | MHz             |
| USE                      | 用途             | VARCHAR(45)  | NN       | '物产'          |
| manufacturing            | 出厂编号         | VARCHAR(45)  | NN       | 'MYY5155-11212' |
| PrincipalOfAssets        | 资产负责人       | VARCHAR(45)  | NN       | '球球'          |
| DepartmentOfOwnership    | 所有权部门       | VARCHAR(45)  | NN       | '市场采购'      |

### 创建数据库

~~~mysql
 CREATE TABLE `graduation`.`InfraredCounterGun` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `BarCodeEquipment` VARCHAR(45) NOT NULL DEFAULT '13456789',
     `specificationOfEquipment` VARCHAR(45) NOT NULL DEFAULT '军工防水级',
     `DeviceType` VARCHAR(45) NOT NULL DEFAULT '红外对射枪',
     `purchasingPeriod` DATE NOT NULL DEFAULT '2022-10-17 10:10:10',
     `workStation` VARCHAR(45) NOT NULL DEFAULT '鱿鱼工作站',
     `SubordinateStation` VARCHAR(45) NOT NULL DEFAULT '2号位',
     `SensingDistance` INT NOT NULL DEFAULT 5,
     `LnductiveApproach` VARCHAR(45) NOT NULL DEFAULT "MHz",
     `manufacturer` VARCHAR(45) NOT NULL DEFAULT '赛多利斯',
     `PrincipalOfAssets` VARCHAR(45) NOT NULL DEFAULT '球球',
     `DepartmentOfOwnership` VARCHAR(45) NOT NULL DEFAULT '市场采购',
     PRIMARY KEY (`id`))
~~~

### TableList

~~~js
const tableList = ["设备条码", "设备类型", "设备规格", "所属工站", "所属工位", "感应距离", "感应方式", "采购时间", "出厂编号", "用途", "所有权部门", "资产负责人"];
~~~

## CardReader

- 这是条码打印机还没编写

- 条码打印机

### 一览表

| 列表名称                 | 表示含义         | 数据类型     | 字段     | 单位            |
| ------------------------ | ---------------- | ------------ | -------- | --------------- |
| id                       | 编号，主键，唯一 | INT          | NN/PK/AI |                 |
| BarCodeEquipment         | 设备条码         | VARCHAR(45)  | NN/PK    |                 |
| DeviceType               | 设备类型         | VARCHAR(45)  | NN       |                 |
| specificationOfEquipment | 设备规格         | VARCHAR(45)  | NN       |                 |
| purchasingPeriod         | 采购时间         | DATETIME(45) | NN       | 时间            |
| workStation              | 所属工站         | VARCHAR(45)  | NN       |                 |
| SubordinateStation       | 所属工位         | VARCHAR(45)  | NN       |                 |
| ReadTheCardSpeed         | 读卡速度         | VARCHAR(45)  | NN       | '鱿鱼称'        |
| ClockInterval            | 打卡间隔         | VARCHAR(45)  | NN       | '5~10'          |
| SensingDistance          | 感应距离         | INT          | NN       | '5'             |
| CardFrequency            | 读卡频率         | VARCHAR(45)  | NN       | MHz             |
| supplier                 | 供应商           | VARCHAR(45)  | NN       | '凯丰'          |
| manufacturer             | 生产商           | VARCHAR(45)  | NN       | '赛多利斯'      |
| USE                      | 用途             | VARCHAR(45)  | NN       | '物产'          |
| manufacturing            | 出厂编号         | VARCHAR(45)  | NN       | 'MYY5155-11212' |
| PrincipalOfAssets        | 资产负责人       | VARCHAR(45)  | NN       | '球球'          |
| DepartmentOfOwnership    | 所有权部门       | VARCHAR(45)  | NN       | '市场采购'      |

### 创建数据库

~~~mysql
 CREATE TABLE `graduation`.`barcodeprinter` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `BarCodeEquipment` VARCHAR(45) NOT NULL DEFAULT '13456789',
     `specificationOfEquipment` VARCHAR(45) NOT NULL DEFAULT '军工防水级',
     `DeviceType` VARCHAR(45) NOT NULL DEFAULT '条码打印机',
     `purchasingPeriod` DATE NOT NULL DEFAULT '2022-10-17 10:10:10',
     `workStation` VARCHAR(45) NOT NULL DEFAULT '鱿鱼工作站',
     `SubordinateStation` VARCHAR(45) NOT NULL DEFAULT '2号位',
     `ReadTheCardSpeed` VARCHAR(45) NOT NULL DEFAULT '1MHz/s',
     `ClockInterval` VARCHAR(45) NOT NULL DEFAULT '1~2',
     `SensingDistance` INT NOT NULL DEFAULT 5,
     `CardFrequency` VARCHAR(45) NOT NULL DEFAULT "MHz",
     `supplier` VARCHAR(45) NOT NULL DEFAULT '凯丰',
     `manufacturer` VARCHAR(45) NOT NULL DEFAULT '赛多利斯',
     `PrincipalOfAssets` VARCHAR(45) NOT NULL DEFAULT '球球',
     `DepartmentOfOwnership` VARCHAR(45) NOT NULL DEFAULT '市场采购',
     `manufacturing` VARCHAR(45) NOT NULL DEFAULT 'MYY5155-11212',
     `USE` VARCHAR(45) NOT NULL DEFAULT '物产',
     PRIMARY KEY (`id`))
~~~

### TbaleList

~~~js
const tableList = ["设备条码", "设备类型", "设备规格", "采购时间", "创建时间", "所属工站", "所属工位", "所有权部门", "称量范围", "供应商", "生产商", "资产负责人"];
~~~

## 维修订单

### 创建数据库

~~~sql
CREATE TABLE `graduation`.`repairbill` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '\n\n\n\n\n',
  `Time` VARCHAR(45) NULL,
  `Name` VARCHAR(45) NULL,
  `State` VARCHAR(45) NULL,
  `City` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NULL,
  `DeviceName` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

~~~

## 企业

### 创建数据库

~~~sql
CREATE TABLE `graduation`.`enterprise` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `EnterpriseLeave` VARCHAR(45) NULL COMMENT '单位层次',
    `CompanyName` VARCHAR(45) NULL COMMENT '单位名称',
    `CompanyRegisteredCapital` VARCHAR(45) NULL COMMENT '企业注册资本',
    `Corp` VARCHAR(45) NULL COMMENT '法人',
    `CorpIdentityCard` VARCHAR(45) NULL COMMENT '法人身份证',
    `CompanyAddress` VARCHAR(45) NULL COMMENT '企业地址',
    `PostalCode` VARCHAR(45) NULL COMMENT '邮政编码',
    PRIMARY KEY (`id`));
~~~

### 插入基本数据

~~~sql
~~~

## 工厂

~~~sql
CREATE TABLE `graduation`.`factory` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `CreateTime` VARCHAR(45) NULL COMMENT '创建时间',
    `StructureArea` VARCHAR(45) NULL COMMENT '建筑面积',
    `factoryName` VARCHAR(45) NULL COMMENT '工厂名称',
    `InCompany` VARCHAR(45) NULL COMMENT '所属企业\n',
    `factoryAdress` VARCHAR(45) NULL,
    `factoryPhoone` VARCHAR(45) NULL,
    `factorycol` VARCHAR(45) NULL,
    `PostalCode` VARCHAR(45) NULL,
    `Codeempty` VARCHAR(45) NULL,
    PRIMARY KEY (`id`));
~~~

## 设备台账

### 创建数据库

~~~sql
CREATE TABLE `graduation`.`equipmentledger` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `EquipmentLedgerNum` VARCHAR(45) NULL COMMENT '设备编号',
    `EquipmentType` VARCHAR(45) NULL COMMENT '设备类型',
    `EquipmentEPEC` VARCHAR(45) NULL COMMENT '设备规格',
    `EquipmentLedgercol` VARCHAR(45) NULL,
    `Provider` VARCHAR(45) NULL,
    `SubPerson` VARCHAR(45) NULL COMMENT '上报人\n',
    `ToUse` VARCHAR(45) NULL COMMENT '用途\n',
    `ImportanTime` VARCHAR(45) NULL,
    `principal` VARCHAR(45) NULL COMMENT '负责人',
    PRIMARY KEY (`id`));
~~~

