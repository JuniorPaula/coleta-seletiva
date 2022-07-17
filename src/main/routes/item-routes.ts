import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeGetItemController, makeItemController } from '../factories/item/item'

export default (router: Router): void => {
  router.post('/item', adaptRoute(makeItemController()))
  router.get('/item', adaptRoute(makeGetItemController()))
}
