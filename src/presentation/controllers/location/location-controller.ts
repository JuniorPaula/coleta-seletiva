import { Validation } from '@/presentation/protocols/validation'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class LocationController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return {
      statusCode: 200,
      body: null
    }
  }
}
