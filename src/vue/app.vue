<template>
	<div id="app">
		<h1>{{msg}}</h1>
		<router-link to="/foo">Go to Foo</router-link>
		<router-link to="/bar">Go to Bar</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
	import '@/css/home/index.css';
	export default {
		data () {
			return {
				msg: "hello world"
			}
		}
	};
</script>

<style>
	p{
		color: red;
	}
</style>