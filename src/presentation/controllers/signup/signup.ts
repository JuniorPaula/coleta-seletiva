import { badRequest, ok, serverError } from '@/presentation/helpers/http-helpers'
import { Validation } from '@/presentation/protocols/validation'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../item/item-protocols'
import { AddAccount } from './signup-protocols'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
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
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
