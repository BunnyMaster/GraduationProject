import { createStore } from "vuex";
import MenuBar from "@/store/modules/MenuBar";
import EquipmentManagement from "./modules/EquipmentManagement";
import AndroidPAD from "./APIFile/AndroidPAD";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { MenuBar, EquipmentManagement, AndroidPAD },
});
