import { FindAccountByToken } from '@/domain/usecases/account/find-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbiden } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly findAccountByToken: FindAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.findAccountByToken.findByToken(accessToken)
    }
    return forbiden(new AccessDeniedError())
  }
}
