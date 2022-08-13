import {
  Controller,
  HttpRequest,
  HttpResponse,
  badRequest,
  ok,
  serverError,
  unauthorized,
  Authentication,
  Validation
} from './login-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body

      const authenticationParams = await this.authentication.auth({ email, password })
      if (!authenticationParams) {
        return unauthorized()
      }

      return ok(authenticationParams)
    } catch (error) {
      return serverError()
    }
  }
}
