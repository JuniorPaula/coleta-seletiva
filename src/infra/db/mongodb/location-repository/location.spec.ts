import { Collection } from 'mongodb'
import { AddLocationModel } from '@/domain/usecases/locations/add-location'
import { MongoHelper } from '../helpers/mongo-helper'
import { LocationMongoRepository } from './location'

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

let locationCollection: Collection

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
  })
  test('Should add a location on success', async () => {
    const sut = new LocationMongoRepository()
    const locationId = await sut.add(mockLocation())
    expect(locationId).toBeTruthy()
  })
})
