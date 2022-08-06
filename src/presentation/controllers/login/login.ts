import { Authentication } from '@/domain/usecases/auth/authentication'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http-helpers'
import { EmailValidator } from '@/validations/protocols/email-validator'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError()
    }
  }
}
