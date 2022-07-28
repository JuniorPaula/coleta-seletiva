import { LocationModel } from '@/domain/model/location-model'

export interface LoadLocationByIdRepository {
  loadById: (id: string) => Promise<LocationModel>
}
