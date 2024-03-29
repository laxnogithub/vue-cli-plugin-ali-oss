/*
 * @Description: auto upload oss
 * webpack: https://webpack.js.org/api/compilation-object/
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-09-14 16:58:38
 * @LastEditors: lax
 * @LastEditTime: 2022-06-05 11:42:17
 */
const path = require("path");
const consola = require("consola");
const options = require(path.join(__dirname, "./options.js"));
const PLUGIN_NAME = "aliOssPlugin";
const Oss = require("ali-oss");
const { RawSource } = require("webpack-sources");
let client;
const MSG = require(path.join(__dirname, "./message.js"));
const getPrefix = require(path.join(__dirname, "./getPrefix"));

const DEFAULT_REG = /\.(png|jpe?g|bmp|gif|mp4|webm|mp3|js|css|json|ico|txt)/;
class AliOss {
	constructor(p = {}) {
		this.p = p;
		// reduce assets type
		this.REG = p.reg || DEFAULT_REG;
		// this plugin can be run
		this.use = p.use !== undefined ? p.use : true;
		// ali oss config
		this.config = p.config || {};
		//  plugin name
		this.name = PLUGIN_NAME;
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
			const assets = this.getAssets(compilation);
			// skip it when can`t find assets
			if (!assets.length) callback();

			// img promise
			const promises = assets.map(async (asset) => {
				// upload oss
				await this.oss(asset);
				return Promise.resolve();
			});
			return Promise.all(promises).then(() => {
				this._end();
				callback();
			});
		});
	}
	async oss(asset) {
		const { fullName } = this.getName(asset.name);
		try {
			await client.put(fullName, Buffer.from(asset.source.source()));
			MSG.EACH_MSG(asset.name, true);
		} catch (error) {
			MSG.EACH_MSG(asset.name, false);
		}
	}
	getAssets(compilation) {
		// get all assets
		const _assets = compilation.getAssets();
		// img list by reg
		const assets = _assets.filter(
			(asset) =>
				this.REG.test(asset.name) &&
				(asset.source instanceof RawSource
					? asset.source._value !== undefined
					: true)
		);
		return assets;
	}
	_getPackage(comp) {
		const json = require(path.join(comp.context, "./package.json"));
		this.json = json;
	}
	_getOptions(comp) {
		const op = Object.assign(
			{},
			// default options
			options,
			// new (options)
			this.p.config,
			// file options
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
			MSG.FILE_ERROR_MSG();
			// throw error;
		}
		return options;
	}
	_generateClient() {
		try {
			client = new Oss(this.options);
		} catch (error) {
			MSG.CLIENT_ERROR_MSG();
			throw error;
		}
	}
	_init(c) {
		this._getPackage(c);
		this._getOptions(c);
		this._generateClient();
		MSG.START_MSG();
		return true;
	}
	_end() {
		MSG.END_MSG();
	}
	getName(name) {
		// clean ? #
		const base = name.split("?")[0].split("#")[0];
		const nameList = base.split("/");
		// file name
		const fname = nameList[nameList.length - 1];
		// file path
		const path = base.split(fname)[0];
		// prefix
		let prefix = this.options.prefix;
		prefix = prefix && prefix !== "" ? prefix + "/" : "";
		// projectPath
		const projectPath = this.options.projectName ? this.json.name : "";
		// full path
		return {
			path: prefix + projectPath + "/" + path,
			name: fname,
			fullName: prefix + projectPath + "/" + path + fname,
		};
	}
}

AliOss.getPrefix = getPrefix;
module.exports = AliOss;
