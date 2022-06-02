import { HttpResponse } from '../../protocols'
import { Controller } from './item-protocols'

export class GetItemsController implements Controller {
  async handle (): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: []
    }
  }
}
