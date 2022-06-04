import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
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
  test('Should return an item on success', async () => {
    await request(app)
      .post('/api/item')
      .send({
        title: 'Oléo de cozinha',
        image: 'oleo.png'
      })
      .expect(200)
  })

  test('Should return a colletion of items on success', async () => {
    await itemColletion.insertMany([
      {
        title: 'any_title',
        image: 'any_image'
      },
      {
        title: 'another_title',
        image: 'another_image'
      }
    ])
    await request(app)
      .get('/api/item')
      .expect(200)
      .expect([
        {
          title: 'any_title',
          image: 'http://localhost:3035/api/any_image'
        },
        {
          title: 'another_title',
          image: 'http://localhost:3035/api/another_image'
        }
      ])
  })
})
