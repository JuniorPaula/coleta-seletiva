import { AccessDeniedError } from '../errors'
import { forbiden } from '../helpers/http-helpers'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  test('Should returns 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()))
  })
})
