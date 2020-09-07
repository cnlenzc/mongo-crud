const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'myproject'

const insertDocuments = async function (db) {
  // Get the documents collection
  const collection = db.collection('documents')
  // Insert some documents
  const result = await collection.insertMany([
    { a: 1 }, { a: 2 }, { a: 3 }
  ])
  assert.strictEqual(3, result.result.n)
  assert.strictEqual(3, result.ops.length)
  console.log('Inserted 3 documents into the collection')
  return result
}

const main = async function () {
  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true })

  // Use connect method to connect to the Server
  await client.connect()

  console.log('Connected successfully to server')

  const db = client.db(dbName)

  const result = await insertDocuments(db)

  console.log(JSON.stringify(result))

  client.close()
}

main()
