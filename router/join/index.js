var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
const mysql = require("mysql2");
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

// Database Setting
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'guest',
    password: '1234',
    database: 'jsman'
})

connection.connect();

// Router
router.get('/', function (req, res) {
    var msg;
    var errMsg = req.flash('error')
    if (errMsg) msg = errMsg;
    res.render('join.ejs', {"message": msg});
})

// passport.serializeUser()

passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, function (req, email, password, done) {
        var query = connection.query('select * from user where email=?', [email], function (err, rows) {
                if (err) return done(err);

                if (rows.length) {
                    console.log('existed user')
                    return done(null, false, {message: 'your email is already used'})
                } else {
                    var sql = {email: email, pw: password};
                    var query = connection.query('insert into user set ?', sql, function (err, rows) {
                        if (err) throw err
                        return done(null, {'email': email, 'id': rows.insertId})
                    })
                }
            }
        )
    })
)

router.post('/', passport.authenticate('local-join', {
        successRedirect: '/main',
        failureRedirect: '/join',
        failureFlash: true
    })
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
