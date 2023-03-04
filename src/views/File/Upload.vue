<script setup lang="ts">
import { InboxOutlined } from "@ant-design/icons-vue";
import { get } from "lodash";
import { onMounted, reactive, ref } from "vue";
import { useFileUpload, useFileUploadSettings } from "../../api/file";
import { useSystemSetting } from "../../api/setting";
import { writeText } from "@tauri-apps/api/clipboard";
import { message } from "ant-design-vue";

const { select, selectActive, updateActive } = useFileUploadSettings();
const { add } = useFileUpload();

const store = reactive({
  list: [] as Array<any>,
});
const activeSettingId = ref<null | number>(null);
const activeSetting = reactive({
  id: null as null | number,
  name: "",
  api: "",
  postName: "",
  jsonUrl: "",
});

const switchActive = async () => {
  const { id, name, api, postName, jsonUrl } = await selectActive();
  activeSetting.id = id;
  activeSetting.name = name;
  activeSetting.api = api;
  activeSetting.postName = postName;
  activeSetting.jsonUrl = jsonUrl;
};

const fetch = async () => {
  const { data } = await select(100, 1);
  store.list = data;
  activeSettingId.value = data.find((x: any) => x.active)?.id;
  await switchActive();
};

const selectChange = async (value: any) => {
  await updateActive(activeSetting.id as number, 0);
  await updateActive(value, 1);
  await switchActive();
};

const {
  select: selectLinkFormat,
  add: addLinkFormat,
  update: updateLinkFormat,
} = useSystemSetting();
const linkFormat = ref("");
const fetchLinkFormat = async () => {
  const format = await selectLinkFormat("file", "upload_link_format");
  if (format.length === 0) {
    await addLinkFormat(
      "链接格式",
      "upload_link_format",
      "Url",
      "file",
      "文件上传链接格式"
    );
    linkFormat.value = "Url";
  } else {
    linkFormat.value = format[0].value;
  }
};

const switchLinkFormat = async () => {
  await updateLinkFormat("upload_link_format", linkFormat.value);
};

const getLink = (url: string) => {
  switch (linkFormat.value) {
    case "Url":
      return url;
    case "Markdown":
      return `![${url}](${url})`;
    case "HTML":
      return `<img src="${url}" />`;
    default:
      return url;
  }
};

const uploadChange = async ({ file }: { file: any }) => {
  if (file.status === "done") {
    const name = file.name;
    const type = file.type;
    const size = file.size;
    message.config({
      top: "100px",
    });
    try {
      const url = get(file.response, activeSetting.jsonUrl);
      await add(name, url, size, type, 0);
      await writeText(getLink(url));
      message.success(`${url}已复制到前切板`);
    } catch (error) {
      message.error(error as string);
    }
  }
};

onMounted(() => {
  fetch();
  fetchLinkFormat();
});
</script>

<template>
  <a-upload-dragger
    :name="activeSetting.postName"
    :action="activeSetting.api"
    :showUploadList="false"
    :maxCount="1"
    @change="uploadChange"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined style="font-size: 100px"></inbox-outlined>
    </p>
    <p class="ant-upload-text">将文件拖到此处，或<em>点击上传</em></p>
  </a-upload-dragger>
  <a-row :gutter="20" style="margin-top: 20px">
    <a-col :span="12" class="flex-column-center">
      <a-select
        v-model:value="activeSettingId"
        style="width: 80%"
        @change="selectChange"
      >
        <a-select-option
          v-for="item in store.list"
          :key="item.id"
          :value="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
      <div style="margin-top: 10px">上传配置</div>
    </a-col>
    <a-col :span="12" class="flex-column-center">
      <a-radio-group
        v-model:value="linkFormat"
        button-style="solid"
        @change="switchLinkFormat"
      >
        <a-radio-button value="Url">Url</a-radio-button>
        <a-radio-button value="Markdown">Markdown</a-radio-button>
        <a-radio-button value="HTML">HTML</a-radio-button>
      </a-radio-group>
      <div style="margin-top: 10px">链接格式</div>
    </a-col>
  </a-row>
</template>

<style>
.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
