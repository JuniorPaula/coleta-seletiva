import { AddItemModel } from '@/domain/usecases/items/add-item'

export interface AddItemRepository {
  add: (itemData: AddItemModel) => Promise<string>
}
