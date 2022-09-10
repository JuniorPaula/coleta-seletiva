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
import { signupPath } from './paths/signup-path'
import { signupParamsSchema } from './schemas/signup-params-schema'
import { apiKeyAuthSchema } from './schemas/api-key-auth-schema'
import { itemPath } from './paths/item-path'
import { addItemSchema } from './schemas/add-item-schema'
import { getItemsSchema } from './schemas/get-items-schema'
import { itemsSchema } from './schemas/items-schema'

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
  tags: [
    {
      name: 'Login'
    }, {
      name: 'Items'
    }
  ],
  paths: {
    '/login': loginPaths,
    '/signup': signupPath,
    '/items': itemPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signup: signupParamsSchema,
    addItem: addItemSchema,
    getItems: getItemsSchema,
    items: itemsSchema,
    error: errorSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequestError,
    unauthorizedError,
    serverError,
    notFoundError,
    forbiddenError
  }
}
