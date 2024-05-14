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

//Sinalizamos que todo corpo de requisição
//virá como JSON
app.use(express.json())

//Endpoint de Create [POST] /item
app.post('/item', function (req, res){
    //Acessando o corpo da requisição
    const body = req.body

    //Acessar o item no corpo da requisição
    const novoItem = body.nome

    //Adicionar o novo item na lista
    itens.push(novoItem)

    //Enviar uma mensagem de sucesso
    res.send('Item adicionado com sucesso ' + novoItem)


})

app.listen(3000)