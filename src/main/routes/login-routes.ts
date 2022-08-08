import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLoginController } from '../factories/account/login/login'
import { makeSignupController } from '../factories/account/signup/signup'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
