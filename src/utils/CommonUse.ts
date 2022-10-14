import { computed, nextTick, onMounted, reactive } from "vue";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ElMessage, ElNotification } from "element-plus";
import * as XLSX from "xlsx";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export const router = useRouter();
export const route = useRoute();
export const store = useStore();
export interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
export const Data = reactive({
  MenuBarList: computed(() => store.state.MenuBar.MenuBarList),
  HomeHeaderIcon: "ChromeFilled",
  HomeHeaderTitle: "",
  PageTotalList: [100, 200, 300, 400],
  currentPage: 4,
  pageSize: 100,
  small: false,
  background: false,
  disabled: false,
  input: "",
  dialogFormVisible: false,
  FullScreenFlag: true,
});
export const Fun = reactive({
  // TODO
  formatter(row: User, column: TableColumnCtx<User>) {
    return row.address;
  },
  // TODO 过滤列表
  filterTag(value: string, row: User) {
    return row.tag === value;
  },
  // TODO
  tableRowClassName({ row, rowIndex }: { row: User; rowIndex: number }) {
    if (rowIndex === 1) {
      return "warning-row";
    } else if (rowIndex === 3) {
      return "success-row";
    }
    return "";
  },
  //  TODO 找到当前标题表示的ICON
  FindThisIcon() {
    const RouterPath: string = route.path;
    for (const menuBarListKey in Data.MenuBarList) {
      //如果存在Menu
      if (Data.MenuBarList[menuBarListKey].Menu) {
        Data.MenuBarList[menuBarListKey].Menu.forEach((item: any, index: number) => {
          if (item["Link"] === RouterPath) {
            Data.HomeHeaderIcon = Data.MenuBarList[menuBarListKey].Icon;
            Data.HomeHeaderTitle = Data.MenuBarList[menuBarListKey].title;
          }
        });
      }
      //  不存在Menu
      else if (Data.MenuBarList[menuBarListKey].MenuList) {
        Data.MenuBarList[menuBarListKey].MenuList.forEach((item: any, index: number) => {
          if (item["Link"] === RouterPath) {
            Data.HomeHeaderIcon = Data.MenuBarList[menuBarListKey].Icon;
            Data.HomeHeaderTitle = Data.MenuBarList[menuBarListKey].title;
          }
        });
      } else {
        ElMessage.closeAll();
        ElMessage({
          showClose: true,
          message: `FindThisIcon-出错了-Page-Home-Router`,
          type: "error",
          center: true,
        });
        console.log("出错了");
      }
    }
  },
  // TODO 分页器数组
  PageTotalList() {
    const TotalList: number[] = [];
    for (let i = 50; i <= 1000; i += 50) TotalList.push(i);
    Data.PageTotalList = TotalList;
  },
  // TODO 分页器数据修改
  handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  },
  //  TODO 当分页器-page-点击时
  handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  },
  // TODO 导出数据表
  ExportXlsx() {
    const Table = document.querySelector(".el-table");
    const web = XLSX.utils.table_to_book(Table);
    if (route.meta.title) {
      XLSX.writeFile(web, `${route.meta.title}.xls`);
      ElNotification({
        title: "Success",
        message: `${route.meta.title}数据表正在下载......`,
        type: "success",
        showClose: true,
        position: "top-left",
      });
    } else {
      XLSX.writeFile(web, "产品数据表.xls");
      ElNotification({
        title: "Warning",
        message: "产品数据表表正在下载......",
        type: "success",
        showClose: true,
        position: "top-left",
      });
    }
  },
  //  TODO 添加数据
  AddItem(flag: boolean) {
    Data.dialogFormVisible = !Data.dialogFormVisible;
    if (Data.dialogFormVisible) {
      ElMessage.closeAll();
      ElMessage({
        showClose: true,
        message: "请求修改所需内容",
        type: "success",
        center: true,
      });
    } else if (!Data.dialogFormVisible) {
      ElMessage.closeAll();
      ElMessage({
        showClose: true,
        message: "提交中......",
        type: "success",
        center: true,
      });
    }
  },
  //  点击全屏
  FullScreen() {
    if (Data.FullScreenFlag) {
      document.querySelector(".ShowCountent")!.requestFullscreen();
      Data.FullScreenFlag = !Data.FullScreenFlag;
    } else {
      document.exitFullscreen();
      Data.FullScreenFlag = !Data.FullScreenFlag;
    }
  },
});

onMounted(() => {
  nextTick(() => {
    Fun.FindThisIcon(); // 找到当前标题表示的ICON
    Fun.PageTotalList(); // 生成分页器组---列表
  });
});
export const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
];
