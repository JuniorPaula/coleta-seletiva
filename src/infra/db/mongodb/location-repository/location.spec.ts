import { Collection } from 'mongodb'
import { AddLocationModel } from '@/domain/usecases/locations/add-location'
import { MongoHelper } from '../helpers/mongo-helper'
import { LocationMongoRepository } from './location'
import { LocationItemModel } from '@/domain/model/location-item-model'

const mockLocation = (): AddLocationModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  latitude: 12345,
  longitude: 54321,
  city: 'any_city',
  uf: 'any_uf',
  items: [
    'any_item_id_1',
    'any_item_id_2'
  ]
})

const mockLocationItem = (): LocationItemModel[] => {
  return [
    {
      location_id: 'any_location_id',
      item_id: 'any_item_id_1'
    },
    {
      location_id: 'any_location_id',
      item_id: 'any_item_id_2'
    }
  ]
}

let locationCollection: Collection
let locationsItemsCollection: Collection

describe('Location Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    locationCollection = MongoHelper.getCollection('locations')
    await locationCollection.deleteMany({})
    locationsItemsCollection = MongoHelper.getCollection('locations_items')
    await locationsItemsCollection.deleteMany({})
  })
  test('Should add a location on success', async () => {
    const sut = new LocationMongoRepository()
    const locationId = await sut.add(mockLocation())
    expect(locationId).toBeTruthy()
  })

  test('Should create a relation of the locationsItems on success', async () => {
    const sut = new LocationMongoRepository()
    await sut.create(mockLocationItem())
    const res = await locationsItemsCollection.find().toArray()
    expect(res).toBeTruthy()
  })
})
