<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { get } from "lodash";

import { useFileListStore } from "./store/useFileListStore";

import { useDark, useToggle } from "@vueuse/core";
const isDark = ref(false);
useDark({
  onChanged: (IsDark) => {
    isDark.value = IsDark;
  },
});

// console.log(isDark);

// const toggleDark = useToggle(isDark);

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
  <!-- <a-config-provider :prefix-cls="isDark ? 'custom-dark' : 'ant'"> -->
    <router-view></router-view>
  <!-- </a-config-provider> -->
  <!-- <el-main> -->
  <!-- <el-form :model="form" label-width="100px">
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
    </el-upload> -->

  <!-- <el-table :data="store.files" style="width: 100%">
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="type" label="文件类型" />
      <el-table-column prop="url" label="文件地址">
      </el-table-column>
      <el-table-column prop="url" label="预览">
        <template #default="{ row }">
          <el-image
            :src="row.url"
            :preview-src-list="[row.url]"
            fit="scale-down"
            style="width: 100px"
          ></el-image>
        </template>
      </el-table-column>
    </el-table> -->
  <!-- </el-main> -->
</template>

<style scoped>
/* .logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
} */
</style>
