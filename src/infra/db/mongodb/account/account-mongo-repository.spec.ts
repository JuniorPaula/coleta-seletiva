import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountColletion: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
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

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const accountModel = {
        name: 'Jane Doe',
        email: 'jane@mail.com',
        password: '1234'
      }
      const account = await sut.add(accountModel)
      expect(account.name).toBe('Jane Doe')
      expect(account.email).toBe('jane@mail.com')
      expect(account.password).toBe('1234')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      await accountColletion.insertOne({
        name: 'Jane Doe',
        email: 'jane@mail.com',
        password: '1234'
      })
      const account = await sut.loadByEmail('jane@mail.com')
      expect(account.name).toBe('Jane Doe')
      expect(account.email).toBe('jane@mail.com')
      expect(account.password).toBe('1234')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('jane@mail.com')
      expect(account).toBeFalsy()
    })
  })
})
