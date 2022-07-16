import { AddItemRepository } from '@/data/protocols/items/add-item-repository'
import { GetItemRepository } from '@/data/protocols/items/get-item-repository'
import { ItemModel } from '@/domain/model/item-model'
import { AddItemModel } from '@/domain/usecases/items/add-item'
import { MongoHelper } from '../helpers/mongo-helper'

export class ItemMongoRepository implements AddItemRepository, GetItemRepository {
  async add (itemData: AddItemModel): Promise<string> {
    const itemColletion = MongoHelper.getCollection('items')
    const result = await itemColletion.insertOne(itemData)
    return result.insertedId.toHexString()
  }

  async get (): Promise<ItemModel[]> {
    const itemColletion = MongoHelper.getCollection('items')
    const result = await itemColletion.find().toArray()
    return MongoHelper.collectionSerialized(result)
  }
}
