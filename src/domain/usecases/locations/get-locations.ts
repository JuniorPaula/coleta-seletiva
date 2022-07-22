import { LocationModel } from '@/domain/model/location-model'

export type DataLocation = {
  city?: string
  uf?: string
}

export interface GetLocations {
  get: (query: DataLocation) => Promise<LocationModel>
}
