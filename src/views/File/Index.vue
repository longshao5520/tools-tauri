<script setup lang="ts">
import { HomeOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const back = () => {
  router.push("/");
};

const activeName = ref(route.path);

const handleChange = (name: any) => {
  router.push(name);
};
</script>

<template>
  <a-page-header>
    <template #title>
      <div style="display: flex">
        <a-space style="margin-right: 20px" @click="back">
          <HomeOutlined />
        </a-space>
        <a-tabs v-model:activeKey="activeName" @change="handleChange">
          <a-tab-pane key="/file/upload" tab="上传区" />
          <a-tab-pane key="/file/list" tab="文件列表" />
          <a-tab-pane key="/file/setting" tab="图床配置" />
        </a-tabs>
      </div>
    </template>
    <router-view></router-view>
  </a-page-header>
</template>

<style></style>
