<template>
  <svg id="barcode" v />
</template>

<script setup lang="ts">
import JsBarcode from "jsbarcode";
import { nextTick } from "vue";
const props = defineProps(["jsbarcodeInfo", "text"]);

//TODO 设备条形码
const getBarcode = (txt: string) => {
  let options = {
    text: props.text,
    displayValue: true,
    fontSize: 16,
    height: 50,
    width: 1,
  };
  //这个根据自己的代码 论情况写
  return JsBarcode("#barcode", txt, options);
  //#barcode 对应容器中的id
  //987654321 是条形码的携带的信息，和option中的text显示信息要区分
  //options:是条形码的配置信息
};
nextTick(() => {
  getBarcode(props.jsbarcodeInfo);
});
</script>

<style scoped></style>
