<script setup lang="ts">
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { reactive } from "vue";
import { useFileUploadHistory } from "../../api/file";
import { useNotification } from "../../hooks/useNotification";
import CardLayout from "@/components/CardLayout.vue";

const { select } = useFileUploadHistory();

const store = reactive({
  list: [] as Array<any>,
});

const fetch = async () => {
  const { data } = await select(100, 1);
  store.list = data;
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
const copyFile = async (item: any) => {
  console.log(item.url);

  await sendSystemNotification(`文件地址已复制到剪切板`);
};
</script>

<template>
  <a-empty v-if="store.list.length == 0" description="暂无数据" />
  <CardLayout v-else :list="store.list" title-key="name" @item-click="copyFile">
    <template #icon="{ item }">
      <div style="width: 100%; height: 150px" class="flex-center">
        <a-image
          v-if="item.type.includes('image')"
          :src="item.url"
          :preview="false"
          width="100%"
          height="150px"
        />
        <icon-font v-else :type="findIcon(item.type)" style="font-size: 5rem" />
      </div>
    </template>
  </CardLayout>
</template>

<style>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
