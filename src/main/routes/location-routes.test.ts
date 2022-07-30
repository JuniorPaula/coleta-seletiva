import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'

let locationCollection: Collection
let itemsColletiion: Collection

describe('Location Routes', () => {
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
  test('Should save a location on success', async () => {
    const res = await itemsColletiion.insertOne({
      title: 'any_title',
      image: 'any_image'
    })

    const itemId = res.insertedId.toHexString()
    await request(app)
      .post('/api/v1/location')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        latitude: 12345,
        longitude: 54321,
        city: 'any_city',
        uf: 'any_uf',
        items: [
          { id: itemId }
        ]
      })
      .expect(204)
  })

  test('Should return a locations on success if no query is provided', async () => {
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

    await request(app)
      .get('/api/v1/location?city=any_city')
      .expect(200)
  })

  test('Should return a location by id', async () => {
    const res = await locationCollection.insertOne(
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
      })
    const locationId = res.insertedId
    await request(app)
      .get(`/api/v1/location/${locationId}`)
      .expect(200)
  })

  test('Should return 403 if location router no found a location by id', async () => {
    await locationCollection.insertOne(
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
      })
    const locationId = '62d890fd7d71f725b4f4b842'
    await request(app)
      .get(`/api/v1/location/${locationId}`)
      .expect(403)
  })
})
