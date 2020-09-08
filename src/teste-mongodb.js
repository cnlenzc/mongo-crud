const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'myproject'

const contato = {
  collection: '',

  async add (campos) {
    return await this.collection.insertOne(campos)
  },

  async get (id) {
    return await this.collection.find({ _id: ObjectId(id) }).toArray()
  },

  async list () {
    return await this.collection.find({}).toArray()
  },

  async delete (id) {
    return await this.collection.deleteOne({ _id: ObjectId(id) })
  },

  async update (id, campos) {
    return await this.collection.updateOne({ _id: ObjectId(id) }, { $set: campos })
  }
}

const main = async function () {
  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true })

  // Use connect method to connect to the Server
  await client.connect()
  console.log('Connected successfully to server')

  const db = client.db(dbName)

  contato.collection = db.collection('contato')

  let res
  res = await contato.add({ a: 1 })
  console.log(JSON.stringify(res.insertedId))

  const id = res.insertedId
  res = await contato.get(id)
  console.log(JSON.stringify(res))

  res = await contato.update(id, { b: 2 })
  console.log(JSON.stringify(res.nModified))

  res = await contato.get(id)
  console.log(JSON.stringify(res))

  res = await contato.delete(id)
  console.log(JSON.stringify(res.deletedCount))

  res = await contato.list()
  console.log(JSON.stringify(res))

  client.close()
}

main()
