import { LocationModel } from '@/domain/model/location-model'

export interface LoadLocationById {
  loadById: (id: string) => Promise<LocationModel>
}
