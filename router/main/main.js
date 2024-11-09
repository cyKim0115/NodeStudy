var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

router.get('/', function (req, res) {
    // var htmlPath = path.join(__dirname, '../../public/main.html')
    // console.log(htmlPath)
    // res.sendFile(htmlPath)

    console.log('main js loaded', req.user)

    res.render('main.ejs', {'id': req.user.id, 'email': req.user.email})
})

module.exports = router