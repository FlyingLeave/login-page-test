<template>
	<div class="wrapper">
		<h1>Cabinet Page</h1>
		<div class="user-badge">
			<p class="user-badge_name">{{fullName}}</p>
			<div class="btn-container">
				<button type="button" class="form-btn" @click="goToProfileSettings">
					{{userBadgeBtnText}}</button>
				<button type="button" class="form-btn" @click="deleteProfile">
					Delete Profile</button>
				<button type="button" class="form-btn form-btn-fluid" @click="logOut">
					Log Out</button>
			</div>
		</div>
		<div v-if="userStatus" class="statusText">{{userStatus}}</div>
		<keep-alive>
			<component :is="currentContent"></component>
		</keep-alive>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	import CabinetPageMainContent from '@/components/CabinetPageMainContent'
	import ProfileSettings from '@/components/ProfileSettings'

	export default {
		name: 'CabinetPage',
		data() {
			return {
				userBadgeBtnText: 'ProfileSettings',
				currentContent: 'CabinetPageMainContent'
			}
		},
		components: {
			CabinetPageMainContent,
			ProfileSettings
		},
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
				switch ( this.currentContent ) {
					case 'CabinetPageMainContent': 
						this.userBadgeBtnText = 'User Search'
						this.currentContent = 'ProfileSettings'
						break
					default: 
						this.userBadgeBtnText = 'Profile Settings'
						this.currentContent = 'CabinetPageMainContent'
				}
			},
			deleteProfile() {
				this.$store.dispatch('deleteProfile')
			},
			logOut() {
				this.$store.dispatch('logOut')
			}, 
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
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background-color: #262626;
		min-height:  100vh;
	}
	.wrapper h1 {
		color: green;
	}
	.user-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 25rem;
		min-height: 3rem;
		padding: 1rem 2rem;
		background-color: olive;
		color: #fff;
		border-radius: 12px;
	}
	.user-badge_name {
		font-size: 1.5rem;
		margin-bottom: 0;
	}
	.statusText {
		margin: 1rem 0;
		color: rgba(255,255,255,0.7);
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
		min-width: 10rem;
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