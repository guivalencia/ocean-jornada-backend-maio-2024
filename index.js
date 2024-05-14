const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1>')
})

app.get('/oi', function (req, res) {
    res.send('Olá mundo!')
})

app.listen(3000)