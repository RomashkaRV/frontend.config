import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import importHelpers from "eslint-plugin-import-helpers";
import unusedImports from "eslint-plugin-unused-imports";
import stylistic from "@stylistic/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const generatePathGroup = (name) => {
  return [`/^${name}/`, `/.\\_${name}/`, `/.\\/${name}/`];
};

export default [
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["./next/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: ["tsconfig.json"],
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescriptEslint,
      prettier,
      import: importPlugin,
      "import-helpers": importHelpers,
      "unused-imports": unusedImports,
      "@stylistic": stylistic,
    },
    settings: {
      react: {
        version: "19.1.0",
      },
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
          project: ["tsconfig.json"],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      "unused-imports/no-unused-imports": "error",
      "react-hooks/rules-of-hooks": "error",
      "react/jsx-tag-spacing": ["error"],
      "no-extra-boolean-cast": "off",
      quotes: ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@typescript-eslint/ban-ts-comment": "warn",
      "object-curly-spacing": ["error", "always"],
      "no-case-declarations": "off",
      "no-trailing-spaces": ["error", { skipBlankLines: true }],
      "@typescript-eslint/no-empty-function": "off",
      "react/react-in-jsx-scope": "off",
      "comma-dangle": ["error", "never"],
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/no-unescaped-entities": "off",
      "linebreak-style": ["error", "unix"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "react-hooks/exhaustive-deps": "off",
      "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
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
              "types",
            ].reduce((acc, name) => acc.concat(generatePathGroup(name)), []),
            "parent",
            "sibling",
            "index",
          ],
          alphabetize: { order: "asc", ignoreCase: true },
        },
      ],
      "eol-last": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "react/jsx-newline": "error",
      "prettier/prettier": ["error", { trailingComma: "none" }],
      "import/no-cycle": [2, { maxDepth: 1 }],
    },
  },
];
