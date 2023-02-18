<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { UploadFilled } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { get } from "lodash";

import { useFileListStore } from "./store/useFileListStore";

const store = useFileListStore();

let form = reactive({
  api: "https://file.cs08.cn/file/uploadUtil",
  postName: "file",
  jsonUrl: "data.url",
});

const handleSuccess = (response: any, file: any, fileList: any) => {
  console.log(response, file, fileList);

  const url = get(response, form.jsonUrl);
  const name = file.name;
  const type = file.raw.type;
  store.addFile({ url, name, type });
};
</script>

<template>
  <div class="container">
    <el-form :model="form" label-width="100px">
      <el-form-item label="API地址">
        <el-input v-model="form.api" placeholder="API地址" />
      </el-form-item>
      <el-form-item label="POST参数名">
        <el-input v-model="form.postName" placeholder="POST参数名" />
      </el-form-item>
      <el-form-item label="JSON路径">
        <el-input v-model="form.jsonUrl" placeholder="eg: data.url" />
      </el-form-item>
    </el-form>
    <el-upload
      class="upload-demo"
      drag
      multiple
      :limit="1"
      :action="form.api"
      :show-file-list="false"
      :on-success="handleSuccess"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template> -->
    </el-upload>

    <el-table :data="store.files" style="width: 100%">
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="type" label="文件类型" />
      <el-table-column prop="url" label="文件地址">
        <!-- <template #default="{ row }">
          <el-link :href="row.url" type="primary" target="_blank"
            >点击查看</el-link
          >
        </template> -->
      </el-table-column>
      <el-table-column prop="url" label="预览">
        <template #default="{ row }">
          <el-image :src="row.url" :preview-src-list="[row.url]" fit="scale-down" style="width: 100px;"></el-image>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
/* .logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
} */
</style>
