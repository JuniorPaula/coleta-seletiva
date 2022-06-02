import { ServerError } from '../../errors'
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
  getItemstub: GetItem
}

const makeSut = (): SutTypes => {
  const getItemstub = makeGetItem()
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
})
