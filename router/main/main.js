var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

router.get('/', function (req, res) {
    var htmlPath = path.join(__dirname, '../public/main.html')
    console.log(htmlPath)
    res.sendFile(htmlPath)
})

module.exports = router