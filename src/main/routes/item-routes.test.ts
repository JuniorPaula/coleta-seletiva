import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'

describe('Item Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const itemColletion = MongoHelper.getCollection('items')
    await itemColletion.deleteMany({})
  })
  test('Should return an item on success', async () => {
    await request(app)
      .post('/api/item')
      .send({
        title: 'Oléo de cozinha',
        image: 'oleo.png'
      })
      .expect(200)
  })
})
