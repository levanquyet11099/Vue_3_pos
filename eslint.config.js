import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
// import pluginTypeScript from '@typescript-eslint/eslint-plugin'
// import parserTypeScript from '@typescript-eslint/parser'
// import vueEslintParser from 'vue-eslint-parser'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue,ts,tsx}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
  // {
  //   files: ['**/*.{ts,tsx,vue}'],
  //   languageOptions: {
  //     parser: vueEslintParser,
  //     parserOptions: {
  //       parser: parserTypeScript,
  //       ecmaVersion: 2021,
  //       sourceType: 'module',
  //       extraFileExtensions: ['.vue'],
  //     },
  //   },
  //   plugins: {
  //     '@typescript-eslint': pluginTypeScript,
  //   },
  //   rules: {
  //     ...pluginTypeScript.configs.recommended.rules,
  //   },
  // },
]
