import { LocationModel } from '@/domain/model/location-model'
import { DataLocation } from '@/domain/usecases/locations/get-locations'

export interface GetLocationsRepository {
  get: (query: DataLocation) => Promise<LocationModel>
}
