import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    // server:{
    //   port: 80, // 设置服务启动端口号
    //   open: true, // 设置服务启动时是否自动打开浏览器
    // }
})

