<script setup lang="ts">
import {IconType} from "@ant-design/icons-vue/lib/components/Icon";
import {computed, PropType} from "vue";

interface ListItem {
  [key: string]: any;

  title: string;
  icon: string | IconType;
  iconStyle?: Record<string, any>;
}

let {list, iconKey, titleKey, titlePosition} = defineProps({
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
    default: () => {
    },
  },
  titlePosition: {
    type: String as PropType<"top" | "bottom">,
    default: "bottom",
  },
  titleKey: {
    type: String,
    default: "title",
  },
});

const contentStyle = computed(() => (titlePosition === "bottom" ?
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } : {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "center",
  }));

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
        <div :style="contentStyle">
          <slot name="icon" :item="item">
            <a-space>
              <component :is="item[iconKey]" :style="item.iconStyle"/>
            </a-space>
          </slot>
          <slot name="title" :item="item">
            <div>{{ item[titleKey] }}</div>
          </slot>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
</style>
