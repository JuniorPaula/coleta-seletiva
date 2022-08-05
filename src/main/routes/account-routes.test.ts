import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountColletion: Collection

describe('Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountColletion = MongoHelper.getCollection('accounts')
    await accountColletion.deleteMany({})
  })
  test('Should return 200 on signup', async () => {
    await request(app)
      .post('/api/v1/signup')
      .send({
        name: 'Jane Doe',
        email: 'jane@mail.com',
        password: '1234',
        passwordConfirmation: '1234'
      })
      .expect(200)
  })
})
