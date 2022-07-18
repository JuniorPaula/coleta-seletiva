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

type SutTypes = {
  sut: LocationMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new LocationMongoRepository()
  return {
    sut
  }
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
    const { sut } = makeSut()
    const locationId = await sut.add(mockLocation())
    expect(locationId).toBeTruthy()
  })

  test('Should create a relation of the locationsItems on success', async () => {
    const { sut } = makeSut()
    await sut.create(mockLocationItem())
    const res = await locationsItemsCollection.find().toArray()
    expect(res).toBeTruthy()
  })

  test('Should return a locations on success', async () => {
    const { sut } = makeSut()
    await locationCollection.insertMany([
      {
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
      },
      {
        name: 'other_name',
        email: 'other_email@mail.com',
        latitude: 12345,
        longitude: 54321,
        city: 'other_city',
        uf: 'other_uf',
        items: [
          'other_item_id_1',
          'other_item_id_2'
        ]
      }
    ])
    const locations = await sut.get({
      city: 'any_city',
      uf: 'any_uf',
      items: ['any_item_id']
    })
    console.log(locations)
    expect(locations[0].name).toEqual('any_name')
    expect(locations[1].name).toEqual('other_name')
  })
})
