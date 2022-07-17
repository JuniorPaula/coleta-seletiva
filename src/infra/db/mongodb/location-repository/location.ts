import { LocationItemRepository } from '@/data/protocols/location-item/location-item-repository'
import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
import { LocationItemModel } from '@/domain/model/location-item-model'
import { AddLocationModel } from '@/domain/usecases/locations/add-location'
import { MongoHelper } from '../helpers/mongo-helper'

export class LocationMongoRepository implements AddLocationRepository, LocationItemRepository {
  async add (location: AddLocationModel): Promise<string> {
    const locationCollection = MongoHelper.getCollection('locations')
    const locationId = await locationCollection.insertOne(location)
    return locationId.insertedId.toHexString()
  }

  async create (data: LocationItemModel[]): Promise<void> {
    const locationItemCollection = MongoHelper.getCollection('locations_items')
    await locationItemCollection.insertOne({ data })
  }
}
