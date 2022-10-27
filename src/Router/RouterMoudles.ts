const AndroidPAD = require("./children/2AndroidPAD"); // TODO 引入AndroidPAD---安卓PAD文件
var Login = require("./children/1login");
var ElectronicScale = require("./children/3ElectronicScale");
var BarcodePrinter = require("./children/4BarcodePrinter");
var InfraredCounterGun = require("./children/5InfraredCounterGun");
var Company = require("./children/6 Company");
var RepairBill = require("./children/7 RepairBill");
var MountGuardRecords = require("./children/8 MountGuardRecords");
var ProcessMaintenance_ProcessFlowMaintenance = require("./children/9 ProcessMaintenance&ProcessFlowMaintenance");
var PerformanceAndConfig = require("./children/10 performance");
var TodoList = require("./children/11 TodoList");
// TODO  将每个文件放在列表中，并导出列表
const routerList = [AndroidPAD, Login, ElectronicScale, BarcodePrinter, InfraredCounterGun, Company, RepairBill, MountGuardRecords, ProcessMaintenance_ProcessFlowMaintenance, PerformanceAndConfig, TodoList];

module.exports = routerList;
