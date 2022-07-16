import { LocationItemModel } from '@/domain/model/location-item-model'

export interface LocationItem {
  create: (data: LocationItemModel[]) => Promise<void>
}
