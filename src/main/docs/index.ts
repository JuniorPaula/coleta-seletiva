import { loginPaths } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { loginParamsSchema } from './schemas/login-params-schema'
import {
  badRequestError,
  unauthorizedError,
  serverError,
  notFoundError,
  forbiddenError
} from './components'
import { errorSchema } from './schemas/error-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Coleta de lixo seletivo',
    description: 'Api para cadrastro de pontos específicos de coleta seletiva de lixo',
    version: '1.0.0'
  },
  servers: [{
    url: '/api/v1'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPaths
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequestError,
    unauthorizedError,
    serverError,
    notFoundError,
    forbiddenError
  }
}
