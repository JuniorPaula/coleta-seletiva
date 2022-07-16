import { ok, serverError } from '@/presentation/helpers/http-helpers'
import { HttpResponse } from '@/presentation/protocols'
import { Controller, GetItem } from './item-protocols'

export class GetItemsController implements Controller {
  constructor (private readonly getItem: GetItem) {}
  async handle (): Promise<HttpResponse> {
    try {
      const items = await this.getItem.get()
      return ok(items)
    } catch (error) {
      return serverError()
    }
  }
}
