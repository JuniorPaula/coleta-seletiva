import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeItemController } from '../factories/item'

export default (router: Router): void => {
  router.post('/item', adaptRoute(makeItemController()))
}
