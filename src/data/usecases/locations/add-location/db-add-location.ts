
import { LocationItemRepository } from '@/data/protocols/location-item/location-item-repository'
import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
import { AddLocation, AddLocationModel } from '@/domain/usecases/locations/add-location'

export class DbAddLocation implements AddLocation {
  constructor (
    private readonly addLocationRepository: AddLocationRepository,
    private readonly locationItemRepository: LocationItemRepository
  ) {}

  async add (location: AddLocationModel): Promise<string> {
    const locationId = await this.addLocationRepository.add(location)
    const locationItem = location.items.map((item_id: string) => {
      return {
        location_id: locationId,
        item_id
      }
    })
    await this.locationItemRepository.create(locationItem)
    return locationId
  }
}
