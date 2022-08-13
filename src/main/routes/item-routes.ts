import { Router } from 'express'
import { adaptAuthMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeGetItemController, makeItemController } from '../factories/item/item'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptAuthMiddleware(makeAuthMiddleware('admin'))
  router.post('/item', adminAuth, adaptRoute(makeItemController()))
  router.get('/item', adaptRoute(makeGetItemController()))
}
