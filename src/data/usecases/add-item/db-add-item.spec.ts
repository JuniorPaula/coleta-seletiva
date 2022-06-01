import { ItemModel } from '../../../domain/model/item-model'
import { AddItemModel } from '../../../domain/usecase/add-item'
import { AddItemRepository } from '../../protocols/add-item-repository'
import { DbAddItem } from './db-add-item'

const makeAddItemRepository = (): AddItemRepository => {
  class AddItemRepositoryStub implements AddItemRepository {
    async add (itemData: AddItemModel): Promise<ItemModel> {
      const fakeItem = {
        id: 'valid_id',
        title: 'valid_title',
        image: 'valid_image'
      }
      return await new Promise(resolve => resolve(fakeItem))
    }
  }

  return new AddItemRepositoryStub()
}

interface SutTypes {
  sut: DbAddItem
  addItemRepositoryStub: AddItemRepository
}

const makeSut = (): SutTypes => {
  const addItemRepositoryStub = makeAddItemRepository()
  const sut = new DbAddItem(addItemRepositoryStub)
  return {
    sut,
    addItemRepositoryStub
  }
}

describe('DB AddItem usecase', () => {
  test('Should calls AddItemRepository with correct values', async () => {
    const { sut, addItemRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addItemRepositoryStub, 'add')
    const itemData = {
      title: 'valid_title',
      image: 'valid_image'
    }

    await sut.add(itemData)
    expect(addSpy).toHaveBeenCalledWith({
      title: 'valid_title',
      image: 'valid_image'
    })
  })

  test('Should throw if AddItemRepository throws', async () => {
    const { sut, addItemRepositoryStub } = makeSut()
    jest.spyOn(addItemRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )

    const itemData = {
      title: 'valid_title',
      image: 'valid_image'
    }

    const promise = sut.add(itemData)
    await expect(promise).rejects.toThrow()
  })

  test('Should returns an item on success', async () => {
    const { sut } = makeSut()
    const itemData = {
      title: 'valid_title',
      image: 'valid_image'
    }

    const item = await sut.add(itemData)
    expect(item).toEqual({
      id: 'valid_id',
      title: 'valid_title',
      image: 'valid_image'
    })
  })
})
