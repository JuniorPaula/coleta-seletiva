import request from 'supertest'
import env from '../config/env'
import app from '../config/app'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

let itemColletion: Collection
let accountCollection: Collection

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
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /item', () => {
    test('Should return 403 on add item whitout access token', async () => {
      await request(app)
        .post('/api/v1/item')
        .send({
          title: 'Oléo de cozinha',
          image: 'oleo.png'
        })
        .expect(403)
    })

    test('Should return 204 on add item with valid access token', async () => {
      const res = await accountCollection.insertOne({
        name: 'Jane Doe',
        email: 'jane.d@mail.com',
        password: '1234',
        role: 'admin'
      })
      const account = await accountCollection.findOne({ _id: res.insertedId })
      const id = account._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          access_token: accessToken
        }
      })

      await request(app)
        .post('/api/v1/item')
        .set('x-access-token', accessToken)
        .send({
          title: 'Oléo de cozinha',
          image: 'oleo.png'
        })
        .expect(204)
    })
  })

  describe('GET /item', () => {
    test('Should return 403 on find item whitout access token', async () => {
      await request(app)
        .post('/api/v1/item')
        .send({
          title: 'Oléo de cozinha',
          image: 'oleo.png'
        })
        .expect(403)
    })
  })
})
