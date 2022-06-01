import { ItemModel } from '../../../domain/model/item-model'
import { AddItem, AddItemModel } from '../../../domain/usecase/add-item'
import { AddItemRepository } from '../../protocols/add-item-repository'

export class DbAddItem implements AddItem {
  constructor (private readonly addItemRepository: AddItemRepository) {}

  async add (itemData: AddItemModel): Promise<ItemModel> {
    const item = await this.addItemRepository.add(itemData)
    return item
  }
}
