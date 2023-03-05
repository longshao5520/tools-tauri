import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";

const app = createApp(App);

import * as Icons from '@ant-design/icons-vue'
for (const i in Icons) {
  // @ts-ignore
  app.component(i, Icons[i])
}

app.use(router).use(Antd).mount("#app");
