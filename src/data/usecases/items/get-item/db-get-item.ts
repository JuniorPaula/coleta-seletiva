import { ItemModel } from '../../../../domain/model/item-model'
import { GetItemRepository } from '../../../protocols/items/get-item-repository'

export class DbGetItem implements GetItemRepository {
  constructor (private readonly getItemRepository: GetItemRepository) {}
  async get (): Promise<ItemModel[]> {
    const items = await this.getItemRepository.get()
    return items
  }
}
