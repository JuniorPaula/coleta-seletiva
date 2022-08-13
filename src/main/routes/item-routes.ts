import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeGetItemController, makeItemController } from '../factories/item/item'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/item', adminAuth, adaptRoute(makeItemController()))
  router.get('/item', adaptRoute(makeGetItemController()))
}
