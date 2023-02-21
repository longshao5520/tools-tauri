import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Antd from "ant-design-vue";
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.dark.css'

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

createApp(App)
  .use(router)
  .use(store)
  .use(Antd)
  .mount("#app");
