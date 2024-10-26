var express = require('express')
var app = express()
var bodyparser = require('body-parser')

var router = require('./router/index');

app.listen(3000, function () {
    console.log('server is start')
})

app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.use(router)

app.get('/', function (req, res) {
    console.log('test123')
    res.sendFile(__dirname + '/public/main.html')
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
