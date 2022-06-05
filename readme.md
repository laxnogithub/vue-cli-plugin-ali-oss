<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-09-16 11:51:36
 * @LastEditors: lax
 * @LastEditTime: 2022-06-05 11:50:22
-->
# 简介
* 实现web项目打包后自动上传阿里云oss
* 搭配自动tinypng图片压缩插件[vue-tinypng-plugin](https://www.npmjs.com/package/vue-tinypng-plugin)效果更佳
# 使用说明

## 配置

1.创建 oss.js（优先级最高）

路径: {你的项目目录下}/oss.js

oss.js:
```
module.exports = {
	accessKeyId: "xxx",
	accessKeySecret: "xxx",
	bucket: "bucket",
	prefix: "prefix",
	projectName: true,
};
```

2.或者在插件初始化写入配置（优先级中）
* 注意!!! 1.0.3版本之后需要包含在config里
```
new tinypngPlugin({
	config:{
		accessKeyId: "xxx",
		accessKeySecret: "xxx",
		bucket: "bucket",
		prefix: "prefix",
		projectName: true,
	}
})
```

## 引入
``` 
configureWebpack: (config) => {
    return {
        plugins: [
            new aliOssPlugin()
        ]
    }
}
```
# 路径顺序
```
https://${bucket}.${region}.aliyuncs.com/${prefix}/${projectName}/XXXX
```

# 配置属性

## accessKeyId
阿里云accessKeyId
``` 
accessKeyId:XXX,
``` 

## accessKeySecret
阿里云accessKeySecret
``` 
accessKeySecret:XXX,
``` 
## bucket
bucket名称
``` 
bucket:XXX,
``` 

## timeout
超时时间
默认：15 * 1000
``` 
timeout:XXX,
``` 

## secure
是否https
默认：true
``` 
secure:XXX,
``` 
	
## region
阿里oss-region
默认："oss-cn-hangzhou"
``` 
region:XXX,
```
## prefix
路径前缀名称
``` 
prefix:XXX,
``` 
## projectName
是否使用项目名称在路径中
默认：true
``` 
projectName:XXX,
``` 
## use
是否使用该插件
default: true
```
use: true/false,
```

## reg
可识别的正则
默认: /\.(png|jpe?g|bmp|gif|mp4|webm|mp3)/i
```
reg: XXXX
```
# 其他示例

## [vue-cli自动解析静态资源](vue.config.js)
