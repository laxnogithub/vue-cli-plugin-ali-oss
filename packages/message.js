/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-01-03 17:17:28
 * @LastEditors: lax
 * @LastEditTime: 2022-06-05 11:44:20
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
		log(Chalk.yellowBright("############################################"));
		log(Chalk.yellowBright("can`t find options or oss.js not exist, skip.."));
		log(Chalk.yellowBright("############################################"));
	},
	CLIENT_ERROR_MSG() {
		log("");
		log(Chalk.redBright("############################################"));
		log(Chalk.redBright("can`t generate oss client"));
		log(Chalk.redBright("skip this plugin..."));
		log(Chalk.redBright("############################################"));
	},
};
