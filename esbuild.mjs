// build.mjs
import esbuild from "esbuild";
import fs from "fs";
import path from "path";

// Clean dist folder
const distDir = path.resolve("dist");
if (fs.existsSync(distDir)) {
	fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

// Copy public files
for (const file of fs.readdirSync("public")) {
	fs.copyFileSync(`public/${file}`, `dist/${file}`);
}

// Build UI
await esbuild.build({
	entryPoints: ["src/index.tsx"],
	bundle: true,
	outfile: "dist/index.js",
	minify: true,
	sourcemap: true,
	target: ["chrome100"],
	loader: { ".ts": "ts", ".tsx": "tsx", ".css": "css" },
});

// Build background
await esbuild.build({
	entryPoints: ["src/background/background.ts"],
	bundle: true,
	outfile: "dist/background.js",
	minify: true,
	sourcemap: true,
	target: ["chrome100"],
	format: "iife",
	splitting: false,
	loader: { ".ts": "ts" },
});
