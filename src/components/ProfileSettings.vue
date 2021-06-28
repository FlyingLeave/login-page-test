<template>
	<div class="cabinet-pane-wrapper">

		<form class="profile-update-form" action="#">
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
				<button type="submit" class="form-btn" @click.prevent="updateProfileSettings">Update Profile</button>
		</form>

	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: 'CabinetPage',
		computed: {
			...mapState({
				userStatus: state => state.userStatus,
				firstName: state => state.firstName,
				lastName: state => state.lastName,
				username: state => state.username,
				userSearchResult: state => state.userSearchResult
			}),
			fullName() {
				return `${this.$store.state.firstName} ${this.$store.state.lastName}`
			},
		},
		async mounted() {
			this.$store.commit('changeStatus')

			let userData = await window.localStorage.getItem('loggedInUser')
			console.log(1)
			if ( !userData ) this.$router.push('/login')			

			userData = JSON.parse(userData)
			this.$store.commit('setStateUserData', userData)

		},
		methods: {
			goToProfileSettings() {
				this.$router.push('/profileSettings')
			},
			logOut() {
				this.$store.dispatch('logOut')
			}, 
			updateProfileSettings(e) {
				const currentForm = e.target.closest('.profile-update-form')

				if ( !currentForm ) {
					console.error('No form found!')
					return
				}

				const profileSettings = {}
				profileSettings.firstName = currentForm.querySelector('#first-name').value
				profileSettings.lastName = currentForm.querySelector('#last-name').value
				profileSettings.username = currentForm.querySelector('#username').value
				profileSettings.password = currentForm.querySelector('#password').value

				this.$store.dispatch('updateProfileSettings', profileSettings)
			},
			showAllUsers() {
				this.$store.dispatch('showAllUsers')
			},
			clearResults() {
				this.$store.commit('clearResults')
			}
		}
	}
</script>

<style scoped>
	.profile-update-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #3d3d3d;
		min-width: 30rem;
		margin: 2rem 0;
		padding: 1rem;
		border-radius: 12px;
	}
	.form-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem auto;
		min-width:  20rem;
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
		color: #000;
		background-color: hotpink;
		border: 0;
		border-radius: 8px;
	}
	.form-btn:hover {
		background-color: lavender;
		cursor: pointer;
	}
	.form-btn {
		display: block;
		min-width: 6rem;
		padding: 0.5rem;
		margin: 0 auto;
		font-size: 1rem;
		margin: 2rem auto 0;
		letter-spacing:  2px;
		color: #000;
		background-color: #ccc;
		border: 0;
		border-radius: 8px;
	}
	.form-btn:hover {
		background-color: #aaa;
		cursor: pointer;
	}
	.form-btn-fluid {
		width: 100%;
	}
	.user-search-result {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 1rem;
		min-width:  50rem;
		max-width: 70%;
		min-height:  10rem;
		border-radius: 12px;
		background-color: #000d14;
	}
	.user-search-result-card {
		display: flex;
		flex-direction: column;
		width: 45%;
		margin: 0.8rem 0.5rem;
		padding: 1rem;
		border-radius: 12px;
		background-color: #3d2800;
		color: rgba(255,255,255,0.7);
	}
	.user-card-entry {
		margin-bottom: 0.5rem;
	}
</style>