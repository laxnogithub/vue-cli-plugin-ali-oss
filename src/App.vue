<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-04-07 20:45:54
 * @LastEditors: lax
 * @LastEditTime: 2021-01-03 13:21:45
 -->
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
@import "@ex/css/pmdInit";
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	height: 100%;
}

#sys {
	position: absolute;
}
</style>
