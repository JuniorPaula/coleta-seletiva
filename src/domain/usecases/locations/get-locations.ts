import { LocationModel } from '@/domain/model/location-model'

type DataLocation = {
  city?: string
  uf?: string
  items?: string[]
}

export interface GetLocations {
  get: (query: DataLocation) => Promise<LocationModel>
}
