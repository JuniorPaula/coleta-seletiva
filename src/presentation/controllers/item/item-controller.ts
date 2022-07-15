import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, noContent, serverError } from '../../helpers/http-helpers'
import {
  HttpRequest,
  HttpResponse,
  AddItem,
  Controller
} from './item-protocols'

export class ItemController implements Controller {
  constructor (private readonly addItem: AddItem) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['title', 'image']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { title, image } = httpRequest.body
      await this.addItem.add({
        title,
        image
      })
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
