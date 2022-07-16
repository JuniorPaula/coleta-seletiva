
import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
import { AddLocation, AddLocationModel } from '@/domain/usecases/locations/add-location'

export class DbAddLocation implements AddLocation {
  constructor (private readonly addLocationRepository: AddLocationRepository) {}

  async add (location: AddLocationModel): Promise<string> {
    const locationId = await this.addLocationRepository.add(location)
    return locationId
  }
}
