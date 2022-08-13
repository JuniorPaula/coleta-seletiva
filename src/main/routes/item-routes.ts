import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeGetItemController, makeItemController } from '../factories/item/item'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptRoute(makeAuthMiddleware('admin'))
  router.post('/item', adminAuth, adaptRoute(makeItemController()))
  router.get('/item', adaptRoute(makeGetItemController()))
}
