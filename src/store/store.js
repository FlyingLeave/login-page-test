// import '@/api/monkeyPatch'
import {setLogInUserData} from '@/helpers/helpers'

import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/router'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userStatus: "",
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		token: "",
		id: "",
		serverApiUrl: '127.0.0.1:4000',
		userSearchResult: null
	},
	mutations: {
		changeStatus(state, statusTitle = '') {
			state.userStatus = statusTitle
		},
		setStateUserData(state, userData) {
			state.firstName = userData.firstName
			state.lastName = userData.lastName
			state.username = userData.username
			state.password = userData.password
			state.token = userData.token
			state.id = userData.id
		},
		flushState(state) {
			state.firstName = ""
			state.lastName = ""
			state.username = ""
			state.password = ""
			state.token = ""
			state.id = ""
			state.userSearchResult = null
		},
		setUserSearchResult(state, result) {
			state.userSearchResult = result
		},
		clearResults(state) {
			state.userSearchResult = null
		},
		updateStateUserData(state, updateUserData) {
			state.firstName = updateUserData.firstName
			state.lastName = updateUserData.lastName
			state.username = updateUserData.username
		}
	},
	actions: {
		 async registerUser({commit, state}, userData) {
			commit('changeStatus', 'Registering...')
			
			try {
				let fetchResult = await fetch( `http://${state.serverApiUrl}/users/register`, { 
											method: 'POST',
											headers: {
												'Content-Type': 'application/json',
											},
											body: JSON.stringify(userData) 
										})
				let result = await fetchResult.json()

				commit('changeStatus', result.message)
				console.dir(result)
				if ( result.status === 200 ) router.push('/login')

			} catch (err) {console.error(err)}
				
		 },

		async logInUser({commit, state}, userData) {
			commit('changeStatus', 'Loggin In...')

			try {
				let fetchResult = await fetch( `http://${state.serverApiUrl}/users/authenticate`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(userData) 
				})

				let result = await fetchResult.json()

				if ( result.message && result.message.toLowerCase().endsWith('incorrect') ) {
					commit('changeStatus', result.message)
					return
				}

				let settingUserDataResult = await setLogInUserData(result)
				if ( !settingUserDataResult.data && settingUserDataResult.message) { 
					console.log( settingUserDataResult.message )
					commit('changeStatus', settingUserDataResult.message)

					return
				}

				commit('setStateUserData', settingUserDataResult.data)

				router.push('/cabinet')
				
			} catch (err) {
				console.error(err.message)
			}
				
		},

		async logOut({commit}) {
			commit('changeStatus', 'Logging out...')
			commit('flushState')

			if ( window.localStorage.getItem('loggedInUser') ) {
				window.localStorage.removeItem('loggedInUser')
			} 

			commit('changeStatus', '')
			router.push('/login')
		},

		async getUserById({commit, state}, userID) {
			if (! userID) {
				console.error('No user ID to pass')
				return
			}

			let userInfo = await fetch(
				`http://${state.serverApiUrl}/users/${userID}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${state.token}`
					}
				}
			)

			let result = await userInfo.json()
			// console.dir(result)

			if (typeof result === 'object') {
				result = new Array(result)
				console.dir(result)
			}

			commit('setUserSearchResult', result)

		},

		async showAllUsers({commit, state}) {
			let userInfo = await fetch(
				`http://${state.serverApiUrl}/users/`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${state.token}`
					}
				}
			)

			let result = await userInfo.json()
			if (!result) {
				console.error('No users fetched!')
				return
			}

			commit('setUserSearchResult', result)
		},

		async updateProfileSettings({ commit, state }, updateSettings) {
			const userID = state.id
			const token = state.token

			const fetchResult = await fetch(
				`http://${state.serverApiUrl}/users/${userID}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(updateSettings)
				}
			)

			const updatedUserData = await fetchResult.json()

			if (!updatedUserData) {
				console.error('No updated user data received!')
				return
			}

			if ( updatedUserData.message ) {
				console.log(updatedUserData.message)
				commit('changeStatus', updatedUserData.message)
				return
			}

			console.dir(updatedUserData)
			commit('updateStateUserData', updatedUserData)
			commit('changeStatus', 'Profile Settings Updated!')
		},

		async deleteProfile({ commit, state }) {
			const userID = state.id
			const token = state.token

			const fetchResult = await fetch(
				`http://${state.serverApiUrl}/users/${userID}`,
				{
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`
					},
					body: userID
				}
			)

			const deletionResult = await fetchResult.json()

			console.log(deletionResult.message)

			window.localStorage.removeItem('loggedInUser')

			commit('changeStatus', deletionResult.message)
			commit('flushState')

			router.push('/login')
		}
	}
})

export default store