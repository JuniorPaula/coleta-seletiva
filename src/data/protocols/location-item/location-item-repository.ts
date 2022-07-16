import { LocationItemModel } from '@/domain/model/location-item-model'

export interface LocationItemRepository {
  create: (data: LocationItemModel[]) => Promise<void>
}
