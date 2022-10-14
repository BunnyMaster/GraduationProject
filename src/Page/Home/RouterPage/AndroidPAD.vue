<template>
  <HomeTableCommon :tableData="tableData">
    <template #default>
      <el-table :data="tableData" style="width: 100%" stripe :row-class-name="Fun.tableRowClassName" :default-sort="{ prop: 'date', order: 'descending' }" max-height="650">
        <template #empty>
          <el-empty>
            <template #description> 暂无数据 </template>
            <el-button type="primary">刷新</el-button>
          </el-empty>
        </template>
        <!--    TODO fixed---固定一端 fixed="right"---固定选择的一端-->

        <!--      TODO 设备类型-->
        <el-table-column align="center" :fixed="'left'" sortable prop="date" label="设备条码" width="150" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO --- 设备规格  -->
        <el-table-column align="center" :fixed="'left'" sortable prop="date" label="设备规格" width="150" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <!--      TODO --- 采购时间-->
        <el-table-column align="center" :fixed="'left'" sortable prop="date" label="采购时间" width="150" style="text-align: center">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <!--   TODO ---   所属工站-->
        <el-table-column
          align="center"
          prop="tag"
          label="所属工站"
          width="100"
          :filters="[
            { text: 'Home', value: 'Home' },
            { text: 'Office', value: 'Office' },
          ]"
          :filter-method="Fun.filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <!--    TODO ---  所属工位-->
        <el-table-column
          align="center"
          prop="tag"
          label="所属工位"
          width="100"
          :filters="[
            { text: 'Home', value: 'Home' },
            { text: 'Office', value: 'Office' },
          ]"
          :filter-method="Fun.filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <!--   TODO ---   分辨率-->
        <el-table-column align="center" prop="name" label="分辨率" width="180" />
        <!--  TODO --- 核心数   -->
        <el-table-column align="center" prop="name" label="核心数" width="180" />
        <!--   TODO --- 内存  -->
        <el-table-column align="center" prop="name" label="内存" width="180" />
        <!--  TODO --- 电池容量   -->
        <el-table-column align="center" prop="name" label="电池容量" width="180" 电池容量 />
        <!-- TODO ---  供应商   -->
        <el-table-column align="center" prop="address" label="供应商" :formatter="Fun.formatter" width="400" />
        <!--  TODO ---  生产商  -->
        <el-table-column align="center" prop="address" label="生产商" :formatter="Fun.formatter" width="400" />
        <!--   TODO ---   用途-->
        <el-table-column align="center" prop="address" label="用途" :formatter="Fun.formatter" width="400" />
        <!--  TODO --- 资产负责人   -->
        <el-table-column align="center" prop="name" label="资产负责人" width="120" />
        <!--  TODO --- 所有权部门   -->
        <el-table-column
          align="center"
          prop="tag"
          label="所有权部门"
          width="130"
          :filters="[
            { text: 'Home', value: 'Home' },
            { text: 'Office', value: 'Office' },
          ]"
          :filter-method="Fun.filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" :fixed="'right'" label="操作" width="190">
          <template #default="scope">
            <el-button size="small" @click="Fun.handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
            <el-button size="small" type="danger" @click="Fun.handleDelete(scope.$index, scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </HomeTableCommon>
</template>
<script setup lang="ts">
import HomeTableCommon from "@/components/HomeTableCommon.vue";
import { reactive } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}
const Fun = reactive({
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
  //TODO 点击编辑
  handleEdit(index, row) {},
  // TODO 点击删除
  handleDelete(index, row) {},
});

const tableData: User[] = undefined;
</script>
