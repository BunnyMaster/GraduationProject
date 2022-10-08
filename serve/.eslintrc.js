module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["prettier/@typescript-eslint", "plugin:prettier/recommended"],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint/eslint-plugin",
    "prettier", // 这一项为增加项
  ],
  env: {
    browser: true,
    node: true,
  },
};