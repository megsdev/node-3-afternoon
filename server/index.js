const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()

//Middleware
const checkForSession = require('./middlewares/checkForSession')

//Controllers
const swag_c = require('./controllers/swag_controller')
const auth_c = require('./controllers/auth_controller')
const cart_c = require('./controllers/cart_controller')
const search_c = require('./controllers/search_controller')

const app = express()
app.use( bodyParser.json() )
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use( checkForSession )
app.use( express.static( `${__dirname}/../build` ) )

//Swag
app.get( '/api/swag', swag_c.read )

//Auth
app.post( '/api/login', auth_c.login )
app.post( '/api/register', auth_c.register )
app.post( '/api/signout', auth_c.signout )
app.get( '/api/user', auth_c.getUser )

//Cart
app.post( '/api/cart', cart_c.add )
app.post( '/api/cart/checkout', cart_c.checkout )
app.delete( '/api/cart', cart_c.delete )

//Search
app.get( '/api/search', search_c.search)


const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`server listening on port ${port}.`)})