// @ts-check
import js from "@eslint/js"
import banRelativeImports from "eslint-plugin-ban-relative-imports"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
    {ignores: ["dist"]},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "ban-relative-imports": banRelativeImports
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "ban-relative-imports/ban-relative-imports": "error",
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                {allowConstantExport: true}
            ]
        }
    }
)
