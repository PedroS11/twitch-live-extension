import fs from "fs";

const target = process.env.BROWSER; // chrome or firefox

const base = JSON.parse(
	fs.readFileSync("./scripts/manifest/manifest.base.json"),
);
const browser = JSON.parse(
	fs.readFileSync(`./scripts/manifest/manifest.${target}.json`),
);

const manifest = { ...base, ...browser };

fs.writeFileSync("dist/manifest.json", JSON.stringify(manifest, null, 2));
