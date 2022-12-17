import {ConfigEnv, defineConfig, UserConfig} from 'vite'
import {resolve} from 'path'
// @ts-ignore
import {getPluginsList} from './build/plugins';
import pkg from 'picocolors'

const {green, blue, bold} = pkg
export default defineConfig(({command, mode}: ConfigEnv): UserConfig => {
    console.log(
        bold(
            green(
                `👏欢迎使用${blue(
                    "[vue-admin-template]"
                )}，如果您感觉不错，记得点击后面链接给个star哦💖 https://github.com/xiaoxian521/vue-pure-admin`
            )
        )
    );
    console.log(bold(green(`您正在执行${command}命令，当前为${mode}环境`)))
    return {
        root: process.cwd(),
        // 开发环境配置
        server: {
            port: 8080,
            proxy: {
                "/api": {
                    target: '接口地址',
                    changeOrigin: true
                }
            }
        },
        // 生产环境配置
        build: {
            target: "modules",
            outDir: "dist",
            assetsDir: "assets",
            minify: "esbuild",
            // 打包后文件大小提醒配置
            chunkSizeWarningLimit: 4000,
            // 静态资源打包输出目录配置
            rollupOptions: {
                output: {
                    chunkFileNames: "static/js/[name]-[hash].js",
                    entryFileNames: "static/js/[name]-[hash].js",
                    assetFileNames: "static/[ext]/[name-[hash].[ext]"
                }
            },
            // 清除console
            terserOptions: {
                compress: {
                    drop_console: true
                }
            }
        },
        // 别名配置
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
                "/images": "/src/assets/images"
            }
        },
        // 插件
        plugins: getPluginsList(command, mode)
    }
})