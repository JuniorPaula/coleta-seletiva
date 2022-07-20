import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LocationMongoRepository } from './location'
import { LocationItemModel } from '@/domain/model/location-item-model'

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
let itemsColletiion: Collection

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
    itemsColletiion = MongoHelper.getCollection('items')
    await itemsColletiion.deleteMany({})
  })
  test('Should add a location with correct items ids', async () => {
    const { sut } = makeSut()
    const res = await itemsColletiion.insertOne({
      title: 'any_title',
      image: 'any_image'
    })
    const res2 = await itemsColletiion.insertOne({
      title: 'other_title',
      image: 'other_image'
    })
    const itemId = res.insertedId.toHexString()
    const itemId2 = res2.insertedId.toHexString()

    const locationId = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      latitude: 12345,
      longitude: 54321,
      city: 'any_city',
      uf: 'any_uf',
      items: [
        { id: itemId },
        { id: itemId2 }
      ]
    })
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

    expect(locations[0].name).toEqual('any_name')
    expect(locations[1].name).toEqual('other_name')
  })
})
