<template>
	<div class="cabinet-page-main-content">
		<form class="user-search-form" action="#">
			<div class="form-group">
				<label for="user-id">Enter user id</label>
				<input type="text" class="form-group-input" name="user-id" id="user-id" required />
			</div>
			<div class="form-btn-container">
				<button type="submit" class="form-btn" @click.prevent="sendData">Send</button>
			</div>
			<button type="button" class="form-btn form-btn-fluid" @click.prevent="showAllUsers">Show All Users</button>
			<button type="button" class="form-btn form-btn-fluid" @click.prevent="clearResults">Clear Results</button>
		</form>

		<div v-if="userSearchResult" class="user-search-result">
			<div v-for="user in userSearchResult" :key="user.id" class="user-search-result-card">
				<span class="user-card-entry user-card-name">Full Name: {{`${user.firstName} ${user.lastName}`}}</span>
				<span class="user-card-entry user-card-username">Username: {{`${user.username}`}}</span>
				<span class="user-card-entry user-card-create-time">Created at: {{`${user.createdAt}`}}</span>
				<span class="user-card-entry user-card-update-time">Updated at: {{`${user.updatedAt}`}}</span>
				<span class="user-card-entry user-card-id">User ID: {{`${user.id}`}}</span>
			</div>
		</div>
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
			sendData(e) {
				const currentForm = e.target.closest('.user-search-form')

				if ( !currentForm ) {
					console.error('No form found!')
					return
				}

				const userID = currentForm.querySelector('#user-id').value
				this.$store.dispatch('getUserById', userID)
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
	.cabinet-page-main-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.user-search-form {
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