import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command, mode }) => {
  // Inject VITE_* env variables as define constants
  const envDefine: Record<string, string> = {};
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  // Determine Nitro deploy preset
  const isVercel = !!process.env.VERCEL;
  const nitroPreset = isVercel ? "vercel" : "cloudflare-module";

  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ];

  // Add Nitro deploy plugin for production builds
  if (command === "build") {
    const nitroOptions: Record<string, unknown> = {
      preset: nitroPreset,
      output: {
        dir: "dist",
        serverDir: "dist/server",
        publicDir: "dist/client",
      },
    };

    if (nitroPreset === "cloudflare-module") {
      nitroOptions.cloudflare = { nodeCompat: true, deployConfig: true };
    }

    plugins.push(nitro(nitroOptions));
  }

  return {
    define: envDefine,
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins,
    server: {
      host: "::",
      port: 8081,
      strictPort: true,
    },
  };
});
