var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
const mysql = require("mysql2");

// Database Setting
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Megum1ng!',
    database: 'jsman'
})

connection.connect();

// Router
router.get('/', function (req, res) {
    console.log('get join url')
    res.sendFile(path.join(__dirname, '../../public/join.html'))
})

module.exports = router
