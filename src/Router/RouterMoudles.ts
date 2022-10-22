const AndroidPAD = require("./children/2AndroidPAD"); // TODO 引入AndroidPAD---安卓PAD文件
var Login = require("./children/1login");
var ElectronicScale = require("./children/3ElectronicScale");
var BarcodePrinter = require("./children/4BarcodePrinter");
var InfraredCounterGun = require("./children/5InfraredCounterGun");
var Company = require("./children/6 Company");
var RepairBill = require("./children/7 RepairBill");
// TODO  将每个文件放在列表中，并导出列表
const routerList = [AndroidPAD, Login, ElectronicScale, BarcodePrinter, InfraredCounterGun, Company, RepairBill];

module.exports = routerList;
