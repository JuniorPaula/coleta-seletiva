import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class ItemController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.title) {
      return {
        statusCode: 400,
        body: new MissingParamError('title')
      }
    }
    if (!httpRequest.body.image) {
      return {
        statusCode: 400,
        body: new MissingParamError('image')
      }
    }
  }
}
