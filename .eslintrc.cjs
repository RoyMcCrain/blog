/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2023: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  plugins: ["import-access"],
  rules: {
    // 使ってない変数を残さない（_varsはチェックしない）
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }
    ],
    // import type を使うルール
    "@typescript-eslint/consistent-type-imports": ["error"],
    "@typescript-eslint/naming-convention": [
      "error",
      // camelCaseかUPPER_CASEの強制
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      // TypeはPascalCase
      {
        selector: "typeAlias",
        format: ["PascalCase"],
      },
      // // ClassはPascalCase
      {
        selector: "class",
        format: ["PascalCase"],
      },
      // // booleanの変数はprefixをつける
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase", "UPPER_CASE"],
        prefix: [
          "is",
          "should",
          "has",
          "can",
          "did",
          "will",
          "IS_",
          "SHOULD_",
          "HAS_",
          "CAN_",
          "DID_",
          "WILL_",
          "__esModule",
          "_",
        ],
      },
    ],
    // 厳密等価演算子を強制
    eqeqeq: "error",
    // caseのdefaultを必ずつける
    "default-case": "error",
    // import-accessのルール
    "import-access/jsdoc": ["error"],
  }
};
