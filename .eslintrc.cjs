module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',                 // eslint核心规则
        'plugin:vue/vue3-essential',          // 继承eslint-plugin-vue组件中的基础配置
        'plugin:prettier/recommended',        // 继承eslint-plugin-prettier组件中的基础配置
        'eslint-config-prettier'              // 处理配置兼容问题
    ],
    parser: 'vue-eslint-parser',            // 使用vue解析器
    parserOptions: {                        // 设置支持的JavaScript语言选项
        ecmaVersion: 'latest',                // 指定EcmaScript的版本
        sourceType: 'module'                  // script/module
    },
    plugins: [
        'vue',
        'prettier'
    ],
    globals: {                             // 添加全局变量，防止no-undef 规则发出警告
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    rules: {
        indent: [2, 2],                      // 缩进2个空格
        semi: [2, 'never'],                  // 要求或禁止使用分号代替 ASI,即禁用行尾使用分号
        quotes: [2, 'double'],               // 使用单引号
        'semi': ['warn', 'never'],           // 禁止尾部使用分号
        'no-empty': 'warn',                  // 禁止出现空语句块
        'no-func-assign': 'warn',            // 禁止对Function声明重新赋值
        'no-useless-return': 'warn',         // 禁止不必要的return语句
        'no-var': 'warn',                    // 禁止出现var用let和const代替
        'eqeqeq': 'warn',                    // 要求使用 === 和 !==
        'arrow-spacing': 'warn',             // 要求箭头函数的箭头前后使用一致的空格
        'max-depth': ['warn', 4],            // 要求可嵌套的块的最大深度4
        'max-nested-callbacks': ['warn', 3], // 要求回调函数最大嵌套深度3
    }
}
