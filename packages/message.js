/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-01-03 17:17:28
 * @LastEditors: lax
 * @LastEditTime: 2021-01-03 17:24:44
 * @FilePath: \vue-cli-plugin-ali-oss\packages\message.js
 */
const Chalk = require("chalk");
const consola = require("consola");
const log = consola.log;
module.exports = {
	START_MSG() {
		log("");
		log(Chalk.greenBright("##############################################"));
		log(Chalk.greenBright("########## ali-oss-plugin start... ###########"));
		log(Chalk.greenBright("##############################################"));
	},
	END_MSG() {
		log("");
		log(Chalk.greenBright("##############################################"));
		log(Chalk.greenBright("######### success: upload oss over ! #########"));
		log(Chalk.greenBright("##############################################"));
	},
	EACH_MSG(name, is) {
		log("");
		if (is) log(Chalk.greenBright("* filename: " + name + " upload!"));
		if (!is) log(Chalk.redBright("* filename: " + name + " not upload!"));
	},
	FILE_ERROR_MSG() {
		log("");
		log(Chalk.redBright("############################################"));
		log(Chalk.redBright("can`t find options in oss.js"));
		log(Chalk.redBright("skip this plugin..."));
		log(Chalk.redBright("############################################"));
	},
	CLIENT_ERROR_MSG() {
		log("");
		log(Chalk.redBright("############################################"));
		log(Chalk.redBright("can`t generate oss client"));
		log(Chalk.redBright("skip this plugin..."));
		log(Chalk.redBright("############################################"));
	},
};
