import { defineStore } from 'pinia'

interface File {
  url: string
  name: string
  type: string
}

export const useFileListStore = defineStore({
  id: 'fileList',
  state: () => ({
    files: [] as File[],
  }),
  actions: {
    addFile(file: File) {
      this.files.push(file)
    },
  },
  persist: true,
})