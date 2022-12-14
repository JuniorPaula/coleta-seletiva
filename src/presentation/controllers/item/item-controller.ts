import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import { Validation } from '@/presentation/protocols/validation'
import {
  HttpRequest,
  HttpResponse,
  AddItem,
  Controller
} from './item-protocols'

export class ItemController implements Controller {
  constructor (
    private readonly addItem: AddItem,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
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
