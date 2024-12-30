var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

//main page는 login이 될 때만 접근이 가능하도록
router.get('/', function (req, res) {

    var id = req.user;
    if(!id) res.render('login.ejs');
    console.log('main js loaded', req.user)

    res.render('main.ejs', {'id': req.user.id, 'email': req.user.email})
    //res.render('main.ejs', {'id': id})
})

module.exports = router