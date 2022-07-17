import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLocationController } from '../factories/location/location'

export default (router: Router): void => {
  router.post('/location', adaptRoute(makeLocationController()))
}
