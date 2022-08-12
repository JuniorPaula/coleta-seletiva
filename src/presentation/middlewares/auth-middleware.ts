import { FindAccountByToken } from '@/domain/usecases/account/find-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbiden, ok, serverError } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly findAccountByToken: FindAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.findAccountByToken.findByToken(accessToken)
        if (account) {
          return ok({ account_id: account.id })
        }
      }
      return forbiden(new AccessDeniedError())
    } catch (error) {
      return serverError()
    }
  }
}
