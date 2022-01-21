import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import {
  resolve
} from "path";

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

const alias = {
  "@": pathResolve("src"),
};


// https://vitejs.dev/config/
export default defineConfig({
  // 打包路径
  base: "./",
  // 解析到src路径
  resolve: {
    alias,
  },
  // 启动服务器
  server: {
    port: 3090,
    host: "0.0.0.0",
    open: true,
  },
  plugins: [vue()],
  // 配置引入css预处理器的全局颜色变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/style/variable.scss";`
      }
    }
  }
})
