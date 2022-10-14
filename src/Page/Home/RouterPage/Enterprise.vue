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
        <!--      TODO 单位层次-->
        <el-table-column align="center" :fixed="'left'" prop="date" label="单位层次" width="190" style="text-align: center" />
        <!--   TODO ---   单位名称-->
        <el-table-column
          align="center"
          prop="tag"
          label="单位名称"
          width="260"
          :fixed="'left'"
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
        <!--   TODO ---   单位性质-->
        <el-table-column align="center" prop="name" label="单位性质" width="180" />
        <!--   TODO ---   企业注册资本-->
        <el-table-column align="center" prop="name" label="企业注册资本" width="160" />
        <!--   TODO ---   法人-->
        <el-table-column
          align="center"
          prop="tag"
          label="法人"
          width="120"
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
        <!--   TODO ---   法人身份证-->
        <el-table-column align="center" prop="name" label="法人身份证" width="260" />
        <!--   TODO ---   单位地址-->
        <el-table-column align="center" prop="address" label="单位地址" :formatter="Fun.formatter" width="400" />
        <!--  TODO ---  邮政编码  -->
        <el-table-column align="center" prop="name" label="邮政编码" width="150" />
        <!--  TODO --- 操作   -->
        <el-table-column align="center" fixed="right" label="操作" width="190">
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

const tableData: User[] = [
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
</script>
