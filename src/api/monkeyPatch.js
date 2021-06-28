const nativeFetch = window.fetch

window.fetch = (url, payload) => {
	
	return new Promise( (resolve, reject) => {
		
		const userData = JSON.parse(payload)
		
		if ( !userData.name || !userData.password ) {
			reject('Received no user data! Field(s) may be empty')
		}

		const host = window.location.host
		const path = url.split(host)[1]

		/*******************	User Registration 	*****************/

		if ( path === '/register' ) {
			if ( !localStorage ) {
				reject('No LocalStorage to register user! Browser upgrade needed!')
			}

			if (!userData) reject('No user data received for registration!')

			let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'))

			if ( !registeredUsers ) {
				localStorage.setItem( 'registeredUsers', JSON.stringify({}) )
				registeredUsers = JSON.parse( localStorage.getItem('registeredUsers') )

			}

			let userName = '' + userData.name.toLowerCase()

			if ( registeredUsers && registeredUsers[userName] ) {
				reject({
					errorText: 'User is already registered!',
				})
			}
			registeredUsers[userName] = userData

			localStorage.setItem( 'registeredUsers', JSON.stringify(registeredUsers) )

			resolve('User ' + userData.name + ' - successfully registered!')			
		}

		/*******************	User LogIn 	*****************/

		if ( path === '/login' ) {
			if ( !localStorage ) {
				reject('No LocalStorage for loggin In! Browser upgrade needed!')
			}

			if (!userData) reject('No user data received for loggin in!')

			let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'))
			if ( !registeredUsers ) {
				window.location.pathname = '/register'
			}

			let userName = '' + userData.name.toLowerCase()
			
			if ( registeredUsers && !registeredUsers[userName] ) {
				reject('User is not registered!')
				window.location.pathname = '/register'
			}
			
			if (registeredUsers[userName].password !== userData.password) {
				reject({
					errorText: 'Password mismatch!'
				})
			}

			let jsonWebToken = Math.random() + ""
			jsonWebToken = jsonWebToken.substring(2)

			registeredUsers[userName].jwt = jsonWebToken
			localStorage.setItem( 'registeredUsers', JSON.stringify(registeredUsers) )

			const loggedInUserData = Object.assign({}, registeredUsers[userName])

			resolve(loggedInUserData)			
		}
	} )
	
}