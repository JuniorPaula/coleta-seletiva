import { ItemModel } from '@/domain/model/item-model'

export interface GetItemRepository {
  get: () => Promise<ItemModel[]>
}
