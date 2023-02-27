<script setup lang="ts">
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { reactive } from "vue";
import { useFileUploadHistory } from "../../api/file";
import { useNotification } from "../../hooks/useNotification";

const { select } = useFileUploadHistory();

const store = reactive({
  list: [] as Array<any>,
});

const fetch = async () => {
  const { data } = await select(100, 1);
  store.list = data;
  "111".includes("1");
};

fetch();

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3916212_20a7pb57iv.js",
});

const findIcon = (type: string) => {
  if (type.includes("json")) {
    return "icon-json";
  }
  return "icon-file";
};

const { sendSystemNotification } = useNotification();
const copyFile = async (url: string) => {
  console.log(url);

  await sendSystemNotification(`文件地址已复制到剪切板`);
};
</script>

<template>
  <!-- {{ store.list }} -->
  <a-empty v-if="store.list.length == 0" description="暂无数据" />
  <a-row v-else :gutter="20" style="min-width: 648px">
    <a-col
      v-for="(item, index) in store.list"
      :key="index"
      :xs="12"
      :sm="8"
      :md="6"
      :lg="4"
      style="margin-bottom: 20px; user-select: none"
      @click="copyFile(item.url)"
    >
      <a-card>
        <div style="display: flex; flex-direction: column; align-items: center">
          <div style="width: 100%; height: 150px" class="flex-center">
            <a-image
              v-if="item.type.includes('image')"
              :src="item.url"
              :preview="false"
              width="100%"
              height="150px"
            />
            <icon-font
              v-else
              :type="findIcon(item.type)"
              style="font-size: 5rem"
            />
          </div>
          <div
            style="
              width: 100%;
              margin-top: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            {{ item.name }}
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<style>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
