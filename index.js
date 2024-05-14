const express = require('express')
const app = express()
app.get('/oi', function (req, res) {
  res.send('Olá Mundo!')
})

const itens = ['Rick', 'Morty', 'Summer']

app.get('/item/:id', function(req, res){
    //Acessamos o parametro de rota ID
    const id = req.params.id

    //Acessamos o item na lista usando o ID -1
    const item = itens[id -1]

    //Enviamos o item encontrado como resposta
    res.send(item)
})

app.listen(3000)