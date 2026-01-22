// esbuild.dev.mjs
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import liveServer from "live-server";

const distDir = path.resolve("dist");

// Copy public files
function copyPublic() {
	if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
	for (const file of fs.readdirSync("public")) {
		fs.copyFileSync(path.resolve("public", file), path.resolve(distDir, file));
	}
}

copyPublic();

// === 1️⃣ Build UI with context + watch ===
const uiContext = await esbuild.context({
	entryPoints: ["src/index.tsx"],
	bundle: true,
	outfile: "dist/index.js",
	sourcemap: true,
	target: ["chrome100"],
	loader: { ".ts": "ts", ".tsx": "tsx", ".css": "css" },
});

await uiContext.watch();
console.log("UI build started in watch mode ✅");

// === 2️⃣ Build background once ===
await esbuild.build({
	entryPoints: ["src/background/background.ts"],
	bundle: true,
	outfile: "dist/background.js",
	minify: false,
	sourcemap: true,
	target: ["chrome100"],
	format: "iife", // 🔴 Required for MV3 service worker
	splitting: false,
	loader: { ".ts": "ts" },
});
console.log("Background built ✅");

// === 3️⃣ Start live-server ===
liveServer.start({
	root: distDir,
	open: false,
	wait: 100,
	logLevel: 2,
});
