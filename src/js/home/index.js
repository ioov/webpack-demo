import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '@/vue/app.vue';
import routes from '@/vue/routers.js';


Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes
});

const store = new Vuex.Store({
	state: {
		foo: "foofoofoo",
		bar: "barbarbar"
	}
});

new Vue({
	el: '#app-wrap',
	template: '<App/>',
	router,
	store,
	components: { App }
});