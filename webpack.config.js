const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const cssRules = {
	test: /\.css$/,
	use: ["style-loader", "css-loader"],
};
const jsRules = {
	test: /\.js$/,
	exclude: /node_modules/,
	use: {
		loader: "babel-loader",
		options: {
			presets: [
				[
					"@babel/preset-react",
					{
						runtime: "automatic",
					},
				],
			],
		},
	},
};

const rules = [jsRules, cssRules];

module.exports = (env, argv) => {
	const { mode } = argv;
	const isProduction = mode === "production";

	return {
		entry: path.resolve(__dirname, "src/index.js"),
		output: {
			path: path.resolve(__dirname, "dist"),
			publicPath: "/",
			filename: isProduction ? "[name].[contenthash].js" : "bundle.js",
			clean: true,
		},
		module: { rules },
		target: "web",
		devServer: {
			port: 3000,
			static: "./dist",
			open: true,
			hot: true,
			compress: true,
		},
		devtool: "source-map",
		plugins: [
			new htmlWebpackPlugin({
				template: "./public/index.html",
			}),
		],
	};
};
