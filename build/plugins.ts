import vue from "@vitejs/plugin-vue";
import {viteBuildInfo} from "./info";
import {viteMockServe} from "vite-plugin-mock";
import {visualizer} from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import IconResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import progress from 'vite-plugin-progress'
import colors from 'picocolors'
import eslintPlugin from "vite-plugin-eslint";

export function getPluginsList(
    command: string,
    mode: string
) {
    return [
        vue(),
        viteBuildInfo(command, mode),
        progress({
            format: `${colors.green(colors.bold('Bouilding'))} ${colors.cyan('[:bar]')} :percent`
        }),
        // 打包分析配置
        mode === "report" ? visualizer({
            emitFile: false,
            filename: "report.html",
            open: true,
            brotliSize: true
        }) : null,
        // mock配置
        viteMockServe({
            mockPath: '../mock',
            localEnabled: mode === "mock", // 开发环境
            prodEnabled: false, // 生产环境
        }),
        // gzip压缩配置
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        }),
        // 按需引入Element-Plus函数
        AutoImport({
            resolvers: [
                // 自动导入Element-Plus相关函数
                ElementPlusResolver(),
                // 自动导入图标组件
                IconResolver({
                    prefix: 'Icon'
                })
            ]
        }),
        // 按需引入Element-Plus组件
        Components({
            resolvers: [
                // 自动导入Element-Plus组件
                ElementPlusResolver(),
                // 自动注册图标组件
                IconResolver({
                    enabledCollections: ['ep']
                })
            ]
        }),
        // 自动注册icon
        Icons({
            autoInstall: true
        }),
        eslintPlugin({
            include: ["src/**/*.vue", "src/**/*.ts", "src/*.ts", "src/*.vue"]
        })
    ];
}
