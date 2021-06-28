// Set looged in user data to Local Storage

export function setLogInUserData(userData) {
	return new Promise( (resolve, reject) => {
		if ( !localStorage ) {
			return reject('No Local Storage found')
		}
		
		let loggedInUserData = JSON.parse( localStorage.getItem('loggedInUser') )

		if ( !loggedInUserData ) {
			loggedInUserData = {}
		}

		if (!userData.firstName) {
			return resolve({
				message: 'No user data received or login form is empty!'
			})
		}

		if ( loggedInUserData.firstName === userData.firstName ) {
			return resolve({
				message: 'User\'s already logged in',
				data: loggedInUserData
			})
		}

		loggedInUserData = userData
		console.log(loggedInUserData)
		localStorage.setItem('loggedInUser', JSON.stringify(loggedInUserData))

		return resolve({
			message: `User ${userData.firstName} successfully logged in!`,
			data: loggedInUserData
		})
	} )

}

// Create authorization header with JWT

export function authHeader() {
	let loggedInUserData = JSON.parse( localStorage.getItem('loggedInUser') )

	if ( !loggedInUserData || !loggedInUserData.jwt) {
		console.error('Authorization header creation failed! No user logged in!')
		return {}
	}

	return {Authorization: `Bearer: ${loggedInUserData.jwt}`}
}