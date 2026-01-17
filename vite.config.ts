import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copyFileSync, mkdirSync, existsSync } from "fs";

// Plugin to copy static files (manifest.json, icon.png)
const copyStaticFiles = () => ({
	name: "copy-static-files",
	closeBundle() {
		const distDir = resolve(__dirname, "dist");
		if (!existsSync(distDir)) {
			mkdirSync(distDir, { recursive: true });
		}
		copyFileSync(
			resolve(__dirname, "src/public/manifest.json"),
			resolve(distDir, "manifest.json"),
		);
		copyFileSync(
			resolve(__dirname, "src/public/icon.png"),
			resolve(distDir, "icon.png"),
		);
	},
});

export default defineConfig({
	plugins: [react(), copyStaticFiles()],
	build: {
		outDir: "dist",
		emptyOutDir: true,
		sourcemap: process.env.NODE_ENV === "development" ? "inline" : false,
		rollupOptions: {
			input: {
				index: resolve(__dirname, "index.html"),
				background: resolve(__dirname, "src/background/background.ts"),
			},
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: "[name].js",
				assetFileNames: "[name].[ext]",
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});

