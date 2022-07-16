import { AddItem, AddItemModel } from '../../../../domain/usecases/items/add-item'
import { AddItemRepository } from '../../../protocols/items/add-item-repository'

export class DbAddItem implements AddItem {
  constructor (private readonly addItemRepository: AddItemRepository) {}

  async add (itemData: AddItemModel): Promise<string> {
    const itemId = await this.addItemRepository.add(itemData)
    return itemId
  }
}
