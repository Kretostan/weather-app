import * as path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const backendTarget = env.VITE_API_URL ?? "http://backend:3001";

	return {
		plugins: [react(), tailwindcss()],
		server: {
			host: true,
			port: 5173,
			proxy: {
				"/api": {
					target: backendTarget,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api\/weather/, ""),
				},
			},
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
