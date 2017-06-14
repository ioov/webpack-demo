<template>
	<div id="foo">
		{{msg}}
	</div>
</template>

<script>
	export default {
		data () {
			return {
				msg: this.$store.state.foo
			}
		}
	};
</script>

<style>
	#foo{
		color: yellow;
	}
</style>