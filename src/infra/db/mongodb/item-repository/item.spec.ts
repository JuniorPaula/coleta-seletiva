import { MongoHelper } from '../helpers/mongo-helper'
import { ItemMongoRepository } from './item'

const makeSut = (): ItemMongoRepository => {
  return new ItemMongoRepository()
}

describe('Item Mongo Repository', () => {
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
    const sut = makeSut()
    const item = await sut.add({
      title: 'any_title',
      image: 'any_image'
    })

    expect(item).toBeTruthy()
    expect(item.id).toBeTruthy()
    expect(item.title).toBe('any_title')
    expect(item.image).toBe('any_image')
  })
})
