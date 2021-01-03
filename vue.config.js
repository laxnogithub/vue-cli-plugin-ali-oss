/*
 * @Description: vue.config.js
 * @Version: 2.0.0
 * @Author: lax
 * @Date: 2020-04-01 12:54:53
 * @LastEditors: lax
 * @LastEditTime: 2021-01-03 18:32:15
 */
const aliOssPlugin = require("./packages/index.js");
const json = require("./package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
	/* ##################################
	 * js css version like: xx.js?v=xxxxx
	 * ##################################
	 */
	configureWebpack: (config) => {
		const pro = config.mode === "production";
		config.devtool = "source-map";
		// plugin
		const plugins = [
			new MiniCssExtractPlugin({
				filename: `css/[name].css?v=[hash:6]`,
				chunkFilename: `css/[name].css?v=[hash:6]`,
			}),
		];
		// output
		const output = {
			filename: "js/[name].js?v=[hash:6]",
			chunkFilename: "js/[name].js?v=[hash:6]",
		};
		if (pro) plugins.push(new aliOssPlugin());

		return { output, plugins };
	},
	/* 设置build的引用文件路径 */

	publicPath: "./",
	/* 生产环境sourcemap 清除 */
	productionSourceMap: false,
	/* 取消文件名hash值 */
	filenameHashing: false,
	/**
	 * 自定义file-loader
	 * html图片访问格式调整：[name].[ext]?v=[hash:6]
	 * like: content.png?v=s2421a
	 */
	chainWebpack: (config) => {
		const pro = config.store.get("mode") === "production";
		// config.module
		// 	.rule("js")
		// 	.include.add("/packages/")
		// 	.end()
		// 	.use("babel")
		// 	.loader("babel-loader");
		config.module
			.rule("images")
			.use("url-loader")
			.loader("file-loader")
			.options({
				publicPath: pro
					? aliOssPlugin.getPrefix(require("./oss.js"), json.name)
					: "./",
				name: "[folder]/[name].[ext]?v=[hash:6]",
			});
		const mediaRule = config.module.rule("media");
		mediaRule.uses.clear();
		mediaRule
			.use("url-loader")
			.loader("file-loader")
			.options({
				publicPath: pro
					? aliOssPlugin.getPrefix(require("./oss.js"), json.name)
					: "./",
				name: "[folder]/[name].[ext]?v=[hash:6]",
				useRelativePath: true,
			});
		/* ##################################
		 * @ use pro core @ex use to test
		 * ##################################
		 */
		config.resolve.alias
			.set("@", path.join(__dirname, "./packages"))
			.set("@ex", path.join(__dirname, "./src"));
	},
};
