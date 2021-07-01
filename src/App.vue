<template>
		<div class="wrapper-general">
			<h1>Hello, from App</h1>
			<router-view></router-view>
		</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	body {
		font-family: Roboto, sans-serif;
		margin: 0;
	}
</style>