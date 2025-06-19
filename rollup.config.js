import ts from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
//nodejs在esm模式下获取当前文件路径
//‌在ES模块（ESM）中获取当前文件的绝对路径可以通过import.meta.url和fileURLToPath函数实现。
const __filename = fileURLToPath(import.meta.url); //当前文件的绝对路径
//首先，import.meta.url返回当前模块的URL，格式为file:///协议开头。
// 例如，如果当前模块的路径是file:///C:/path/to/file.js，则import.meta.url会返回这个完整的URL。
// 接下来，可以使用Node.js的url模块中的fileURLToPath函数将这个URL转换为文件系统路径。
const __dirname = dirname(__filename);

export default {
  input: resolve(__dirname, "src/index.ts"),
  output: {
    format: "iife",
    file: resolve(__dirname, "dist/bundle.js"),
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts"],
    }),
    ts({
      tsconfig: resolve(__dirname, "tsconfig.json"),
    }),
    serve({
      port: 3000,
      openPage: "/public/index.html",
      open: true,
    }),
  ],
};
