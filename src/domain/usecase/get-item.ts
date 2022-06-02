import { ItemModel } from '../model/item-model'

export interface GetItem {
  get: () => Promise<ItemModel[]>
}
