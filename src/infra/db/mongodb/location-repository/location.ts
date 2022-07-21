import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
import { GetLocationsRepository } from '@/data/protocols/locations/get-locations-repository'
import { LocationModel } from '@/domain/model/location-model'
import { AddLocationModel } from '@/domain/usecases/locations/add-location'
import { DataLocation } from '@/domain/usecases/locations/get-locations'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class LocationMongoRepository implements AddLocationRepository, GetLocationsRepository {
  async add (location: AddLocationModel): Promise<string> {
    const locationCollection = MongoHelper.getCollection('locations')
    const itemColletion = MongoHelper.getCollection('items')
    const locationItemsIds: any[] = []

    for (let i = 0; i < location.items.length; i++) {
      const id = location.items[i].id
      const [itemsIds] = await itemColletion.find({ _id: new ObjectId(id) }).toArray()
      locationItemsIds.push(itemsIds)
    }
    const itemsTitle = locationItemsIds.map(index => {
      return {
        title: index.title
      }
    })

    const locations = Object.assign({
      location: {
        name: location.name,
        email: location.email,
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        uf: location.uf
      }
    }, {
      items: itemsTitle
    })

    const locationId = await locationCollection.insertOne(locations)
    return locationId.insertedId.toHexString()
  }

  async get (query: DataLocation): Promise<LocationModel> {
    const locationCollection = MongoHelper.getCollection('locations')
    const locations = await locationCollection.find().toArray()
    return MongoHelper.map(locations)
  }
}
