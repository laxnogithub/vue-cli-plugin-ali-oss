/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-04-07 14:34:37
 * @LastEditors: lax
 * @LastEditTime: 2021-01-03 16:40:51
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Index",
		component: Index,
	},
];

const router = new VueRouter({
	// mode: "history",
	mode: "hash",
	base: process.env.BASE_URL,
	routes,
});

export default router;
