const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'myproject'

const contato = {
  collection: '',

  add (campos) {
    return this.collection.insertOne(campos)
  },

  get (id) {
    return this.collection.find({ _id: ObjectId(id) }).toArray()
  },

  list () {
    return this.collection.find({}).toArray()
  },

  delete (id) {
    return this.collection.deleteOne({ _id: ObjectId(id) })
  },

  update (id, campos) {
    return this.collection.updateOne({ _id: ObjectId(id) }, { $set: campos })
  },

  cursor () {
    return this.collection.find({})
  },

  deleteAll () {
    return this.collection.deleteMany({ })
  }
}

const db = {
  client: null,
  db: null,

  async connect () {
    this.client = new MongoClient(url, { useUnifiedTopology: true })
    await this.client.connect()
    console.log('Connected successfully to mongo')
    this.db = this.client.db(dbName)
    contato.collection = this.db.collection('contato')
  },

  disconnect () {
    if (this.client) {
      this.client.close()
      console.log('Disconnected successfully to mongo')
    }
  }
}

const main = async function () {
  // Use connect method to connect to the Server

  try {
    await db.connect()

    let res
    res = await contato.add({ nome: 'João' })
    console.log('add', JSON.stringify(res.insertedId))
    const id1 = res.insertedId

    res = await contato.add({ nome: 'Pedro' })
    console.log('add', JSON.stringify(res.insertedId))
    const id2 = res.insertedId

    res = await contato.get(id1)
    console.log('get', JSON.stringify(res))

    res = await contato.update(id2, { idade: 50, data: new Date(), data2: '2012-12-19T06:01:17.171Z' })
    console.log('update', JSON.stringify(res.modifiedCount))

    res = await contato.get(id2)
    console.log('get', JSON.stringify(res))

    res = await contato.delete(id1)
    console.log('delete', JSON.stringify(res.deletedCount))

    res = await contato.list()
    // console.log('list\n' + res.map(c => JSON.stringify(c)).join('\n'))
    // console.log('list\n' + res.map(c => Object.values(c).join(', ')).join('\n'))
    console.table(res)

    // res = await contato.cursor()
    // res.forEach(c =>
    //   console.log('cursor', JSON.stringify(c))
    // )

    // res = await contato.deleteAll()
    // console.log('delete', JSON.stringify(res))
  } catch (error) {
    console.error(error)
  } finally {
    db.disconnect()
  }
}

main()
