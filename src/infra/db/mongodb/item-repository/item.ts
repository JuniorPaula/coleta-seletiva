import { AddItemRepository } from '../../../../data/protocols/add-item-repository'
import { ItemModel } from '../../../../domain/model/item-model'
import { AddItemModel } from '../../../../domain/usecase/add-item'
import { MongoHelper } from '../helpers/mongo-helper'

export class ItemMongoRepository implements AddItemRepository {
  async add (itemData: AddItemModel): Promise<ItemModel> {
    const itemColletions = MongoHelper.getCollection('items')
    const result = await itemColletions.insertOne(itemData)
    const item = result.ops[0]
    const { _id, ...obj } = item
    return Object.assign({}, obj, { id: _id })
  }
}
