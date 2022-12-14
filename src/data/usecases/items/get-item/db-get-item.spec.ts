import { ItemModel } from '@/domain/model/item-model'
import { GetItemRepository } from '@/data/protocols/items/get-item-repository'
import { DbGetItem } from './db-get-item'

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

const mockGetItemRepository = (): GetItemRepository => {
  class GetItemRepositoryStub implements GetItemRepository {
    async get (): Promise<ItemModel[]> {
      return await new Promise(resolve => resolve(mockFakeItems()))
    }
  }

  return new GetItemRepositoryStub()
}

type SutTypes = {
  sut: DbGetItem
  getItemRepositoryStub: GetItemRepository
}

const makeSut = (): SutTypes => {
  const getItemRepositoryStub = mockGetItemRepository()
  const sut = new DbGetItem(getItemRepositoryStub)

  return {
    sut,
    getItemRepositoryStub
  }
}

describe('Db Get Item', () => {
  test('Should call GetItemRepository once time', async () => {
    const { sut, getItemRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getItemRepositoryStub, 'get')
    await sut.get()
    expect(getSpy).toHaveBeenCalled()
  })

  test('Should throw if GetItemRepository throws', async () => {
    const { sut, getItemRepositoryStub } = makeSut()
    jest.spyOn(getItemRepositoryStub, 'get').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )
    const promise = sut.get()
    await expect(promise).rejects.toThrow()
  })

  test('Should returns items DbGetItem return on success', async () => {
    const { sut } = makeSut()
    const items = await sut.get()
    expect(items).toEqual(mockFakeItems())
  })
})
