<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const skip = () => {
  router.push("/file/upload");
};
</script>

<template>
  <el-row :gutter="20" style="min-width: 648px;">
    <!-- v-for="index in 7" :key="index"  -->
    <el-col :xs="12" :sm="8" :md="6" :lg="4" @click="skip">
      <el-card class="box-card">
        <div style="display: flex; flex-direction: column; align-items: center">
          <el-icon size="150" color="#f0f">
            <UploadFilled />
          </el-icon>
          <div style="margin-top: 0px">文件上传</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style></style>
