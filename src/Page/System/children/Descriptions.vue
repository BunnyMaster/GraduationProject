<template>
  <div class="Descriptions">
    <el-radio-group v-model="size">
      <el-radio label="large">最大</el-radio>
      <el-radio>默认</el-radio>
      <el-radio label="small">最小</el-radio>
    </el-radio-group>

    <el-descriptions title="Vertical list with border" direction="vertical" :column="4" :size="size" border>
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const size = ref("");
const blockMargin = computed(() => {
  const marginMap = {
    large: "32px",
    default: "28px",
    small: "24px",
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>

<style lang="less">
.Descriptions {
  width: 900px;
  margin: 0 auto;
  .el-descriptions__body {
    margin: 0 auto;
    text-align: center;
  }
}
</style>
