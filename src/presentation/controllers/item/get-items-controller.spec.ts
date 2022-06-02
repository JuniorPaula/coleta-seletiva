import { GetItemsController } from './get-item-controller'
import { ItemModel, GetItem } from './item-protocols'

const makeGetItem = (): GetItem => {
  class GetItemStub implements GetItem {
    async get (): Promise<ItemModel[]> {
      const fakeItems = [
        {
          id: 'any_id',
          title: 'any_title',
          image: 'any_image'
        },
        {
          id: 'another_id',
          title: 'another_title',
          image: 'another_image'
        }
      ]
      return await new Promise(resolve => resolve(fakeItems))
    }
  }

  return new GetItemStub()
}

interface SutTypes {
  sut: GetItemsController
  getItem: GetItem
}

const makeSut = (): SutTypes => {
  const getItem = makeGetItem()
  const sut = new GetItemsController(getItem)
  return {
    sut,
    getItem
  }
}

describe('Get Items Controllers', () => {
  test('Should calls Getitem once time', async () => {
    const { sut, getItem } = makeSut()
    const itemsSpy = jest.spyOn(getItem, 'get')
    await sut.handle()
    expect(itemsSpy).toBeCalledTimes(1)
  })
})
