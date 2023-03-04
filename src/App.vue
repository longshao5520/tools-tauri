<script setup lang="ts">
import {reactive, ref} from "vue";
import {useDark} from "@vueuse/core";

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
const theme = reactive({
  bgColor: "",
})
useDark({
  onChanged: (IsDark) => {
    isDark.value = IsDark;
    if (IsDark) {
      loadCss("https://unpkg.com/ant-design-vue/dist/antd.dark.min.css");
      theme.bgColor = "rgba(0, 0, 0, 0.5)";
    } else {
      loadCss("https://unpkg.com/ant-design-vue/dist/antd.min.css");
      theme.bgColor = "rgba(255, 255, 255, 0.5)";
    }
  },
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
html,
body {
  overflow: hidden;
  background-color: transparent !important;
}

#app {
  height: 100vh !important;
  /*background-color: v-bind('theme.bgColor') !important;*/
  background-color: rgba(0, 0, 0, 0.5) !important;
  overflow: hidden;
  overflow-y: auto;
}
</style>
