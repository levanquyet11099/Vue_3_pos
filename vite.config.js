import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), vuetify({ autoImport: true })],
  base: '/',
  resolve: {
    extensions: ['.js', '.vue', '.json', 'ts', 'html'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    port: 8080, // Đặt cổng cho server dev
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Đích mà bạn muốn proxy
        changeOrigin: true, // Thay đổi origin nếu cần
        rewrite: (path) => path.replace(/^\/api/, ''), // Xóa '/api' trước khi gửi tới backend
      },
    },
  },
})
