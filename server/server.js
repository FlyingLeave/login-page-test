/***************** App entry point(starts server) ****************/

require('rootpath')()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userController = require('users/user.controller')
const errorHandler = require('_middleware/error-handler')

const app = express()

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

const corsOptions =  {
	origin: true
}
app.use(cors(corsOptions))

app.use('/users/', require('./users/user.controller'))

app.use(errorHandler)

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000

app.listen( port, () => console.log(`Server listening on port ${port}`) )
