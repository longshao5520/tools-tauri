import {useSystemSetting} from "../api/setting";
import {computed, nextTick, ref} from "vue";
import {useDark} from "@vueuse/core";

const {
  select,
  add,
  update,
} = useSystemSetting();
export const useAppTheme = () => {
  let dark = ref('');

  const getTheme = async () => {
    const theme = await select('app', 'app_theme');
    if (theme.length === 0) {
      await add(
        "App主题",
        "app_theme",
        "System",
        "app",
        "App主题"
      );
    } else {
      dark.value = theme[0].value;
    }
    await setTheme(dark.value)
  }


  const setTheme = async (value: string) => {
    if (dark.value !== value) {
      await update('app_theme', value);
    }
    let bg = ""
    if (value === 'System') {
      const isDark = useDark();
      dark.value = isDark.value ? 'Dark' : 'Light';
    } else {
      dark.value = value;
    }
    console.log("setDark", dark.value)
    if (dark.value === 'Light') {
      bg = "background-color: rgba(255, 255, 255, 0.5) !important;";
    } else if (dark.value === 'Dark') {
      bg = "background-color: rgba(0, 0, 0, 0.5) !important;";
    }
    await nextTick(() => {
      document.getElementById("app")?.setAttribute("style", bg)
    });
  }

  const appTheme = computed(() => {
    if (dark.value === 'Light') {
      return "ant";
    } else if (dark.value === 'Dark') {
      return "dark";
    } else {
      return "ant";
    }
  })


  return {
    appTheme,
    getTheme,
    setTheme,
  }
}