<template>
	<div id="bar">
		{{msg}}
	</div>
</template>

<script>
	export default {
		data () {
			return {
				msg: this.$store.state.bar
			}
		}
	};
</script>

<style>
	#bar{
		color: green;
	}
</style>