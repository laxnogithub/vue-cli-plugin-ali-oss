/*
 * @Description:
 * tinypng: https://tinypng.com/developers/reference/nodejs
 * webpack: https://webpack.js.org/api/compilation-object/#getassets
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-09-14 16:58:38
 * @LastEditors: lax
 * @LastEditTime: 2021-01-03 14:00:51
 */
const options = require("./options.js");
const path = require("path");
const Oss = require("ali-oss");
let client;
const Chalk = require("chalk");
const consola = require("consola");
const log = consola.log;
const { RawSource } = require("webpack-sources");

const DEFAULT_REG = /[\s\S]*/;
class AliOss {
	constructor(p = {}) {
		this.p = p;
		// img:png/jpg/jpeg/bmp/gif
		this.REG = p.reg || DEFAULT_REG;
		this.use = p.use !== undefined ? p.use : true;
		this.name = "TaoAliOssPlugin";
	}
	apply(compiler) {
		// options.use = false
		if (!this.use) return;
		// can`t find options or something error
		try {
			this._init(compiler);
		} catch (error) {
			consola.error(error);
			return;
		}
		compiler.hooks.afterEmit.tapAsync(this.name, (compilation, callback) => {
			// get all assets
			const assets = compilation.getAssets();
			// img list by reg
			const imgs = assets.filter((asset) => this.REG.test(asset.name));
			// skip it when can`t find assets
			if (!imgs.length) callback();
			// img promise
			const promises = imgs.map(async (img) => {
				// compressed by tinypng
				await this.oss(img);
				// update asset in webpack
				return Promise.resolve();
			});
			return Promise.all(promises).then(() => {
				this._end();
				callback();
			});
		});
	}
	async oss(asset) {
		try {
			if (await this.checkFileExist(asset.name))
				await this.deleteFile(asset.name);
			console.log(asset);
			const result = await client.put(asset.name, asset.path);
		} catch (error) {}
	}
	async checkFileExist(name) {
		try {
			await client.head(name);
			return true;
		} catch (error) {
			if (error.code === "NoSuchKey") {
				return false;
			}
		}
	}
	async deleteFile(name) {
		try {
			let result = await client.delete(name);
			return true;
		} catch (error) {
			return false;
		}
	}
	_getOptions(comp) {
		const op = Object.assign(
			{},
			options,
			this.p,
			this._getOptionsFromFile(comp)
		);
		this.options = op;
		return op;
	}
	_getOptionsFromFile(comp) {
		let options = null;
		try {
			options = require(path.join(comp.context, "./oss.js"));
		} catch (error) {
			log("");
			log(Chalk.redBright("############################################"));
			log(Chalk.redBright("can`t find options in oss.js"));
			log(Chalk.redBright("skip this plugin..."));
			log(Chalk.redBright("############################################"));
			throw error;
		}
		return options;
	}
	_generateClient() {
		try {
			client = new Oss(this.options);
		} catch (error) {
			log("");
			log(Chalk.redBright("############################################"));
			log(Chalk.redBright("can`t generate oss client"));
			log(Chalk.redBright("skip this plugin..."));
			log(Chalk.redBright("############################################"));
			throw error;
		}
	}
	_init(c) {
		this._getOptions(c);
		this._generateClient();
		log("");
		log(Chalk.greenBright("##############################################"));
		log(Chalk.greenBright("######### ali-oss-plugin start... ##########"));
		log(Chalk.greenBright("##############################################"));
		return true;
	}
	_end() {
		log("");
		log(Chalk.greenBright("##############################################"));
		log(Chalk.greenBright("## success: all imgs compressed by tinypng! ##"));
		log(Chalk.greenBright("##############################################"));
		log(Chalk.greenBright("* this key compressd count:" + this.getTinyCount()));
	}
	_each(name, is) {
		log("");
		if (is) log(Chalk.greenBright("* filename: " + name + " compressed!"));
		if (!is) log(Chalk.redBright("* filename: " + name + " not compressed!"));
	}
}
module.exports = AliOss;
