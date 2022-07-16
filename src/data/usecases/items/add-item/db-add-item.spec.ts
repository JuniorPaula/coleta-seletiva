import { AddItemModel } from '@/domain/usecases/items/add-item'
import { AddItemRepository } from '@/data/protocols/items/add-item-repository'
import { DbAddItem } from './db-add-item'

const mockAddItemRepository = (): AddItemRepository => {
  class AddItemRepositoryStub implements AddItemRepository {
    async add (itemData: AddItemModel): Promise<string> {
      return await new Promise(resolve => resolve('any_id'))
    }
  }

  return new AddItemRepositoryStub()
}

type SutTypes = {
  sut: DbAddItem
  addItemRepositoryStub: AddItemRepository
}

const makeSut = (): SutTypes => {
  const addItemRepositoryStub = mockAddItemRepository()
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

  test('Should save an item on success', async () => {
    const { sut } = makeSut()
    const itemData = {
      title: 'valid_title',
      image: 'valid_image'
    }

    const item = await sut.add(itemData)
    expect(item).toBeTruthy()
  })
})
