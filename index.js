const express = require('express')
const { MongoClient, ConnectionClosedEvent } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:zMo3skPjVYGPJrPY@cluster0.bn9bztr.mongodb.net'
const dbName = 'ocean-jornada-backend-maio-2024'

const client = new MongoClient(dbUrl)

async function main() {
  console.log('Conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  // Desafio: criar uma rota [GET] /oi que retorna "Olá, mundo!"
  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  // Lista de Itens
  const itens = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']
  //              0               1              2

  const db = client.db(dbName)
  const collection = db.collection('item')

  // Endpoint de Read All [GET] /item
  app.get('/item', async function (req, res) {
    //Acessando a lista de documentos na collection
    const documentos = await collection.find().toArray()
    //Envio os documentos como resposta
    res.send(documentos)
  })

  // Endpoint de Read By ID [GET] /item/:id
  app.get('/item/:id', function (req, res) {
    // Acessamos o parâmetro de rota ID
    const id = req.params.id

    // Acessamos o item na lista usando o ID - 1
    const item = itens[id - 1]

    // Enviamos o item encontrado como resposta
    res.send(item)
  })

  // Sinalizamos que todo corpo de requisição
  // virá como JSON
  app.use(express.json())

  // Endpoint de Create [POST] /item
  app.post('/item', function (req, res) {
    // Acessamos o corpo da requisição
    const body = req.body

    // Acessar o item no corpo da requisição
    const novoItem = body.nome

    // Adicionar o novo item na lista
    itens.push(novoItem)

    // Enviar uma mensagem de sucesso
    res.send('Item adicionado com sucesso: ' + novoItem)
  })

  //Endpoint de Update [PUT] /item/:id
  app.put('/item/:id', function (req, res) {
    //Acessar o ID do parametro de rota
    const id = req.params.id

    //Acessar o item a ser atualizado, a partir do corpo da requisição
    const body = req.body
    const atualizarItem = body.nome

    //Atualizar na lista o item recebido
    itens[id - 1] = atualizarItem

    res.send('Item atualizado com sucesso: ' + id + ', ' + atualizarItem)
  })

  //Endpoint de Delete [DELETE] /item/:id
  app.delete('/item/:id', function (req, res) {
    //Acessar o ID do parametro de rota
    const id = req.params.id

    //Executa a operação de exclusão desse item pelo indice
    delete itens[id - 1]

    //Enviamos uma mensagem de sucesso
    res.send('Item removido com sucesso: ' + id)
  })

  app.listen(3000)
}

main()