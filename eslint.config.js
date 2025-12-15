import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importSort from 'eslint-plugin-simple-import-sort'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default defineConfig([
    globalIgnores(['dist', '.storybook', 'docs']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [js.configs.recommended, tsEslint.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite, eslintConfigPrettier],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'simple-import-sort': importSort,
            'prefer-arrow': preferArrowFunctions,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'none', // 'after-used'
                    caughtErrors: 'all',
                    ignoreRestSiblings: false,
                    reportUsedIgnorePattern: false,
                },
            ],
            'simple-import-sort/imports': 'error',
            'prefer-arrow/prefer-arrow-functions': [
                'error',
                {
                    disallowPrototype: true,
                    singleReturnOnly: false,
                    classPropertiesAllowed: true,
                },
            ],
        },
    },
    {
        files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
        extends: [...storybook.configs['flat/recommended']],
    },
])
