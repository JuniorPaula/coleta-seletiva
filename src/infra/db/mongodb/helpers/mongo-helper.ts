import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (colletion: any): any {
    const { _id, ...collectionWithoutId } = colletion
    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  mapColletion (collection: any[]): any[] {
    return collection.map(c => MongoHelper.map(c))
  },

  collectionSerialized (collection: any[]): any[] {
    return collection.map(item => {
      return {
        _id: item.id,
        title: item.title,
        image: `http://localhost:3035/api/${item.image}`
      }
    })
  }
}
