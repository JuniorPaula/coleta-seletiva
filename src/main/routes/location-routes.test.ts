import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'

let locationColletion: Collection
let itemsColletiion: Collection

describe('Item Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    locationColletion = MongoHelper.getCollection('locations')
    await locationColletion.deleteMany({})
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
          itemId
        ]
      })
      .expect(204)
  })
})
