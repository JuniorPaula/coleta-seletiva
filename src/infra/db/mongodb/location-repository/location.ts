import { LocationItemRepository } from '@/data/protocols/location-item/location-item-repository'
import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
import { GetLocationsRepository } from '@/data/protocols/locations/get-locations-repository'
import { LocationItemModel } from '@/domain/model/location-item-model'
import { LocationModel } from '@/domain/model/location-model'
import { AddLocationModel } from '@/domain/usecases/locations/add-location'
import { DataLocation } from '@/domain/usecases/locations/get-locations'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class LocationMongoRepository implements AddLocationRepository,
 LocationItemRepository, GetLocationsRepository {
  async add (location: AddLocationModel): Promise<string> {
    const locationCollection = MongoHelper.getCollection('locations')
    const itemColletion = MongoHelper.getCollection('items')

    const [itemId] = location.items.map(id => id)

    const result = await itemColletion.find({ _id: new ObjectId(itemId) }).toArray()
    const [locations] = result.map(index => {
      return Object.assign({
        location: {
          name: location.name,
          email: location.email,
          latitude: location.latitude,
          longitude: location.longitude,
          city: location.city,
          uf: location.uf
        }
      }, { items: [{ title: index.title }] })
    })
    const locationId = await locationCollection.insertOne(locations)
    return locationId.insertedId.toHexString()
  }

  async create (data: LocationItemModel[]): Promise<void> {
    const locationItemCollection = MongoHelper.getCollection('locations_items')
    await locationItemCollection.insertOne({ data })
  }

  async get (query: DataLocation): Promise<LocationModel> {
    const locationCollection = MongoHelper.getCollection('locations')
    const locations = await locationCollection.find().toArray()
    return MongoHelper.map(locations)
  }
}
