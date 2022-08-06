import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helpers'
import { EmailValidator } from '@/validations/protocols/email-validator'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return await Promise.resolve(badRequest(new MissingParamError('password')))
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return await Promise.resolve(badRequest(new InvalidParamError('email')))
    }
  }
}
