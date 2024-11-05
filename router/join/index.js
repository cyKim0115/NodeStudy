var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
const mysql = require("mysql2");
var passport= require('passport')
var LocalStrategy = require('passport-local').Strategy;

// Database Setting
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'jsman'
})

connection.connect();

// Router
router.get('/', function (req, res) {
    console.log('get join url')
    // res.sendFile(path.join(__dirname, '../../public/join.html'))
    res.render('join.ejs');
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, function (req, email, password, done) {
    console.log('local-join callback called')
})
)

router.post('/',passport.authenticate('local-join', {
    successRedirect:'/main',
    failureRedirect:'/join',
    failureFlash:true})
)

/*
router.post('/', function (req, res) {
    var body = req.body
    var email = body.email
    var name = body.name
    var password = body.password

    var sql = {email: email, name: name, pw: password}
    var query = connection.query('insert into user set ?', sql, function (err, rows) {
        if (err) {
            throw err;
        }
        // console.log("ok db insert", rows.insertId, name)
        res.render('welcome.ejs',{'name':name,'id':rows.insertId})
    })
})
*/

module.exports = router
