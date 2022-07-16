import { ItemModel } from '@/domain/model/item-model'

export interface GetItem {
  get: () => Promise<ItemModel[]>
}
