// vite.config.ts
import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "file:///Users/guoshaowei/Desktop/code/electron-vite-react/node_modules/.pnpm/vite@5.0.12/node_modules/vite/dist/node/index.js";
import react from "file:///Users/guoshaowei/Desktop/code/electron-vite-react/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.0.12/node_modules/@vitejs/plugin-react/dist/index.mjs";
import electron from "file:///Users/guoshaowei/Desktop/code/electron-vite-react/node_modules/.pnpm/vite-plugin-electron@0.28.0_electron@28.1.4_vite-plugin-electron-renderer@0.14.5/node_modules/vite-plugin-electron/dist/simple.mjs";

// package.json
var package_default = {
  name: "electron-vite-react",
  version: "2.2.0",
  main: "dist-electron/main/index.js",
  description: "Electron Vite React boilerplate.",
  author: "\u8349\u978B\u6CA1\u53F7 <308487730@qq.com>",
  license: "MIT",
  private: true,
  debug: {
    env: {
      VITE_DEV_SERVER_URL: "http://127.0.0.1:7777/"
    }
  },
  type: "module",
  scripts: {
    "dev:web": "vite --mode web",
    dev: "vite",
    build: "tsc && vite build && electron-builder",
    preview: "vite preview",
    pree2e: "vite build --mode=test",
    e2e: "playwright test"
  },
  dependencies: {
    "@ant-design/icons": "^5.2.6",
    "@ant-design/pro-components": "^2.6.48",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@unocss/reset": "^0.58.4",
    ahooks: "^3.7.8",
    antd: "^5.13.2",
    axios: "^1.6.5",
    chokidar: "^3.5.3",
    dayjs: "^1.11.10",
    "electron-updater": "^6.1.1",
    "fs-extra": "^11.2.0",
    immer: "^10.0.3",
    "react-json-view": "^1.21.3",
    shelljs: "^0.8.5"
  },
  devDependencies: {
    "@playwright/test": "^1.37.1",
    "@types/react": "^18.2.20",
    "@types/react-dom": "^18.2.7",
    "@types/shelljs": "^0.8.15",
    "@vitejs/plugin-react": "^4.0.4",
    electron: "28.1.4",
    "electron-builder": "^24.6.3",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    tailwindcss: "^3.3.3",
    typescript: "^5.1.6",
    unocss: "^0.58.3",
    vite: "^5.0.10",
    "vite-plugin-electron": "^0.28.0",
    "vite-plugin-electron-renderer": "^0.14.5"
  }
};

