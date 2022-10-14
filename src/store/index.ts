import { createStore } from "vuex";
import MenuBar from "@/store/modules/MenuBar";
import EquipmentManagement from "./modules/EquipmentManagement";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { MenuBar, EquipmentManagement },
});
