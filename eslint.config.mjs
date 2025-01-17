import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // 或者 "warn" 如果仅希望警告
      '@typescript-eslint/no-explicit-any': 'off', // 禁用这个规则
    },
    ignores: ["node_modules", "app",], // 忽略的文件夹
  },
];

export default eslintConfig;
