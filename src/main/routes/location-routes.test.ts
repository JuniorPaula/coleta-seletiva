import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let locationCollection: Collection
let itemsColletiion: Collection
let accountCollection: Collection

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
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /location', () => {
    test('Should return 403 on add location whitout access token', async () => {
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
        .expect(403)
    })

    test('Should return 204 on add location with valid access token', async () => {
      const resAccount = await accountCollection.insertOne({
        name: 'Jane Doe',
        email: 'jane.d@mail.com',
        password: '1234',
        role: 'admin'
      })
      const account = await accountCollection.findOne({ _id: resAccount.insertedId })
      const id = account._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          access_token: accessToken
        }
      })

      const res = await itemsColletiion.insertOne({
        title: 'any_title',
        image: 'any_image'
      })

      const itemId = res.insertedId.toHexString()
      await request(app)
        .post('/api/v1/location')
        .set('x-access-token', accessToken)
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
  })

  describe('GET /location', () => {
    test('Should return 403 if find locations by query without access token', async () => {
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
        .expect(403)
    })

    test('Should return 200 if find locations by query with valid access token is provided', async () => {
      const resAccount = await accountCollection.insertOne({
        name: 'Jane Doe',
        email: 'jane.d@mail.com',
        password: '1234',
        role: 'admin'
      })
      const account = await accountCollection.findOne({ _id: resAccount.insertedId })
      const id = account._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          access_token: accessToken
        }
      })

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
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('', () => {
    test('Should return 403 if find location by id without access token', async () => {
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
        .expect(403)
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
})
