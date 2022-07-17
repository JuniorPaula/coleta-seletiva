import { badRequest } from '@/presentation/helpers/http-helpers'
import { Validation } from '@/presentation/protocols/validation'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class LocationController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    return {
      statusCode: 200,
      body: null
    }
  }
}
