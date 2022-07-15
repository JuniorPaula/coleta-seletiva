import { AddItemModel } from '../../domain/usecase/add-item'

export interface AddItemRepository {
  add: (itemData: AddItemModel) => Promise<string>
}
