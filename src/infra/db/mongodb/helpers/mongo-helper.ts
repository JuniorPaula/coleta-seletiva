import { Collection, MongoClient } from 'mongodb'
import env from '@/main/config/env'

export const MongoHelper = {
  client: null as MongoClient,
  baseUrl: env.baseUrl,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
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
        id: item._id,
        title: item.title,
        image: `${this.baseUrl}/static/img/${item.image}`
      }
    })
  }
}
