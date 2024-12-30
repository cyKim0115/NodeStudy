var express = require('express')
var app = express()
var router = express.Router()

router.get('/logout',function (req, res){
    // console.log('logout router')
    req.logout()
    res.redirect('/login')
})

module.exports = router;