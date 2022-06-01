import { ItemModel } from '../model/item-model'

export interface AddItemModel {
  title: string
  image: string
}

export interface AddItem {
  add: (item: AddItemModel) => ItemModel
}