// vite.config.ts
import Unocss from "file:///Users/guoshaowei/Desktop/code/electron-vite-react/node_modules/.pnpm/unocss@0.58.4_postcss@8.4.33_vite@5.0.12/node_modules/unocss/dist/vite.mjs";
import { presetAttributify, presetUno } from "file:///Users/guoshaowei/Desktop/code/electron-vite-react/node_modules/.pnpm/unocss@0.58.4_postcss@8.4.33_vite@5.0.12/node_modules/unocss/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/guoshaowei/Desktop/code/electron-vite-react";
var vite_config_default = defineConfig(({ command, mode }) => {
  rmSync("dist-electron", { recursive: true, force: true });
  const isWeb = mode === "web";
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return {
    resolve: {
      alias: {
        "@": path.join(__vite_injected_original_dirname, "src"),
        "@constants": path.join(__vite_injected_original_dirname, "constants")
      }
    },
    plugins: [
      react(),
      Unocss({
        presets: [presetAttributify({}), presetUno()]
      }),
      isWeb ? null : electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: "electron/main/index.ts",
          onstart(args) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */
                "[startup] Electron App"
              );
            } else {
              args.startup();
            }
          },
          vite: {
            resolve: {
              alias: {
                "@constants": path.join(__vite_injected_original_dirname, "constants")
              }
            },
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            }
          }
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : void 0,
              // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            }
          }
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {}
      })
    ],
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(package_default.debug.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port
      };
    })(),
    clearScreen: false
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2d1b3NoYW93ZWkvRGVza3RvcC9jb2RlL2VsZWN0cm9uLXZpdGUtcmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9ndW9zaGFvd2VpL0Rlc2t0b3AvY29kZS9lbGVjdHJvbi12aXRlLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9ndW9zaGFvd2VpL0Rlc2t0b3AvY29kZS9lbGVjdHJvbi12aXRlLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcm1TeW5jIH0gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGVsZWN0cm9uIGZyb20gJ3ZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZSc7XG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJztcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnO1xuaW1wb3J0IHsgcHJlc2V0QXR0cmlidXRpZnksIHByZXNldFVubyB9IGZyb20gJ3Vub2Nzcyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIHJtU3luYygnZGlzdC1lbGVjdHJvbicsIHsgcmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZSB9KTtcbiAgY29uc3QgaXNXZWIgPSBtb2RlID09PSAnd2ViJztcbiAgY29uc3QgaXNTZXJ2ZSA9IGNvbW1hbmQgPT09ICdzZXJ2ZSc7XG4gIGNvbnN0IGlzQnVpbGQgPSBjb21tYW5kID09PSAnYnVpbGQnO1xuICBjb25zdCBzb3VyY2VtYXAgPSBpc1NlcnZlIHx8ICEhcHJvY2Vzcy5lbnYuVlNDT0RFX0RFQlVHO1xuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgICdAY29uc3RhbnRzJzogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2NvbnN0YW50cycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHJlYWN0KCksXG4gICAgICBVbm9jc3Moe1xuICAgICAgICBwcmVzZXRzOiBbcHJlc2V0QXR0cmlidXRpZnkoe30pLCBwcmVzZXRVbm8oKV0sXG4gICAgICB9KSxcbiAgICAgIGlzV2ViXG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IGVsZWN0cm9uKHtcbiAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgLy8gU2hvcnRjdXQgb2YgYGJ1aWxkLmxpYi5lbnRyeWBcbiAgICAgICAgICAgICAgZW50cnk6ICdlbGVjdHJvbi9tYWluL2luZGV4LnRzJyxcbiAgICAgICAgICAgICAgb25zdGFydChhcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LlZTQ09ERV9ERUJVRykge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coLyogRm9yIGAudnNjb2RlLy5kZWJ1Zy5zY3JpcHQubWpzYCAqLyAnW3N0YXJ0dXBdIEVsZWN0cm9uIEFwcCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhcmdzLnN0YXJ0dXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZpdGU6IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgICAgICAnQGNvbnN0YW50cyc6IHBhdGguam9pbihfX2Rpcm5hbWUsICdjb25zdGFudHMnKSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgICAgICAgc291cmNlbWFwLFxuICAgICAgICAgICAgICAgICAgbWluaWZ5OiBpc0J1aWxkLFxuICAgICAgICAgICAgICAgICAgb3V0RGlyOiAnZGlzdC1lbGVjdHJvbi9tYWluJyxcbiAgICAgICAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKCdkZXBlbmRlbmNpZXMnIGluIHBrZyA/IHBrZy5kZXBlbmRlbmNpZXMgOiB7fSksXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJlbG9hZDoge1xuICAgICAgICAgICAgICAvLyBTaG9ydGN1dCBvZiBgYnVpbGQucm9sbHVwT3B0aW9ucy5pbnB1dGAuXG4gICAgICAgICAgICAgIC8vIFByZWxvYWQgc2NyaXB0cyBtYXkgY29udGFpbiBXZWIgYXNzZXRzLCBzbyB1c2UgdGhlIGBidWlsZC5yb2xsdXBPcHRpb25zLmlucHV0YCBpbnN0ZWFkIGBidWlsZC5saWIuZW50cnlgLlxuICAgICAgICAgICAgICBpbnB1dDogJ2VsZWN0cm9uL3ByZWxvYWQvaW5kZXgudHMnLFxuICAgICAgICAgICAgICB2aXRlOiB7XG4gICAgICAgICAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZW1hcDogc291cmNlbWFwID8gJ2lubGluZScgOiB1bmRlZmluZWQsIC8vICMzMzJcbiAgICAgICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcbiAgICAgICAgICAgICAgICAgIG91dERpcjogJ2Rpc3QtZWxlY3Ryb24vcHJlbG9hZCcsXG4gICAgICAgICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cygnZGVwZW5kZW5jaWVzJyBpbiBwa2cgPyBwa2cuZGVwZW5kZW5jaWVzIDoge30pLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFBsb3lmaWxsIHRoZSBFbGVjdHJvbiBhbmQgTm9kZS5qcyBBUEkgZm9yIFJlbmRlcmVyIHByb2Nlc3MuXG4gICAgICAgICAgICAvLyBJZiB5b3Ugd2FudCB1c2UgTm9kZS5qcyBpbiBSZW5kZXJlciBwcm9jZXNzLCB0aGUgYG5vZGVJbnRlZ3JhdGlvbmAgbmVlZHMgdG8gYmUgZW5hYmxlZCBpbiB0aGUgTWFpbiBwcm9jZXNzLlxuICAgICAgICAgICAgLy8gU2VlIFx1RDgzRFx1REM0OSBodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24tdml0ZS92aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlclxuICAgICAgICAgICAgcmVuZGVyZXI6IHt9LFxuICAgICAgICAgIH0pLFxuICAgIF0sXG4gICAgc2VydmVyOlxuICAgICAgcHJvY2Vzcy5lbnYuVlNDT0RFX0RFQlVHICYmXG4gICAgICAoKCkgPT4ge1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBrZy5kZWJ1Zy5lbnYuVklURV9ERVZfU0VSVkVSX1VSTCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaG9zdDogdXJsLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6ICt1cmwucG9ydCxcbiAgICAgICAgfTtcbiAgICAgIH0pKCksXG4gICAgY2xlYXJTY3JlZW46IGZhbHNlLFxuICB9O1xufSk7XG4iLCAie1xuICBcIm5hbWVcIjogXCJlbGVjdHJvbi12aXRlLXJlYWN0XCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QtZWxlY3Ryb24vbWFpbi9pbmRleC5qc1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiRWxlY3Ryb24gVml0ZSBSZWFjdCBib2lsZXJwbGF0ZS5cIixcbiAgXCJhdXRob3JcIjogXCJcdTgzNDlcdTk3OEJcdTZDQTFcdTUzRjcgPDMwODQ4NzczMEBxcS5jb20+XCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJkZWJ1Z1wiOiB7XG4gICAgXCJlbnZcIjoge1xuICAgICAgXCJWSVRFX0RFVl9TRVJWRVJfVVJMXCI6IFwiaHR0cDovLzEyNy4wLjAuMTo3Nzc3L1wiXG4gICAgfVxuICB9LFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldjp3ZWJcIjogXCJ2aXRlIC0tbW9kZSB3ZWJcIixcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGQgJiYgZWxlY3Ryb24tYnVpbGRlclwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwicHJlZTJlXCI6IFwidml0ZSBidWlsZCAtLW1vZGU9dGVzdFwiLFxuICAgIFwiZTJlXCI6IFwicGxheXdyaWdodCB0ZXN0XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGFudC1kZXNpZ24vaWNvbnNcIjogXCJeNS4yLjZcIixcbiAgICBcIkBhbnQtZGVzaWduL3Byby1jb21wb25lbnRzXCI6IFwiXjIuNi40OFwiLFxuICAgIFwiQGRuZC1raXQvY29yZVwiOiBcIl42LjEuMFwiLFxuICAgIFwiQGRuZC1raXQvc29ydGFibGVcIjogXCJeOC4wLjBcIixcbiAgICBcIkB1bm9jc3MvcmVzZXRcIjogXCJeMC41OC40XCIsXG4gICAgXCJhaG9va3NcIjogXCJeMy43LjhcIixcbiAgICBcImFudGRcIjogXCJeNS4xMy4yXCIsXG4gICAgXCJheGlvc1wiOiBcIl4xLjYuNVwiLFxuICAgIFwiY2hva2lkYXJcIjogXCJeMy41LjNcIixcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuMTBcIixcbiAgICBcImVsZWN0cm9uLXVwZGF0ZXJcIjogXCJeNi4xLjFcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjIuMFwiLFxuICAgIFwiaW1tZXJcIjogXCJeMTAuMC4zXCIsXG4gICAgXCJyZWFjdC1qc29uLXZpZXdcIjogXCJeMS4yMS4zXCIsXG4gICAgXCJzaGVsbGpzXCI6IFwiXjAuOC41XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHBsYXl3cmlnaHQvdGVzdFwiOiBcIl4xLjM3LjFcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjIwXCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuN1wiLFxuICAgIFwiQHR5cGVzL3NoZWxsanNcIjogXCJeMC44LjE1XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjAuNFwiLFxuICAgIFwiZWxlY3Ryb25cIjogXCIyOC4xLjRcIixcbiAgICBcImVsZWN0cm9uLWJ1aWxkZXJcIjogXCJeMjQuNi4zXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMy4zXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMS42XCIsXG4gICAgXCJ1bm9jc3NcIjogXCJeMC41OC4zXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMC4xMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZWxlY3Ryb25cIjogXCJeMC4yOC4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlclwiOiBc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
