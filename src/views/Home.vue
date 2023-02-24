<script setup lang="ts">
// import { UploadFilled } from "@element-plus/icons-vue";
import { CloudUploadOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const skip = () => {
  router.push("/file/upload");
};
</script>

<template>
  <a-layout-content style="padding: 20px">
    <a-row :gutter="20" style="min-width: 648px">
      <a-col :xs="12" :sm="8" :md="6" :lg="4">
        <a-card @click="skip">
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <a-space>
              <cloud-upload-outlined style="font-size: 120px; color: #F0F;" />
            </a-space>
            <div style="margin-top: 10px">文件上传</div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </a-layout-content>
</template>

<style></style>
