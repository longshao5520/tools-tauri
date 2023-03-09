<script setup lang="ts">
import {createFromIconfontCN} from "@ant-design/icons-vue";
import {reactive} from "vue";
import {useFileUploadHistory} from "../../api/file";
import CardLayout from "@/components/CardLayout.vue";
import {message} from "ant-design-vue";
import {writeText} from "@tauri-apps/api/clipboard";

const {select, del} = useFileUploadHistory();

const store = reactive({
  list: [] as Array<any>,
});

const fetch = async () => {
  const {data} = await select(100, 1);
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

const copyFile = async (item: any) => {
  await writeText(item.url);
  message.success(`${item.url}已复制到前切板`);
};
const removeFile = async (item: any) => {
  await del(item.id);
  await fetch()
  message.success(`已删除`);
};
</script>

<template>
  <a-empty v-if="store.list.length === 0"/>
  <CardLayout v-else :list="store.list" title-key="name" title-position="top">
    <template #icon="{ item }">
      <div>
        <a-button type="text" style="color: #1890FF" @click="copyFile(item)">
          <template #icon>
            <copy-outlined/>
          </template>
          复制
        </a-button>
        <a-button type="text" style="margin-left: 10px;color: #1890FF" @click="removeFile(item)">
          <template #icon>
            <delete-outlined/>
          </template>
          删除
        </a-button>
      </div>
      <div style="width: 100%; height: 150px" class="flex-center">
        <a-image
          v-if="item.type.includes('image')"
          :src="item.url"
          :preview="true"
          width="100%"
          height="150px"
        />
        <icon-font v-else :type="findIcon(item.type)" style="font-size: 5rem"/>
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
