import { AccessDeniedError } from '../errors'
import { forbiden } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbiden(new AccessDeniedError())
  }
}
