import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
import { GetLocationsRepository } from '@/data/protocols/locations/get-locations-repository'
import { LocationModel } from '@/domain/model/location-model'
import { AddLocationModel } from '@/domain/usecases/locations/add-location'
import { DataLocation } from '@/domain/usecases/locations/get-locations'
import { LoadLocationById } from '@/domain/usecases/locations/load-location-by-id'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class LocationMongoRepository implements
 AddLocationRepository, GetLocationsRepository, LoadLocationById {
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

  async get (query?: DataLocation): Promise<LocationModel[]> {
    const locationCollection = MongoHelper.getCollection('locations')

    if (Object.keys(query).length === 0) {
      const locations = await locationCollection.find().toArray()
      return MongoHelper.mapColletion(locations)
    }

    const locations = await locationCollection.find({
      $or: [{ 'location.city': query.city }, { 'location.uf': query.uf }]
    }).toArray()

    return MongoHelper.mapColletion(locations)
  }

  async loadById (id: string): Promise<LocationModel> {
    const locationCollection = MongoHelper.getCollection('locations')
    const location = await locationCollection.findOne({ _id: new ObjectId(id) })
    return location && MongoHelper.map(location)
  }
}
