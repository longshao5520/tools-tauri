<script setup lang="ts">
import {useRouter} from "vue-router";
import CardLayout from "@/components/CardLayout.vue";

const router = useRouter();

const list = [
  {
    title: "文件上传",
    path: "/file/upload",
    icon: "CloudUploadOutlined",
    iconStyle: {
      fontSize: "120px",
      color: "#F0F",
    },
  },
  {
    title: "设置",
    path: "/setting",
    icon: "SettingOutlined",
    iconStyle: {
      fontSize: "120px",
      color: "#F00",
    },
  }
];

const skip = (item: any) => {
  router.push(item.path);
};
</script>

<template>
  <a-layout-content style="padding: 20px">
    <CardLayout :list="list" @item-click="skip"></CardLayout>
  </a-layout-content>
</template>

<style></style>
