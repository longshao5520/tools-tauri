<script setup lang="ts">
import { IconType } from "@ant-design/icons-vue/lib/components/Icon";
import { PropType } from "vue";
interface ListItem {
  [key: string]: any;
  title: string;
  icon: string | IconType;
  iconStyle?: Record<string, any>;
}

let { list, iconKey, titleKey } = defineProps({
  list: {
    type: Array as PropType<ListItem[]>,
    default: () => [],
  },
  iconKey: {
    type: String,
    default: "icon",
  },
  iconStyle: {
    type: Object as PropType<Record<string, any>>,
    default: () => {},
  },
  titleKey: {
    type: String,
    default: "title",
  },
});

const emit = defineEmits(["itemClick"]);

const skip = (item: any) => {
  emit("itemClick", item);
};
</script>

<template>
  <a-row :gutter="20" style="min-width: 648px">
    <a-col
      v-for="(item, index) in list"
      :key="index"
      :xs="12" :sm="8" :md="8" :lg="4"
    >
      <a-card @click="skip(item)">
        <div class="flex-col-center">
          <slot name="icon" :item="item">
            <a-space>
              <component :is="item[iconKey]" :style="item.iconStyle" />
            </a-space>
          </slot>
          <slot name="title" :item="item">
            <div style="margin-top: 10px">{{ item[titleKey] }}</div>
          </slot>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
