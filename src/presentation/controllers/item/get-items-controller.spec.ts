import { ServerError } from '../../errors'
import { GetItemsController } from './get-item-controller'
import { ItemModel, GetItem } from './item-protocols'

const mockFakeItems = (): ItemModel[] => {
  return [
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
}

const mockGetItem = (): GetItem => {
  class GetItemStub implements GetItem {
    async get (): Promise<ItemModel[]> {
      return await new Promise(resolve => resolve(mockFakeItems()))
    }
  }

  return new GetItemStub()
}

type SutTypes = {
  sut: GetItemsController
  getItemstub: GetItem
}

const makeSut = (): SutTypes => {
  const getItemstub = mockGetItem()
  const sut = new GetItemsController(getItemstub)
  return {
    sut,
    getItemstub
  }
}

describe('Get Items Controllers', () => {
  test('Should calls Getitem once time', async () => {
    const { sut, getItemstub } = makeSut()
    const itemsSpy = jest.spyOn(getItemstub, 'get')
    await sut.handle()
    expect(itemsSpy).toBeCalledTimes(1)
  })

  test('Should return 500 if GetItem throws', async () => {
    const { sut, getItemstub } = makeSut()
    jest.spyOn(getItemstub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should returns 200 if GetItem return on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(mockFakeItems())
  })
})
