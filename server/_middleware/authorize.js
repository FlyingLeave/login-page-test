/***************** Authorization helper functions ****************/

const jwt = require('express-jwt')
const {secret} = require('config.json')
const db = require('_helpers/db.js')

module.exports = authorize

function authorize() {

	return [
		jwt({secret, algorithms: ['HS256']}),
		async ( req, res, next ) => {
			console.log(1)
			const user = await db.User.findByPk(req.user.sub)

			if (!user)
				return res.status(401).json({message: 'Unauthorized'})

			req.user = user.get()
			next()
		}
	]
}