<script setup lang="ts">
import { useFileUploadSettings } from "../../api/file";
import crud, { defineC, defineD, defineR, defineU } from "crud-vue";
const primaryKey = "id";

const { select, add, update, del } = useFileUploadSettings();

const r = defineR({
  hideRowSelection: false,
  columns: [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "api",
      dataIndex: "api",
    },
    {
      title: "postName",
      dataIndex: "postName",
    },
    {
      title: "jsonUrl",
      dataIndex: "jsonUrl",
    },
    {
      title: "状态",
      dataIndex: "active",
    },
    {
      title: "操作",
      key: "operation",
      width: 200,
    },
  ],

  async done() {
    const { data, total } = await select(10, 1);
    return { list: data, total: total };
  },
});

const c = defineC({
  items: () => [
    { is: "a-input", name: "name", label: "名称" },
    { is: "a-input", name: "api", label: "api" },
    { is: "a-input", name: "postName", label: "postName" },
    { is: "a-input", name: "jsonUrl", label: "jsonUrl" },
  ],
  async done(formData) {
    try {
      await add(
        formData.name,
        formData.api,
        formData.postName,
        formData.jsonUrl,
        0
      );
    } catch (error) {
      console.log(error);
    }
    return [true, "成功"];
  },
});

const u = defineU({
  items: () => [
    { is: "a-input", name: "id", label: "id", display: false },
    { is: "a-input", name: "name", label: "名称" },
    { is: "a-input", name: "api", label: "api" },
    { is: "a-input", name: "postName", label: "postName" },
    { is: "a-input", name: "jsonUrl", label: "jsonUrl" },
    { is: "a-input", name: "active", label: "状态", disabled: true },
  ],
  async done(formData) {
    console.log(formData);
    const { id, name, api, postName, jsonUrl, active } = formData;
    try {
      await update(id, name, api, postName, jsonUrl, active);
    } catch (error) {
      console.log(error);
    }
    return [true, "成功"];
  },
});

const d = defineD({
  async done(idList) {
    try {
      if (idList.length == 1) {
        await del(idList[0]);
      } else {
        await Promise.all(idList.map(async (id) => await del(id)));
      }
    } catch (error) {
      console.log(error);
    }
    return [true, "成功"];
  },
});
</script>

<template>
  <crud :primaryKey="primaryKey" :r="r" :c="c" :u="u" :d="d"></crud>
</template>

<style></style>
