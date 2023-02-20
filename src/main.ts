import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const store = createPinia();
// 状态持久化-插件配置
store.use(
  createPersistedState({
    storage: window.localStorage,
    serializer: {
      // 指定参数序列化器
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  })
);

import router from "./router";

createApp(App).use(router).use(store).use(ElementPlus).mount("#app");
