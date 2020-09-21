const bodyParser = require('body-parser')
const express = require('express')
const url = require('url')
const { MongoClient, ObjectId } = require('mongodb')

const port = 3001
const mongo = {
  url: 'mongodb://localhost:27017',
  dbName: 'myproject'
}

mongo.client = new MongoClient(mongo.url, { useUnifiedTopology: true })
mongo.client.connect()
  .then(conn => {
    mongo.conn = conn
    mongo.db = conn.db(mongo.dbName)
  })
  .cacth(error => console.error(error))

const app = express()
const router = express.Router()

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World'))

app.use('/contato', router)

router.post('/', async (req, res) => {
  const ret = await mongo.db.collection('contato').insertOne(req.body)
  res.json({ id: ret.insertedId })
})

router.get('/', (req, res) => {
  res.json({ message: 'Hello, welcome to my server' })
})

router.get('/stuff', (req, res) => {
  var urlParts = url.parse(request.url, true)
  var parameters = urlParts.query
  var myParam = parameters.myParam
  // e.g. myVenues = 12;

  var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`

  res.json({ message: myResponse })
})

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
