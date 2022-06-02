import { HttpResponse } from '../../protocols'
import { Controller, GetItem } from './item-protocols'

export class GetItemsController implements Controller {
  constructor (private readonly getItem: GetItem) {}
  async handle (): Promise<HttpResponse> {
    const items = await this.getItem.get()
    return {
      statusCode: 200,
      body: items
    }
  }
}
