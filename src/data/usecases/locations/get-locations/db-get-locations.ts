import { GetLocationsRepository } from '@/data/protocols/locations/get-locations-repository'
import { LocationModel } from '@/domain/model/location-model'
import { DataLocation, GetLocations } from '@/domain/usecases/locations/get-locations'

export class DbGetLocations implements GetLocations {
  constructor (private readonly getLocationsRepository: GetLocationsRepository) {}

  async get (query: DataLocation): Promise<LocationModel[]> {
    const locations = await this.getLocationsRepository.get(query)
    return locations
  }
}
