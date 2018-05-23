'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const api =require('./routes')
const hbs = require('express-handlebars')
const app = express()
const cookieSession = require("cookie-session")
const User = require("./models/user.js").User

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use('/public', express.static('public'))

app.use('/api', api)

app.get('/', (req,res) => {
    res.render('home/index')
})
app.get('/blog', (req, res) => {
    res.render('home/blog')
})
app.get('/shop', (req, res) => {
    res.render('home/shop')
})
app.get('/account', (req, res) => {
    res.render('account/login')
})
app.get('/account/signup', (req, res) => {
    res.render('account/signup')
})


module.exports = app