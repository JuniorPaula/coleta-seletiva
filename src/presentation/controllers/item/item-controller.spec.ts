import { ItemController } from './item-controller'
import { MissingParamError } from '../../errors/missing-param-error'
import { AddItem, AddItemModel, ItemModel } from './item-protocols'

const makeAddItem = (): AddItem => {
  class AddItemStub implements AddItem {
    add (item: AddItemModel): ItemModel {
      const fakeItem = {
        id: 'valid_id',
        title: 'valid_title',
        image: 'valid_image'
      }
      return fakeItem
    }
  }
  return new AddItemStub()
}

interface SutTipes {
  sut: ItemController
  addItemStub: AddItem
}

const makeSut = (): SutTipes => {
  const addItemStub = makeAddItem()
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
    const httpResponse = sut.handle(httpRequest)
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
    const httpResponse = sut.handle(httpRequest)
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
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      title: 'any_title',
      image: 'any_image'
    })
  })
})
