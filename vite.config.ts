import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 使得setup语法糖也能使用name
import vueSetupExtend from "vite-plugin-vue-setup-extend"

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
  plugins: [vue(), vueSetupExtend()],
  // 配置引入css预处理器的全局颜色变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/style/variable.scss";`
      }
    }
  }
})
