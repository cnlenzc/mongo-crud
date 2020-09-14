const express = require('express')
const app = express()
const router = express.Router()
const port = 3000
const url = require('url')

app.get('/', (request, response) => response.send('Hello World'))

app.use('/api', router)

router.get('/', (request, response) => {
  response.json({ message: 'Hello, welcome to my server' })
})

router.get('/stuff', (request, response) => {
  var urlParts = url.parse(request.url, true)
  var parameters = urlParts.query
  var myParam = parameters.myParam
  // e.g. myVenues = 12;

  var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`

  response.json({ message: myResponse })
})

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
