import { Controller } from '../../protocols/controller'
import {
  AddAccount, HttpRequest, HttpResponse, Validation,
  badRequest, ok, serverError, Authentication, forbiden,
  EmailAlreadyExists
} from './signup-protocols'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.create({
        name,
        email,
        password
      })

      if (!account) {
        return forbiden(new EmailAlreadyExists())
      }
      const authenticationParams = await this.authentication.auth({ email, password })
      return ok(authenticationParams)
    } catch (error) {
      return serverError()
    }
  }
}
