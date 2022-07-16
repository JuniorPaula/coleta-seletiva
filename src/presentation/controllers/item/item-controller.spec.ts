import { ItemController } from './item-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { AddItem, AddItemModel } from './item-protocols'

const mockAddItem = (): AddItem => {
  class AddItemStub implements AddItem {
    async add (item: AddItemModel): Promise<string> {
      return await new Promise(resolve => resolve('any_id'))
    }
  }
  return new AddItemStub()
}

type SutTipes = {
  sut: ItemController
  addItemStub: AddItem
}

const makeSut = (): SutTipes => {
  const addItemStub = mockAddItem()
  const sut = new ItemController(addItemStub)
  return {
    sut,
    addItemStub
  }
}

describe('Item Controller', () => {
  test('Should return 400 if no title is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        image: 'any_image'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('title'))
  })

  test('Should return 400 if no image is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('image'))
  })

  test('Should call AddItem with correct values', async () => {
    const { sut, addItemStub } = makeSut()
    const addSpy = jest.spyOn(addItemStub, 'add')
    const httpRequest = {
      body: {
        title: 'any_title',
        image: 'any_image'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      title: 'any_title',
      image: 'any_image'
    })
  })

  test('Should return 500 if AddItem throws', async () => {
    const { sut, addItemStub } = makeSut()
    jest.spyOn(addItemStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        title: 'any_title',
        image: 'any_image'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should returns 204 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'valid_title',
        image: 'valid_image'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
  })
})
