import { DbAddItem } from '@/data/usecases/items/add-item/db-add-item'
import { DbGetItem } from '@/data/usecases/items/get-item/db-get-item'
import { ItemMongoRepository } from '@/infra/db/mongodb/item-repository/item'
import { GetItemsController } from '@/presentation/controllers/item/get-item-controller'
import { ItemController } from '@/presentation/controllers/item/item-controller'
import { makeItemValidation } from './item-validation-factory'

export const makeItemController = (): ItemController => {
  const itemMongoRepository = new ItemMongoRepository()
  const dbAddItem = new DbAddItem(itemMongoRepository)
  return new ItemController(dbAddItem, makeItemValidation())
}

export const makeGetItemController = (): GetItemsController => {
  const itemMongoRepository = new ItemMongoRepository()
  const dbGetItem = new DbGetItem(itemMongoRepository)
  return new GetItemsController(dbGetItem)
}
