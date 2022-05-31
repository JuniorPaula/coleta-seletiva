import { HttpRequest, HttpResponse } from '../protocols/http'

export class ItemController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.title) {
      return {
        statusCode: 400,
        body: new Error('Missing param: title')
      }
    }
    if (!httpRequest.body.image) {
      return {
        statusCode: 400,
        body: new Error('Missing param: image')
      }
    }
  }
}
