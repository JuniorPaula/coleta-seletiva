import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { ItemMongoRepository } from './item'

let itemColletion: Collection

const makeSut = (): ItemMongoRepository => {
  return new ItemMongoRepository()
}

describe('Item Mongo Repository', () => {
  const baseUrl = MongoHelper.baseUrl

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

  test('Should save an item on success', async () => {
    const sut = makeSut()
    const item = await sut.add({
      title: 'any_title',
      image: 'any_image'
    })

    expect(item).toBeTruthy()
  })

  test('Should return a colletions of the items on success', async () => {
    const sut = makeSut()
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

    const items = await sut.get()
    expect(items).toHaveLength(2)
  })

  test('Should return items with correct url image', async () => {
    const sut = makeSut()
    await itemColletion.insertMany([
      {
        title: 'any_title',
        image: 'any_image.png'
      },
      {
        title: 'another_title',
        image: 'another_image.png'
      }
    ])

    const items = await sut.get()
    const image_url = items.find(item => item.image)
    expect(image_url.image).toEqual(`${baseUrl}/static/any_image.png`)
  })
})
