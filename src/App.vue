<script setup lang="ts">
import { ref } from "vue";
import { useDark } from "@vueuse/core";
const loadCss = (url: string, isCache = false) => {
  const element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  if (isCache) {
    element.setAttribute("href", url + "?t=" + new Date().getTime());
  } else {
    element.setAttribute("href", url);
  }
  document.head.appendChild(element);
};
const isDark = ref(false);
useDark({
  onChanged: (IsDark) => {
    isDark.value = IsDark;
    if (IsDark) {
      loadCss("https://unpkg.com/ant-design-vue/dist/antd.dark.min.css");
    } else {
      loadCss("https://unpkg.com/ant-design-vue/dist/antd.min.css");
    }
  },
});
</script>

<template>
  <router-view></router-view>
</template>

<style></style>
