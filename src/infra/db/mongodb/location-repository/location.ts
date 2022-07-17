import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
import { AddLocationModel } from '@/domain/usecases/locations/add-location'
import { MongoHelper } from '../helpers/mongo-helper'

export class LocationMongoRepository implements AddLocationRepository {
  async add (location: AddLocationModel): Promise<string> {
    const locationCollection = MongoHelper.getCollection('locations')
    const locationId = await locationCollection.insertOne(location)
    return locationId.insertedId.toHexString()
  }
}
