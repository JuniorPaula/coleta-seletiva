import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../item/item-protocols'

export class SignupController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('name'))
  }
}
