import { AddLocationModel } from '@/domain/usecases/locations/add-location'

export interface AddLocationRepository {
  add: (location: AddLocationModel) => Promise<string>
}
