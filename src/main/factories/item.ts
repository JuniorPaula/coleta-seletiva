import { DbAddItem } from '../../data/usecases/add-item/db-add-item'
import { ItemMongoRepository } from '../../infra/db/mongodb/item-repository/item'
import { ItemController } from '../../presentation/controllers/item/item-controller'

export const makeItemController = (): ItemController => {
  const itemMongoRepository = new ItemMongoRepository()
  const dbAddItem = new DbAddItem(itemMongoRepository)
  return new ItemController(dbAddItem)
}
