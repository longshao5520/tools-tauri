<script setup lang="ts">
import {useAppTheme} from "./hooks/useAppTheme";

const {appTheme, getTheme} = useAppTheme();

getTheme();
</script>

<template>
  <a-config-provider :prefix-cls="appTheme">
    <router-view></router-view>
  </a-config-provider>
</template>

<style>
html,
body {
  overflow: hidden;
  background-color: transparent !important;
}

#app {
  height: 100vh !important;
  background-color: transparent;
  overflow: hidden;
  overflow-y: auto;
}
</style>
