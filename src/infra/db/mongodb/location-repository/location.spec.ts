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

    await locationCollection.insertMany([
      {
        location: {
          name: 'any_name',
          email: 'any_email@mail.com',
          latitude: 12345,
          longitude: 54321,
          city: 'any_city',
          uf: 'any_uf'
        },
        items: [{ title: 'any_title' }]
      },
      {
        location: {
          name: 'other_name',
          email: 'other_email@mail.com',
          latitude: 12345,
          longitude: 54321,
          city: 'other_city',
          uf: 'other_uf'
        },
        items: [{ title: 'other_title' }]
      }

    ])
    const locations = await sut.get({})
    expect(locations).toBeTruthy()
    expect(locations).toHaveLength(2)
  })

  test('Should return locations filtered by city', async () => {
    const { sut } = makeSut()

    await locationCollection.insertMany([
      {
        location: {
          name: 'any_name',
          email: 'any_email@mail.com',
          latitude: 12345,
          longitude: 54321,
          city: 'any_city',
          uf: 'any_uf'
        },
        items: [{ title: 'any_title' }]
      },
      {
        location: {
          name: 'other_name',
          email: 'other_email@mail.com',
          latitude: 12345,
          longitude: 54321,
          city: 'other_city',
          uf: 'other_uf'
        },
        items: [{ title: 'other_title' }]
      }
    ])

    const locations = await sut.get({
      city: 'other_city'
    })
    expect(locations).toBeTruthy()
    expect(locations[0].location.city).toBe('other_city')
  })

  test('Should return locations filtered by UF', async () => {
    const { sut } = makeSut()

    await locationCollection.insertMany([
      {
        location: {
          name: 'any_name',
          email: 'any_email@mail.com',
          latitude: 12345,
          longitude: 54321,
          city: 'any_city',
          uf: 'any_uf'
        },
        items: [{ title: 'any_title' }]
      },
      {
        location: {
          name: 'other_name',
          email: 'other_email@mail.com',
          latitude: 12345,
          longitude: 54321,
          city: 'other_city',
          uf: 'other_uf'
        },
        items: [{ title: 'other_title' }]
      }
    ])

    const locations = await sut.get({
      uf: 'any_uf'
    })

    expect(locations).toBeTruthy()
    expect(locations[0].location.uf).toBe('any_uf')
  })

  test('Should return [] if filter no find locations', async () => {
    const { sut } = makeSut()

    await locationCollection.insertMany([
      {
        location: {
          name: 'any_name',
          email: 'any_email@mail.com',
          latitude: 12345,
          longitude: 54321,
          city: 'any_city',
          uf: 'any_uf'
        },
        items: [{ title: 'any_title' }]
      },
      {
        location: {
          name: 'other_name',
          email: 'other_email@mail.com',
          latitude: 12345,
          longitude: 54321,
          city: 'other_city',
          uf: 'other_uf'
        },
        items: [{ title: 'other_title' }]
      }
    ])

    const locations = await sut.get({
      uf: 'unknow_uf'
    })

    expect(locations).toHaveLength(0)
  })

  test('Should return null if load a loaction by id fails', async () => {
    const { sut } = makeSut()
    await locationCollection.insertOne({
      location: {
        name: 'any_name',
        email: 'any_email@mail.com',
        latitude: 12345,
        longitude: 54321,
        city: 'any_city',
        uf: 'any_uf'
      },
      items: [{ title: 'any_title' }]
    })

    const location = await sut.loadById('62d890fd7d71f725b4f4b842')
    expect(location).toBeNull()
  })

  test('Should load a loaction by id on success', async () => {
    const { sut } = makeSut()
    const res = await locationCollection.insertOne({
      location: {
        name: 'any_name',
        email: 'any_email@mail.com',
        latitude: 12345,
        longitude: 54321,
        city: 'any_city',
        uf: 'any_uf'
      },
      items: [{ title: 'any_title' }]
    })
    const id = res.insertedId.toHexString()
    const location = await sut.loadById(id)
    expect(location).toBeTruthy()
    expect(location.location.name).toBe('any_name')
  })
})
