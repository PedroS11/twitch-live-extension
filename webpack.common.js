const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	devtool: "cheap-module-source-map",
	entry: {
		index: path.resolve("src/index.tsx"),
		background: path.resolve("src/background/background.ts"),
	},
	module: {
		rules: [
			{
				use: "ts-loader",
				test: /\.tsx?$/,
				exclude: /node_modules/,
			},
			{
				use: ["style-loader", "css-loader"],
				test: /\.css$/i,
			},
			{
				type: "asset/resource",
				test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
			},
		],
	},
	plugins: [
		// Clean dev files from dist folder when you run 'yarn build' after using 'yarn start' while developing
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve("public"),
					to: path.resolve("dist"),
				},
			],
		}),
		new HtmlPlugin({
			title: "Twitch Live Extension",
			filename: "index.html",
			chunks: ["index"],
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].js",
		path: path.resolve("dist"),
	},
};
