import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import optimizer from 'vite-plugin-optimizer'
import { devPlugin, getReplacer } from './plugins/dev'
import { buildPlugin } from './plugins/build'

export default defineConfig({
  plugins: [
    optimizer(getReplacer()),
    devPlugin(),
    vue(),
  ],
  build: {
    rollupOptions: {
      plugins: [buildPlugin()],
    },
  },
})
