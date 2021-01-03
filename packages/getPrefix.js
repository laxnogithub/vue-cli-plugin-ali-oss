/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-01-03 18:59:28
 * @LastEditors: lax
 * @LastEditTime: 2021-01-03 18:59:48
 * @FilePath: \vue-cli-plugin-ali-oss\packages\getPrefix.js
 */
function getPrefix(op, pro) {
	const http = "http" + (op.secure && op.secure == false ? "" : "s") + "://";
	const bucket = op.bucket;
	const region = op.region ? op.region : "oss-cn-hangzhou";
	const prefix = op.prefix && op.prefix !== "" ? op.prefix + "/" : "";
	const proName = op.projectName ? pro : "";
	const diy = http + bucket + "." + region + ".aliyuncs.com/";
	const path = op.endpoint ? op.endpoint : diy;
	const fullPath = path + prefix + proName;
	return fullPath;
}
module.exports = getPrefix;
