import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class ItemController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.title) {
      return badRequest(new MissingParamError('title'))
    }
    if (!httpRequest.body.image) {
      return badRequest(new MissingParamError('image'))
    }
  }
}
