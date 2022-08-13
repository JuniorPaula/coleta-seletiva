import { adaptAuthMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export const auth = adaptAuthMiddleware(makeAuthMiddleware())
