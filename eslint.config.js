import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        React: "readonly",
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        fetch: "readonly",
        URL: "readonly",
        process: "readonly",
        performance: "readonly",
        requestAnimationFrame: "readonly",
        HTMLDivElement: "readonly",
        SVGSVGElement: "readonly",
        HTMLFormElement: "readonly",
        FormData: "readonly",
        alert: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        Node: "readonly",
        HTMLElement: "readonly",
        // Node.js / Next.js server globals
        Buffer: "readonly",
        Request: "readonly",
        Response: "readonly",
        Headers: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];