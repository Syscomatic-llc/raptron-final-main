import { defineConfig, loadEnv } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ mode }) => {
  // Server-side env load — vars without the VITE_ prefix are intentionally
  // excluded from the browser bundle. ODOO_API_KEY is read here and injected
  // by the proxy, so it never reaches the client.
  const env = loadEnv(mode, process.cwd(), "");

  const odooApiKey = env.ODOO_API_KEY ?? "";
  const odooBaseUrl = env.ODOO_BASE_URL ?? "https://hq.syscomatic.com";

  return {
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      viteReact(),
    ],
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/odoo-api": {
          target: `${odooBaseUrl}/json/2`,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/odoo-api/, ""),
          headers: { Authorization: `Bearer ${odooApiKey}` },
        },
      },
    },
  };
});
