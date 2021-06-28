<template>
	<div class="wrapper">
		<h1>Login Page</h1>
		<form class="login-form" action="#">
			<div class="form-group">
				<label for="first-name">First Name</label>
				<input type="text" class="form-group-input" name="first-name" id="first-name" required />
			</div>
			<div class="form-group">
				<label for="last-name">Last Name</label>
				<input type="text" class="form-group-input" name="last-name" id="last-name" required />
			</div>
			<div class="form-group">
				<label for="username">Username</label>
				<input type="text" class="form-group-input" name="username" id="username" required />
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" class="form-group-input" name="password" id="password" required />
			</div>
				<button type="submit" class="form-btn" @click.prevent="sendData">Login</button>
		</form>

		<button type="button" class="form-btn" @click.prevent="goToRegistration">Registration</button>
		<p v-if="userStatus" class="registration-fallout">{{this.userStatus}}</p>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: 'LoginPage',
		computed: mapState([
			'userStatus'
		]),
		methods: {
			sendData(e) {
				const currentForm = e.target.closest('.login-form')
				if ( !currentForm ) {
					console.error('No form found!')
					return
				}

				const userData = {}
				userData.firstName = currentForm.querySelector('#first-name').value
				userData.lastName = currentForm.querySelector('#last-name').value
				userData.username = currentForm.querySelector('#username').value
				userData.password = currentForm.querySelector('#password').value

				this.$store.dispatch('logInUser', userData)
			},
			goToRegistration() {
				this.$store.commit('changeStatus')

				this.$router.push('/registration')
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background-color: #0c1d31;
		min-height:  100vh;
		color: rgba(255,255,255,0.7);
	}
	.wrapper h1 {
		color: hotpink;
	}
	.login-form {
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		border: 2px solid;
		border-image: linear-gradient(90deg, hotpink, lavender) 10;
	}
	.form-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem;
	}
	.form-group label {
		font-size: 1.1rem;
		color: rgba(255,255,255, 0.7);
		letter-spacing: 2px;
	}
	.form-group-input {
		margin-left: 0.5rem;
		padding: 0.3rem 0.5rem;
		border: 1px solid #aaa;
		border-radius: 8px;
		background-color: rgba(255,255,255, 0.7);
	}
	.form-group-input:focus {
		border-color: #ccc;
		outline: 0;
		box-shadow: 0 0 10px hotpink;
	}
	.form-btn {
		display: block;
		min-width: 6rem;
		padding: 0.5rem;
		margin: 2rem auto 0;
		letter-spacing:  2px;
		font-size: 1rem;
		color: rgba(0,0,0, 0.7);
		background-color: hotpink;
		border: 0;
		border-radius: 8px;
	}
	.form-btn:hover {
		background-color: lavender;
		cursor: pointer;
	}
</style>