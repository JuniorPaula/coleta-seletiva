import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let itemColletion: Collection

describe('Item Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    itemColletion = MongoHelper.getCollection('items')
    await itemColletion.deleteMany({})
  })
  test('Should return 403 on add item whitout access token', async () => {
    await request(app)
      .post('/api/v1/item')
      .send({
        title: 'Oléo de cozinha',
        image: 'oleo.png'
      })
      .expect(403)
  })
})
