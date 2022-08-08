import request from 'supertest'
import app from '../config/app'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

let accountColletion: Collection

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('1234', 12)
      await accountColletion.insertOne({
        name: 'Jane Doe',
        email: 'jane@mail.com',
        password
      })
      await request(app)
        .post('/api/v1/login')
        .send({
          email: 'jane@mail.com',
          password: '1234'
        })
        .expect(200)
    })
  })
})
