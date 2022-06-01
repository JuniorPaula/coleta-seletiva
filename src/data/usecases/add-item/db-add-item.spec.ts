import { ItemModel } from '../../../domain/model/item-model'
import { AddItemModel } from '../../../domain/usecase/add-item'
import { AddItemRepository } from '../../protocols/add-item-repository'
import { DbAddItem } from './db-add-item'

describe('DB AddItem usecase', () => {
  test('Should calls AddItemRepository with correct values', async () => {
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

    const addItemRepositoryStub = new AddItemRepositoryStub()

    const sut = new DbAddItem(addItemRepositoryStub)
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
})
