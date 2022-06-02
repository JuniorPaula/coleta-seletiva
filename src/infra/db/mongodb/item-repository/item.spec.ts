import { MongoHelper } from '../helpers/mongo-helper'
import { ItemMongoRepository } from './item'
describe('Item Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an item on success', async () => {
    const sut = new ItemMongoRepository()
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
