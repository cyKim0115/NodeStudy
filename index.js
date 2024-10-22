var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var mysql = require('mysql2')
var main = require('./router/main')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Megum1ng!',
    database: 'jsman'
})

connection.connect();

app.listen(3000, function () {
    console.log('server is start')
})

app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.use('/main', main)

app.get('/', function (req, res) {
    console.log('test123')
    res.sendFile(__dirname + '/public/main.html')
})

app.get('/email_post', function (req, res) {
    res.sendFile(__dirname + '/public/form.html')
})

app.post('/email_post', function (req, res) {
    console.log(req.body)

    if (req.body.email === '') {
        res.send('No Email ?');
    } else {
        // res.send('Welcom ' + req.body.email)
        res.render('email.ejs', {'email': req.body.email})
    }
})

app.post('/ajax_send_email', function (req, res) {
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

app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/public/search.html')
})

app.post('/search_post', function (req, res) {
    console.log(req.body.search_string)

    var responseData = {'result': 'ok', 'search_string': req.body.search_string, 'search_result': ''}

    switch (req.body.search_string) {
        case '강아지':
            responseData.search_result = '멍멍'
            break
        case '고양이':
            responseData.search_result = '야옹'
            break
        default:
            responseData.search_result = '검색 결과가 없습니다.'
            break
    }

    res.json(responseData)
})
