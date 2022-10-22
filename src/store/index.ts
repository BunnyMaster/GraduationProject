import { createStore } from "vuex";
import MenuBar from "@/store/modules/MenuBar";
import EquipmentManagement from "./modules/EquipmentManagement";
import AndroidPAD from "./APIFile/2AndroidPAD";
import Login from "./APIFile/1Login";
import ElectronicScale from "./APIFile/3ElectronicScale";
import BarcodePrinter from "@/store/APIFile/4BarcodePrinter";
import InfraredCounterGun from "@/store/APIFile/5 InfraredCounterGun";
import Factory from "@/store/APIFile/7 Factory";
import Enterprise from "@/store/APIFile/6 Enterprise";
import Workshop from "@/store/APIFile/8 Workshop";
import Staff from "@/store/APIFile/9 Staff";
import RepairCord from "@/store/APIFile/10 RepairCord";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { MenuBar, EquipmentManagement, AndroidPAD, Login, ElectronicScale, BarcodePrinter, InfraredCounterGun, Factory, Enterprise, Workshop, Staff, RepairCord },
});
