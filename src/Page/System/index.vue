<template>
  <Calendar />
  <Descriptions />
  <SystemCPUs />
</template>

<script setup lang="ts">
import SystemCPUs from "@/Page/System/children/SystemCPUs.vue";
import Calendar from "./children/Calendar.vue";
import Descriptions from "@/Page/System/children/Descriptions.vue";
</script>
<style scoped lang="less"></style>
