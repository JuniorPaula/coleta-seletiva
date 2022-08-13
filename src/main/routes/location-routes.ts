import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeGetLocationController } from '../factories/location/get-location'
import { makeLoadLocationByIdController } from '../factories/location/load-location-by-id-factory'
import { makeLocationController } from '../factories/location/location'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/location', auth, adaptRoute(makeLocationController()))
  router.get('/location', adaptRoute(makeGetLocationController()))
  router.get('/location/:locationId', adaptRoute(makeLoadLocationByIdController()))
}
