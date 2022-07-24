import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LocationMongoRepository } from './location'

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

  test('Should return all locations if no query params was provided', async () => {
    const { sut } = makeSut()
    const res = await itemsColletiion.insertOne({
      title: 'any_title',
      image: 'any_image'
    })
    const itemId = res.insertedId.toHexString()
    await locationCollection.insertMany([
      {
        name: 'any_name',
        email: 'any_email@mail.com',
        latitude: 12345,
        longitude: 54321,
        city: 'any_city',
        uf: 'any_uf',
        items: [
          { id: itemId }
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
          { id: itemId }
        ]
      }
    ])
    const locations = await sut.get()
    expect(locations).toBeTruthy()
    expect(locations).toHaveLength(2)
  })

  test('Should return locations filtered by city', async () => {
    const { sut } = makeSut()
    const res = await itemsColletiion.insertOne({
      title: 'any_title',
      image: 'any_image'
    })
    const itemId = res.insertedId.toHexString()
    await locationCollection.insertMany([
      {
        name: 'any_name',
        email: 'any_email@mail.com',
        latitude: 12345,
        longitude: 54321,
        city: 'any_city',
        uf: 'any_uf',
        items: [
          { id: itemId }
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
          { id: itemId }
        ]
      }
    ])

    const locations = await sut.get({
      city: 'other_city'
    })

    expect(locations).toBeTruthy()
  })

  test('Should return locations filtered by UF', async () => {
    const { sut } = makeSut()
    const res = await itemsColletiion.insertOne({
      title: 'any_title',
      image: 'any_image'
    })
    const itemId = res.insertedId.toHexString()
    await locationCollection.insertMany([
      {
        name: 'any_name',
        email: 'any_email@mail.com',
        latitude: 12345,
        longitude: 54321,
        city: 'any_city',
        uf: 'any_uf',
        items: [
          { id: itemId }
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
          { id: itemId }
        ]
      }
    ])

    const locations = await sut.get({
      uf: 'any_uf'
    })

    expect(locations).toBeTruthy()
  })

  test('Should return [] if filter no find locations', async () => {
    const { sut } = makeSut()
    const res = await itemsColletiion.insertOne({
      title: 'any_title',
      image: 'any_image'
    })
    const itemId = res.insertedId.toHexString()
    await locationCollection.insertMany([
      {
        name: 'any_name',
        email: 'any_email@mail.com',
        latitude: 12345,
        longitude: 54321,
        city: 'any_city',
        uf: 'any_uf',
        items: [
          { id: itemId }
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
          { id: itemId }
        ]
      }
    ])

    const locations = await sut.get({
      uf: 'unknow_uf'
    })

    expect(locations).toHaveLength(0)
  })
})
