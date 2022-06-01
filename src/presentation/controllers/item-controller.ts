import { AddItem } from '../../domain/usecase/add-item'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class ItemController implements Controller {
  constructor (private readonly addItem: AddItem) {}

  handle (httpRequest: HttpRequest): HttpResponse {
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
  }
}
