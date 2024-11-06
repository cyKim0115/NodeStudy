var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
const mysql = require("mysql2");

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
router.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/form.html'))
})

router.post('/form', function (req, res) {
    console.log(req.body)

    if (req.body.email === '') {
        res.send('No Email ?');
    } else {
        // res.send('Welcom ' + req.body.email)
        res.render('email.ejs', {'email': req.body.email})
    }
})

router.post('/ajax', function (req, res) {
    console.log(req.body.email)

    var email = req.body.email
    var responseData = {}

    var query = connection.query(`select name
                                  from user
                                  where email = "${email}"`, function (err, rows) {
        if (err) throw err

        if (rows[0]) {
            console.log(rows[0].name)
            responseData.result = "ok"
            responseData.name = rows[0].name
        } else {
            responseData.result = "none"
            responseData.name = ""
        }

        res.json(responseData)
    })
})

module.exports = router
