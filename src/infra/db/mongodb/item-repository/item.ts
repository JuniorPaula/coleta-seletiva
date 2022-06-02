import { AddItemRepository } from '../../../../data/protocols/add-item-repository'
import { ItemModel } from '../../../../domain/model/item-model'
import { AddItemModel } from '../../../../domain/usecase/add-item'
import { MongoHelper } from '../helpers/mongo-helper'

export class ItemMongoRepository implements AddItemRepository {
  async add (itemData: AddItemModel): Promise<ItemModel> {
    const itemColletion = MongoHelper.getCollection('items')
    const result = await itemColletion.insertOne(itemData)

    return MongoHelper.map(result.ops[0])
  }
}
