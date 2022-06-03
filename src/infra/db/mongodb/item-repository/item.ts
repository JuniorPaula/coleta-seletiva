import { AddItemRepository } from '../../../../data/protocols/add-item-repository'
import { GetItemRepository } from '../../../../data/protocols/get-item-repository'
import { ItemModel } from '../../../../domain/model/item-model'
import { AddItemModel } from '../../../../domain/usecase/add-item'
import { MongoHelper } from '../helpers/mongo-helper'

export class ItemMongoRepository implements AddItemRepository, GetItemRepository {
  async add (itemData: AddItemModel): Promise<ItemModel> {
    const itemColletion = MongoHelper.getCollection('items')
    const result = await itemColletion.insertOne(itemData)

    return MongoHelper.map(result.ops[0])
  }

  async get (): Promise<ItemModel[]> {
    const itemColletion = MongoHelper.getCollection('items')
    const result = await itemColletion.find().toArray()
    return MongoHelper.mapColletion(result)
  }
}
