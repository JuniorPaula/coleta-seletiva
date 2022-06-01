import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, serverError } from '../../helpers/http-helpers'
import {
  HttpRequest,
  HttpResponse,
  AddItem,
  Controller
} from './item-protocols'

export class ItemController implements Controller {
  constructor (private readonly addItem: AddItem) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['title', 'image']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { title, image } = httpRequest.body
      this.addItem.add({
        title,
        image
      })
    } catch (error) {
      return serverError()
    }
  }
}
