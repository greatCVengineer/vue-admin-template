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
                `ðæ¬¢è¿ä½¿ç¨${blue(
                    "[vue-admin-template]"
                )}ï¼å¦ææ¨æè§ä¸éï¼è®°å¾ç¹å»åé¢é¾æ¥ç»ä¸ªstarå¦ð https://github.com/xiaoxian521/vue-pure-admin`
            )
        )
    );
    console.log(bold(green(`æ¨æ­£å¨æ§è¡${command}å½ä»¤ï¼å½åä¸º${mode}ç¯å¢`)))
    return {
        root: process.cwd(),
        // å¼åç¯å¢éç½®
        server: {
            port: 8080,
            proxy: {
                "/api": {
                    target: 'æ¥å£å°å',
                    changeOrigin: true
                }
            }
        },
        // çäº§ç¯å¢éç½®
        build: {
            target: "modules",
            outDir: "dist",
            assetsDir: "assets",
            minify: "esbuild",
            // æååæä»¶å¤§å°æééç½®
            chunkSizeWarningLimit: 4000,
            // éæèµæºæåè¾åºç®å½éç½®
            rollupOptions: {
                output: {
                    chunkFileNames: "static/js/[name]-[hash].js",
                    entryFileNames: "static/js/[name]-[hash].js",
                    assetFileNames: "static/[ext]/[name-[hash].[ext]"
                }
            },
            // æ¸é¤console
            terserOptions: {
                compress: {
                    drop_console: true
                }
            }
        },
        // å«åéç½®
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
                "/images": "/src/assets/images"
            }
        },
        // æä»¶
        plugins: getPluginsList(command, mode)
    }
})