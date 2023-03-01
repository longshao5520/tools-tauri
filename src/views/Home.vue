<script setup lang="ts">
import { useRouter } from "vue-router";
import CardLayout from "@/components/CardLayout.vue";

const router = useRouter();

const list = [
  {
    title: "文件上传",
    icon: "CloudUploadOutlined",
    iconStyle: {
      fontSize: "120px",
      color: "#F0F",
    },
  },
];

const skip = (item: any) => {
  router.push("/file/upload");
};
</script>

<template>
  <a-layout-content style="padding: 20px">
    <CardLayout :list="list" @item-click="skip"></CardLayout>
  </a-layout-content>
</template>

<style></style>
