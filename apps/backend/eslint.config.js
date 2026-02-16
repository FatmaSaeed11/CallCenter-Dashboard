import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node, // ✅ THIS is the important fix
      sourceType: "module"
    },
    rules: {
      "no-redeclare": "error",   // catches duplicate functions
      "no-unused-vars": "warn",
      "no-duplicate-imports": "error"
    }
  }
]);
