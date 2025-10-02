import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import importHelpers from "eslint-plugin-import-helpers";
import unusedImports from "eslint-plugin-unused-imports";
import stylistic from "@stylistic/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

const generatePathGroup = (name) => {
  return [
    `/^${name}/`,       // import like: layouts/...
    `/^@${name}/`,      // import like: @layouts/...
    `/^\\.\\/${name}/`  // import like: ./layouts/...
  ];
};

export default [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**"
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: ["tsconfig.json"]
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tsEslint,
      prettier,
      import: importPlugin,
      "import-helpers": importHelpers,
      "unused-imports": unusedImports,
      "@stylistic": stylistic,
      "@next/next": nextPlugin
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        },
        typescript: {
          alwaysTryTypes: true,
          project: ["tsconfig.json"]
        }
      }
    },
    rules: {
      // --- base ---
      ...js.configs.recommended.rules,

      // --- react ---
      ...react.configs.recommended.rules,

      // --- typescript ---
      ...tsEslint.configs.recommended.rules,

      // --- prettier ---
      ...prettier.configs.recommended.rules,

      // --- imports ---
      ...importPlugin.configs.recommended.rules,

      // --- next.js ---
      ...nextPlugin.configs.recommended.rules,

      // --- custom ---
      "unused-imports/no-unused-imports": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",

      // jsx/props
      "react/no-unknown-property": ["error", { ignore: ["classNames"] }],
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",

      // style
      "react/jsx-tag-spacing": ["error"],
      "react/jsx-newline": "error",
      quotes: ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "linebreak-style": ["error", "unix"],
      "no-trailing-spaces": ["error", { skipBlankLines: true }],
      "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
      "eol-last": "error",

      // ts
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/consistent-type-imports": "error",

      // imports ordering
      "import-helpers/order-imports": [
        "error",
        {
          newlinesBetween: "always",
          groups: [
            "module",
            ...[
              "layouts",
              "pages",
              "components",
              "hooks",
              "functions",
              "utils",
              "assets",
              "constants",
              "types"
            ].reduce((acc, name) => acc.concat(generatePathGroup(name)), []),
            "parent",
            "sibling",
            "index"
          ],
          alphabetize: { order: "asc", ignoreCase: true }
        }
      ],

      // dep
      eqeqeq: ["error", "always", { null: "ignore" }],
      "import/no-cycle": [2, { maxDepth: 1 }],
      "no-extra-boolean-cast": "off",
      "no-case-declarations": "off",
      "prettier/prettier": ["error", { trailingComma: "none" }]
    }
  }
];
