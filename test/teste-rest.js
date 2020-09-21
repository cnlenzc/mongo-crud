const axios = require('axios')

const baseURL = 'http://localhost:3001'

const api = axios.create({ baseURL })

const configAxios = {
  headers: {
    'Content-Type': 'application/json',
    token: '888e3306-5ef1-45e2-b7a7-4e329d474888'
  },
  // validateStatus: status => status >= 200 && status <= 500, // valores do response.status que não devem gerar exception
  timeout: 30000
}

const contato = {
  collection: 'contato',

  add (campos) {
    return api.post(this.collection, campos, configAxios)
  },

  get (id) {
    return api.get(this.collection, id, configAxios)
  },

  list () {
    return api.get(this.collection, configAxios)
  },

  delete (id) {
    return api.delete(this.collection, id, configAxios)
  },

  update (id, campos) {
    return api.pacth(this.collection, id, configAxios)
  }
}

const main = async function () {
  try {
    let res
    res = await contato.add({ nome: 'Maria' })
    console.log('add', JSON.stringify(res.data))
    const id1 = res.data.id

    res = await contato.add({ nome: 'José' })
    console.log('add', JSON.stringify(res))
    const id2 = res.id

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

  }
}

main()
